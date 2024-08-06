import Link from 'next/link';
import { ReactNode } from 'react';

interface BigButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export const BigButton = ({ children, href, className }: BigButtonProps) => (
  <Link
    href={href}
    scroll={false}
    className={`py-5 px-24 text-center flex items-center h-16 rounded-full duration-150 text-white bg-red-500 font-bold ${
      className ? className : ''
    }`}
  >
    {children}
  </Link>
);
