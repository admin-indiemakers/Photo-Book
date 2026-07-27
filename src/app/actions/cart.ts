'use server';

import { supabaseAdmin, supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function getCart(userId: string) {
  if (!userId) return { success: false, error: 'Not authenticated' };

  try {
    const { data: cart, error } = await supabaseAdmin
      .from('carts')
      .select('*, cart_items(*, products(*))')
      .eq('customer_id', userId)
      .eq('status', 'active')
      .maybeSingle();

    if (error) throw error;
    return { success: true, cart };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function clearActiveCart(userId: string) {
  if (!userId) return { success: false, error: 'Not authenticated' };

  try {
    const { data: cart } = await supabaseAdmin
      .from('carts')
      .select('id')
      .eq('customer_id', userId)
      .eq('status', 'active')
      .maybeSingle();

    if (cart) {
      await supabaseAdmin
        .from('cart_items')
        .delete()
        .eq('cart_id', cart.id);
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function addToCart(userId: string, productId: string, quantity: number, customOptions: any, price: number) {
  if (!userId) return { success: false, error: 'Please log in to add items to cart' };

  try {
    // Find or create active cart
    let { data: cart } = await supabaseAdmin
      .from('carts')
      .select('id')
      .eq('customer_id', userId)
      .eq('status', 'active')
      .maybeSingle();

    if (!cart) {
      const { data: newCart, error: createError } = await supabaseAdmin
        .from('carts')
        .insert({ customer_id: userId, status: 'active' })
        .select()
        .single();
      
      if (createError) throw createError;
      cart = newCart;
    }

    // Add item to cart
    const { error: itemError } = await supabaseAdmin
      .from('cart_items')
      .insert({
        cart_id: cart!.id,
        product_id: productId,
        quantity,
        custom_options: customOptions,
        price
      });

    if (itemError) throw itemError;
    
    // Update cart updated_at
    await supabaseAdmin.from('carts').update({ updated_at: new Date().toISOString() }).eq('id', cart!.id);

    revalidatePath('/');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function checkoutCart(userId: string, deliveryInfo: any) {
  if (!userId) return { success: false, error: 'Not authenticated' };

  try {
    // Get active cart
    const { data: cart } = await supabaseAdmin
      .from('carts')
      .select('*, cart_items(*, products(*))')
      .eq('customer_id', userId)
      .eq('status', 'active')
      .maybeSingle();

    if (!cart || !cart.cart_items || cart.cart_items.length === 0) {
      return { success: false, error: 'Cart is empty' };
    }

    // Calculate total
    const total = cart.cart_items.reduce((sum: number, item: any) => sum + (Number(item.price) * item.quantity), 0);

    // Create Order
    const orderNumber = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        customer_id: userId,
        order_number: orderNumber,
        status: 'pending',
        total,
        shipping_address: deliveryInfo, // Required by schema
        ...deliveryInfo // The flat columns added via ALTER TABLE
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create Order Items
    const orderItemsToInsert = cart.cart_items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.products?.name || 'Unknown',
      category: item.products?.category || 'photo_frame',
      quantity: item.quantity,
      unit_price: item.price,
      line_total: item.price * item.quantity,
      customization: item.custom_options || {}
    }));

    const { error: itemsError } = await supabaseAdmin.from('order_items').insert(orderItemsToInsert);
    if (itemsError) throw itemsError;

    // Mark cart as converted
    await supabaseAdmin.from('carts').update({ status: 'converted', updated_at: new Date().toISOString() }).eq('id', cart.id);

    // Push to Shiprocket via our backend API
    try {
      const shiprocketOrderData = {
        order_id: orderNumber,
        order_date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        pickup_location: "Primary", // Ensure you have a 'Primary' location set in Shiprocket settings
        billing_customer_name: deliveryInfo.full_name,
        billing_last_name: "",
        billing_address: deliveryInfo.address_line1,
        billing_address_2: deliveryInfo.address_line2 || "",
        billing_city: deliveryInfo.city,
        billing_pincode: deliveryInfo.postal_code,
        billing_state: deliveryInfo.state,
        billing_country: deliveryInfo.country || "India",
        billing_email: deliveryInfo.email,
        billing_phone: deliveryInfo.phone,
        shipping_is_billing: true,
        order_items: orderItemsToInsert.map((item: any) => ({
          name: item.product_name,
          sku: item.product_id.substring(0, 8),
          units: item.quantity,
          selling_price: item.unit_price,
          discount: 0,
          tax: 0,
          hsn: 44140000
        })),
        payment_method: "Prepaid",
        shipping_charges: 0,
        giftwrap_charges: 0,
        transaction_charges: 0,
        total_discount: 0,
        sub_total: total,
        length: 10,
        breadth: 15,
        height: 20,
        weight: 0.5 // Default placeholder weight (kg)
      };

      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      const shiprocketRes = await fetch(`${backendUrl}/shipping/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderData: shiprocketOrderData })
      });
      
      if (!shiprocketRes.ok) {
        console.error("Failed to push to Shiprocket:", await shiprocketRes.text());
        // Not failing checkout if shipping push fails, it can be retried
      } else {
        console.log("Successfully pushed order to Shiprocket!");
      }
    } catch (shipErr) {
      console.error("Error communicating with Shiprocket backend API:", shipErr);
    }

    return { success: true, orderId: order.id };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
