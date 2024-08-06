import Link from 'next/link';

export const BigButton = ({ children, href, className }: any) => (
  <Link
    href={href}
    scroll={false}
    className={`py-2.5 px-4 text-center rounded-full duration-150 ${
      className || ''
    }`}
  >
    {children}
  </Link>
);
