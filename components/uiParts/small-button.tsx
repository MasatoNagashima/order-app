interface SmallButtonProps {
  children: React.ReactNode;
  className?: string;
  color: 'red' | 'white';
  onClick?: () => void;
}

export const SmallButton = ({ children, className, color, onClick }: SmallButtonProps) => {
  const baseClasses = 'py-6 px-8 rounded-full duration-150';
  const colorClasses = color === 'red' 
    ? 'text-white bg-red-500' 
    : 'border border-black';

  return (
    <div
      className={`${baseClasses} ${colorClasses} ${className ? className : ''}`} onClick={onClick}
    >
      {children}
    </div>
  );
};
