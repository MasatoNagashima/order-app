import Image from "next/image";

export default function MenuItemCard() {
  return (
        <div className="text-center border-2 rounded-lg bg-gray-100 p-4 m-4">
          <Image src="/image/Yakitori.png" width={120} height={120} alt="Food icon" className="mx-auto my-2"/>
          <div className="font-bold text-sm mx-auto my-1">焼き鳥盛り合わせ</div>
          <div className="font-bold text-xl mx-auto my-3">1,390円</div>
        </div>
  );
}