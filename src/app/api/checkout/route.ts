import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/service";
import { createAuthAwareSupabaseClient } from "@/lib/supabase/server-auth";
import { calculateShippingCost } from "@/lib/shipping";

type CheckoutRequestItem = {
  productId: string;
  quantity: number;
};

type CheckoutRequestBody = {
  items: CheckoutRequestItem[];
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingPostalCode: string;
  shippingAddress: string;
  paymentMethod: "mercadopago" | "transferencia";
};

export async function POST(request: Request) {
  const body = (await request.json()) as CheckoutRequestBody;

  if (!body.items?.length) {
    return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
  }
  if (
    !body.customerName ||
    !body.customerEmail ||
    !body.shippingPostalCode ||
    !body.shippingAddress ||
    !body.paymentMethod
  ) {
    return NextResponse.json(
      { error: "Faltan datos del formulario" },
      { status: 400 }
    );
  }

  const authClient = await createAuthAwareSupabaseClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();

  const supabase = createServiceSupabaseClient();

  const productIds = body.items.map((i) => i.productId);
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, name, price_ars, transfer_discount_pct, stock")
    .in("id", productIds);

  if (productsError) {
    return NextResponse.json({ error: productsError.message }, { status: 500 });
  }

  const orderItems: {
    product_id: string;
    product_name: string;
    unit_price_ars: number;
    quantity: number;
  }[] = [];
  let subtotal = 0;

  for (const requested of body.items) {
    const product = products?.find((p) => p.id === requested.productId);
    if (!product) {
      return NextResponse.json(
        { error: `Producto no encontrado: ${requested.productId}` },
        { status: 400 }
      );
    }
    if (requested.quantity < 1 || requested.quantity > product.stock) {
      return NextResponse.json(
        { error: `Stock insuficiente para "${product.name}"` },
        { status: 400 }
      );
    }

    const unitPrice =
      body.paymentMethod === "transferencia"
        ? product.price_ars * (1 - product.transfer_discount_pct / 100)
        : product.price_ars;

    orderItems.push({
      product_id: product.id,
      product_name: product.name,
      unit_price_ars: unitPrice,
      quantity: requested.quantity,
    });
    subtotal += unitPrice * requested.quantity;
  }

  const shippingCost = calculateShippingCost(subtotal);
  const total = subtotal + shippingCost;

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user?.id ?? null,
      customer_name: body.customerName,
      customer_email: body.customerEmail,
      customer_phone: body.customerPhone ?? null,
      shipping_postal_code: body.shippingPostalCode,
      shipping_address: body.shippingAddress,
      shipping_cost_ars: shippingCost,
      total_ars: total,
      payment_method: body.paymentMethod,
      status: "pending",
    })
    .select("id")
    .single();

  if (orderError || !order) {
    return NextResponse.json(
      { error: orderError?.message ?? "No se pudo crear el pedido" },
      { status: 500 }
    );
  }

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems.map((item) => ({ ...item, order_id: order.id })));

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  for (const requested of body.items) {
    const product = products?.find((p) => p.id === requested.productId)!;
    await supabase
      .from("products")
      .update({ stock: product.stock - requested.quantity })
      .eq("id", product.id);
  }

  return NextResponse.json({ orderId: order.id, totalArs: total });
}
