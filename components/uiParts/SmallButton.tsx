import Link from 'next/link';
import { ReactNode } from 'react';


interface SmallButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  color: 'red' | 'white';
}

export const SmallButton = ({ children, href, className, color }: SmallButtonProps) => {
  const baseClasses = 'py-6 px-8 text-center flex items-center h-16 rounded-full duration-150';
  const colorClasses = color === 'red' 
    ? 'text-white bg-red-500' 
    : 'border border-black';

  return (
    <Link
      href={href}
      scroll={false}
      className={`${baseClasses} ${colorClasses} ${className ? className : ''}`}
    >
      {children}
    </Link>
  );
};
