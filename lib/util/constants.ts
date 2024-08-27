type MenuTypes = 
  | 'KUSHIYAKI'
  | 'RARE_PARTS'
  | 'SCROLLED'
  | 'VEGETABLE'
  | 'CHICKEN_FOOD'
  | 'SALAD'
  | 'CARBS'
  | 'ALCHOL'
  | 'SOFTDRINK'

export type MenuItem = {
  menuItemId: number;
  menuItemName: string;
  menuType: MenuTypes;
  price: string;
}

export type OrderItem = {
  orderId: string;
  menuItemId: string;
  menuItemName: string;
  price: string;
  menuItemNumber: string;
  orderStatus: string;
}

export const menuTypeToName: { [key: string]: string; } = {
  'KUSHIYAKI': '串焼き',
  'RARE_PARTS': '希少部位',
  'SCROLLED': '巻き物',
  'VEGETABLE': '野菜焼き',
  'CHICKEN_FOOD': '鶏料理', 
  'SALAD': 'サラダ', 
  'CARBS': '飯物', 
  'ALCHOL': 'アルコール', 
  'SOFTDRINK': 'ソフトドリンク'
}