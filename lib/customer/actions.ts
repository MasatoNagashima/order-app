'use server'

import { createSupabaseClient } from "../util/server";

 
export async function createCustomer(
  customerNumber: number,
  storeId: number,
  tableId: number
): Promise<number> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('t_customers')
    .insert({
      customer_number: customerNumber,
      payment_status: 'ORDERING',
      store_id: storeId,
      table_id: tableId
    })
    .select('customer_id')
    .single();
  
  if (error != null){
      throw new Error(error.message);
  }
  return data.customer_id
}

export async function updateCustomer(
  customerId: number,
  paymentStatus: string
): Promise<void> {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from('t_customers')
    .update({ payment_status: paymentStatus })
    .eq('customer_id', customerId);
  
  if (error != null){
    throw new Error(error.message);
  }
}

export async function getCustomerStatus(
  storeId: number,
  tableId: number
): Promise<{ customerId?: number, paymentStatus?: string, customerNumber?: number }> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('t_customers')
    .select('customer_id, customer_number, payment_status')
    .eq('store_id', storeId)
    .eq('table_id', tableId)
    .in('payment_status', ['ORDERING', 'PROCESSING']);
  
  if (error != null){
      throw new Error(error.message);
  }

  if (data.length > 1){
    throw new Error('There are multiple customers in one table.');
  }

  return {
    customerId: data[0]?.customer_id,
    customerNumber: data[0]?.customer_number,
    paymentStatus: data[0]?.payment_status
  }
}
