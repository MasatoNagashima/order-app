'use server'

import { createSupabaseClient } from "../util/server";

export async function getStore(storeId: number): Promise<string> {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from('m_stores')
      .select('store_name')
      .eq('store_id', storeId)
      .single();
    
    if (error != null){
        throw new Error(error.message);
    }
    if (data == null){
        throw new Error('Failed to find store data');   
    }
    return data.store_name
}
