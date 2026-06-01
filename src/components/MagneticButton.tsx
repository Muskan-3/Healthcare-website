import { ReactNode } from 'react';
import useMagnetic from '../hooks/useMagnetic';

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const MagneticButton = ({ children, className = '', onClick }: Props) => {
  const ref = useMagnetic(26);

  return (
    <button ref={ref} onClick={onClick} className={`magnetic ${className}`}>{children}</button>
  );
};

export default MagneticButton;