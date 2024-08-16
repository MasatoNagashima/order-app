'use server'

import { createSupabaseClient } from "../util/server";

type MenuTypes = 
  | 'KUSHIYAKI'
  | 'RARE_PARTS'
  | 'SCROLLED'
  | 'VEGETABLE'
  | 'CHICKEN_FOOD'
  | 'SALAD'
  | 'CARBS'
  | 'ALCHOL'
  | 'SOFT_DRINK'

type MenuItem = {
  menuItemId: number;
  menuItemName: string;
  menuType: MenuTypes;
}

export async function getMenuItems(): Promise<MenuItem[] | null> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from<MenuItem>('m_menu_items')
    .select('menu_item_id, menu_item_name, menu_type');
  
  if (error != null){
      throw new Error(error.message);
  }
  if (data == null){
      throw new Error('Failed to get menu items');   
  }
  return data
}