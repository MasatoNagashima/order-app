import Image from "next/image";
import Link from "next/link";

interface MenuItemCardProps {
  menuName: string;
  price: string;
  link: string;
}


export default function MenuItemCard({menuName, price, link}: MenuItemCardProps) {
  return (
    <Link href={link} className="text-center border-2 rounded-lg bg-gray-100 p-4 m-4 w-2/5">
        <Image src="/image/Yakitori.png" width={120} height={120} alt="Food icon" className="mx-auto my-2"/>
        <div className="font-bold text-sm mx-auto my-1">{menuName}</div>
        <div className="font-bold text-xl mx-auto my-3">{price}円</div>
    </Link>
        
  );
}