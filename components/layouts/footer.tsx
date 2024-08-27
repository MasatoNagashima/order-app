import React from 'react';
import CartIcon from '@/public/icon/cart.svg';
import MenuIcon from '@/public/icon/menu.svg';
import PaymentIcon from "@/public/icon/payment.svg";
import { useRouter } from 'next/navigation';
import { BigButton } from '../uiParts/big-button';

interface FooterItemProps {
  link?: string;
  title: string;
  Icon: React.ComponentType<{ className?: string; color?: string }>;
}

interface FooterProps {
  menuLink?: string;
  cartLink?: string;
  paymentLink?: string;
  buttonLink?: string;
  onClick?: () => void;
}

const FooterItem = ({link, title, Icon}: FooterItemProps) => {
  const colorClass = link ? 'text-black' : 'text-red-500';
  const router = useRouter();
  const handleClick = () => {
    if (link != null) {
      router.push(link);
    }
  };
  
  return(
    <div className="mx-2 my-3" onClick={handleClick}>
      <div className={`${colorClass} w-8 h-8 mx-auto`}>
        <Icon className="w-full h-full"/>
      </div>
      <div className={`font-bold mx-auto mt-2 text-xs ${colorClass}`}>{title}</div>
    </div>
  );
};

export const Footer = (
  {menuLink, cartLink, paymentLink, buttonLink, onClick}: FooterProps
) => (
  <div className='fixed bottom-0 w-full bg-white border-t border-t-gray-400'>
    {buttonLink && (<div className='flex justify-center'>
      <div className='py-5 px-24 h-16 rounded-full duration-150 text-white bg-red-500 font-bold mt-5 mb-3' onClick={onClick}>
                  確定
      </div>
    </div>)}
    <div className="flex justify-around">
      <FooterItem title='お品書き' Icon={MenuIcon} link={menuLink}/>
      <FooterItem title='カート' Icon={CartIcon} link={cartLink}/>
      <FooterItem title='会計' Icon={PaymentIcon} link={paymentLink}/>
    </div>
  </div>  
)
