'use server'

import { MenuItem } from "../util/constants";
import { createSupabaseClient } from "../util/server";

export async function getMenuItems(): Promise<MenuItem[]> {
  const supabase = createSupabaseClient();
  const {data, error} = await supabase
    .from('m_menu_items')
    .select('menu_item_id, menu_item_name, menu_type, price');
  
  if (error != null){
      throw new Error(error.message);
  }
  if (data.length === 0){
      throw new Error('Failed to get menu items');   
  }
  return data.map((menuItem) => ({
    menuItemId: menuItem.menu_item_id,
    menuItemName: menuItem.menu_item_name,
    menuType: menuItem.menu_type,
    price: menuItem.price
  }));
}

export async function getMenuItem(
  menuItemId: string
): Promise<MenuItem> {
  const supabase = createSupabaseClient();
  const {data, error} = await supabase
    .from('m_menu_items')
    .select('menu_item_id, menu_item_name, menu_type, price')
    .eq('menu_item_id', menuItemId)
    .single();
  
  if (error != null){
      throw new Error(error.message);
  }
  if (data.length === 0){
      throw new Error('Failed to get menu items');   
  }
  return {
    menuItemId: data.menu_item_id,
    menuItemName: data.menu_item_name,
    menuType: data.menu_type,
    price: data.price
  }
}