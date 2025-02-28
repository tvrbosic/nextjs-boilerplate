import { LinkProps } from 'next/link';

export interface INavLinkProps extends LinkProps {
  children?: React.ReactNode | undefined;
}
