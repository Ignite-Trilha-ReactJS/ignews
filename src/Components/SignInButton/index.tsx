import styles from './styles.module.scss';

import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

const SignInButton: React.FC = () => {
  const isUserLoggedIn = true;

  return isUserLoggedIn
    ? (
      <button className={styles.signInButton} type="button">
        <FaGithub color="#04d361" />
        Douglas Santos
        <FiX color="#737380" className={styles.closeIcon} />
      </button>
    )
    : <button className={styles.signInButton} type="button"><FaGithub color="#eba417" /> Sign in with Github</button>
}

export default SignInButton;