import { ReactNode, MouseEvent } from 'react';
import { usePhoneActions } from './PhoneActionContext';

interface PhoneTriggerProps {
  children: ReactNode;
  className?: string;
  as?: 'a' | 'button' | 'span';
}

export function PhoneTrigger({ children, className, as = 'a' }: PhoneTriggerProps) {
  const { openPhoneActions } = usePhoneActions();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    openPhoneActions();
  };

  const Component = as;

  return (
    <Component
      href="#"
      onClick={handleClick}
      className={className}
      role="button"
      aria-label="Open phone options"
    >
      {children}
    </Component>
  );
}
