import Image from "next/image";

interface OrderItemCardProps {
  imgPath: string;
  menuItemName: string;
  price: string;
  menuItemNumber: string;
}

export default function OrderItemCard(
  {imgPath, menuItemName, price, menuItemNumber}: OrderItemCardProps
) {
  return (
        <div className="flex justify-between items-center border-2 rounded-lg bg-gray-100">
          <Image src={imgPath} width={40} height={40} alt="Food icon" className="m-3"/>
          <div className="font-bold text-base m-3">{menuItemName}</div>
          <div className="font-bold text-base m-3">{price}円 ✖️ {menuItemNumber}個</div>
        </div>
  );
}