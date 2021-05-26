import Link, { LinkProps } from 'next/link';
import React, { ReactElement, cloneElement } from 'react';
import { useRouter } from 'next/dist/client/router';


interface IActiveLink extends LinkProps {
  children: ReactElement,
  activeClassName: string;

}

export const ActiveLink: React.FC<IActiveLink> = ({ children, activeClassName, ...rest }: IActiveLink) => {
  const { asPath } = useRouter()

  const className = asPath == rest.href ? activeClassName : ""

  return (
    <Link {...rest}>
      {cloneElement(children, { className })}
    </Link>
  );
}
