import Link from 'next/link';
import { ReactNode } from 'react';

interface BigButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
  type?: string;
}

export const BigButton = ({ children, href, className, ...props }: BigButtonProps) => (
  <Link
    href={href}
    scroll={false}
    className={`py-5 px-24 h-16 rounded-full duration-150 text-white bg-red-500 font-bold ${
      className ? className : ''
    }`}
    {...props}
  >
    {children}
  </Link>
);
