import Link from 'next/link';
import { ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import React from 'react';

interface Props {
  onClick?: () => void;
  href: string;
  width: 'full' | 'inline' | 'mobile';
  size: 'default' | 'small' | 'large';
  children: ReactNode;
  badgeCount?: number;
}

const NavItemStyles = cva(
  'flex items-center gap-x-4 px-4 py-3 hover:bg-slate-100 text-slate-900 my-1',
  {
    variants: {
      width: {
        full: 'w-full',
        inline: 'max-w-fit rounded-full',
        mobile: 'inline-flex justify-center xl:justify-start',
      },
      size: {
        default: '',
        small: 'py-2 [&_div:last-child]:text-sm my-0',
        large: '',
      },
    },
    defaultVariants: {
      width: 'inline',
      size: 'default',
    },
  }
);

const NavItem = ({ onClick, href, children, width, size, badgeCount }: Props) => (
  <Link onClick={onClick} className={NavItemStyles({ width, size })} href={href}>
    {React.Children.map(children, (child, index) => {
      if (index === 0 && React.isValidElement(child)) {
        // Assuming the first child is the icon
        return (
          <div className="relative">
            {child}
            {badgeCount !== undefined && badgeCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {badgeCount}
              </span>
            )}
          </div>
        );
      }
      return child;
    })}
  </Link>
);

export default NavItem;