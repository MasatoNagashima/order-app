import React, { ReactNode } from 'react';
import Image from "next/image";
import Link from 'next/link';

interface HeaderProps {
  children: ReactNode;
  storeId: string;
  tableId: string;
}

export const MenuHeader = ({children, storeId, tableId}: HeaderProps) => (
  <div className='flex justify-between sticky top-0 my-4 border-b-2 border-slate-500'>
    <Link href={`/stores/${storeId}/tables/${tableId}/menu-items`}>
      <Image src="/icon/back.svg" width={24} height={24} alt="minus icon" className="ml-2 my-1"/>
    </Link>
    <div className="text-base font-semibold text-center bg-white my-1">{children}</div>
    <div className='mx-4'></div>
  </div>
)
