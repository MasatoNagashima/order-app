import React, { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}

export const Header = ({children}: HeaderProps) => (
    <div className="text-base py-4 px-8 font-semibold text-center">{children}</div>
)
