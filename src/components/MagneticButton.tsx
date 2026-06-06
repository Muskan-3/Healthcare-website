import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

// Magnetic mouse-tracking removed for performance. Uses CSS hover scale instead.
const MagneticButton = ({ children, className = '', onClick }: Props) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
);

export { MagneticButton };
export default MagneticButton;