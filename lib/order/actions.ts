'use server'

import { OrderItem } from "../util/constants";
import { createSupabaseClient } from "../util/server";
 
export async function createOrder(
  menuItemId: number,
  menuItemNumber: number,
  customerId: number
): Promise<number> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('t_orders')
    .insert({
      menu_item_id: menuItemId,
      menu_item_number: menuItemNumber,
      customer_id: customerId,
      order_status: 'IN_CART'
    })
    .select('order_id')
    .single();
  
  if (error != null){
      throw new Error(error.message);
  }

  return data.order_id
}

export async function getOrdersInCart(
  customerId: number,
): Promise<OrderItem[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('t_orders')
    .select('order_id, menu_item_id, menu_item_number, m_menu_items (menu_item_name, price)')
    .eq('customer_id', customerId)
    .eq('order_status', 'IN_CART')
    ;
  
  if (error != null){
    throw new Error(error.message);
  }
  return data.map((order) => ({
    orderId: order.order_id,
    menuItemId: order.menu_item_id,
    menuItemName: order.m_menu_items.menu_item_name,
    price: order.m_menu_items.price,
    menuItemNumber: order.menu_item_number,
    orderStatus: order.order_status
  }));
}

export async function updateOrders(
  orderIds: string[],
  orderStatus: string
) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from('t_orders')
    .update({order_status: orderStatus })
    .in('order_id', orderIds);
  
  if (error != null){
    throw new Error(error.message);
  }
}

export async function getCompletedOrders(
  customerId: number,
): Promise<OrderItem[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('t_orders')
    .select('order_id, menu_item_id, menu_item_number, m_menu_items (menu_item_name, price)')
    .eq('customer_id', customerId)
    .eq('order_status', 'COMPLETED')
    ;
  
  if (error != null){
    throw new Error(error.message);
  }
  return data.map((order) => ({
    orderId: order.order_id,
    menuItemId: order.menu_item_id,
    menuItemName: order.m_menu_items.menu_item_name,
    price: order.m_menu_items.price,
    menuItemNumber: order.menu_item_number,
    orderStatus: order.order_status
  }));
}