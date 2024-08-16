import { SmallButton } from "../uiParts/small-button";
import Image from "next/image";

export default function CartFooter() {
  return (
    <>
        <div className="flex justify-between border-t-2">
            <div className="text-xl font-bold mx-8 my-4">1390円</div>
            <div className="flex justify-center max-w-44 mx-8 my-4">
                <Image src="/icon/minus.svg" width={30} height={30} alt="minus icon" className="mx-2"/>
                <div className="text-xl font-bold mx-2"> 1 </div>
                <Image src="/icon/plus.svg" width={30} height={30} alt="plus icon" className="mx-2"/>
            </div>
        </div>
        <div className="flex justify-between">
            <SmallButton href="/" color="white" className="m-4">レジに進む</SmallButton>
            <SmallButton href="/" color="red" className="m-4">カートに追加</SmallButton>
        </div>
    </> 
  );
}