import Image from "next/image";

export default function OrderItemCard() {
  return (
        <div className="flex justify-between items-center border-2 rounded-lg bg-gray-100">
          <Image src="/image/Yakitori.png" width={60} height={60} alt="Food icon" className="m-3"/>
          <div className="font-bold text-base m-3">焼き鳥盛り合わせ</div>
          <div className="font-bold text-base m-3">1,390円 ✖️ 2個</div>
        </div>
  );
}