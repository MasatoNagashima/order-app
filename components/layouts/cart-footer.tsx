import { useEffect, useState } from "react";
import { SmallButton } from "../uiParts/small-button";
import MinusIcon from '@/public/icon/minus.svg';
import PlusIcon from "@/public/icon/plus.svg";
import { createOrder } from "@/lib/order/actions";
import { useRouter } from "next/navigation";

interface CartFooterProps {
  price: string;
  customerId: number;
  menuItemId: number;
  storeId: string;
  tableId: number;
}

export default function CartFooter(
  {price, customerId, menuItemId, storeId, tableId}: CartFooterProps
) {
  const [menuItemNumber, setMenuItemNumber] = useState(1);
  const [colorClass, setColorClass] = useState('text-gray-400');
  const router = useRouter();

  useEffect(() => {
    const newColorClass = menuItemNumber > 1 ? 'text-black' : 'text-gray-400';
    setColorClass(newColorClass);
  }, [menuItemNumber]);

  const handleMinusClick = () => {
    setMenuItemNumber(prevNumber => Math.max(prevNumber - 1, 1)); // 0以下にはならないようにする
  };

  const handlePlusClick = () => {
    setMenuItemNumber(prevNumber => prevNumber + 1);
  };

  const handleGoCart = async() => {
    const orderId = await createOrder(menuItemId, menuItemNumber, customerId);
    router.push(`/stores/${storeId}/tables/${tableId}/cart`);
  }

  const handleAddCart = async() => {
    const orderId = await createOrder(menuItemId, menuItemNumber, customerId);
    router.push(`/stores/${storeId}/tables/${tableId}/menu-items`);
  }

  return (
    <div className="fixed bottom-0 w-full">
        <div className="flex justify-between border-t-2">
            <div className="text-xl font-bold mx-8 my-4">{price}円</div>
            <div className="flex justify-center max-w-44 mx-8 my-4">
              <div className={`w-8 h-8 mx-auto ${colorClass}`} onClick={handleMinusClick}>
                <MinusIcon className="w-full h-full"/>
              </div>
              <div className="text-xl font-bold mx-2"> {menuItemNumber} </div>
              <div className={`w-8 h-8 mx-auto text-black`} onClick={handlePlusClick}>
                <PlusIcon className="w-full h-full"/>
              </div>
            </div>
        </div>
        <div className="flex justify-between">
            <SmallButton color="white" className="m-4" onClick={handleGoCart}>レジに進む</SmallButton>
            <SmallButton color="red" className="m-4" onClick={handleAddCart}>カートに追加</SmallButton>
        </div>
    </div>
  );
}