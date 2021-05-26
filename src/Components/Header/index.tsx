import React from 'react';
import { useRouter } from 'next/dist/client/router';

import styles from './styles.module.scss';

import SignInButton from '../SignInButton';
import { ActiveLink } from '../ActiveLink'

const Header: React.FC = () => {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}><a>Home</a></ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active}><a  > Posts</a></ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}

export default Header;