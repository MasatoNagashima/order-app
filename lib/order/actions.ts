'use server'

import { createSupabaseClient } from "../util/server";

type Order = {
  order_id: number;
  menu_item_id: number;
  menu_item_number: number;
  order_status: string;
}
 
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

export async function getOrders(
  customerId: number
): Promise<Order[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('t_orders')
    .select('order_id, menu_item_id, menu_item_number, order_status')
    .eq('customer_id', customerId);
  
  if (error != null){
    throw new Error(error.message);
  }
  console.log(data)
  return data
}

export async function updateOrder(
  orderId: number,
  menuItemNumber: number,
  orderStatus: string
) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from('t_orders')
    .update({ menu_item_number: menuItemNumber, order_status: orderStatus })
    .eq('order_id', orderId);
  
  if (error != null){
    throw new Error(error.message);
  }
}