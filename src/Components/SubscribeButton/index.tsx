import styles from './styles.module.scss';
import { useSession, signIn } from 'next-auth/client';

import { api } from '../../services/api';

import { getStripeJs } from '../../services/stripe-js';
import { useRouter } from 'next/dist/client/router';

interface ISubscribeButton {
  priceId: string;
}

const SubscribeButton: React.FC<ISubscribeButton> = ({ priceId }: ISubscribeButton) => {
  const [session] = useSession();
  const router = useRouter()


  const handleSubscribe = async () => {
    if (!session) {
      signIn('github');
      return;
    }

    if (session.activeSubscription) {
      router.push("/posts");
      return;
    }

    try {
      const response = await api.post("/subscribe");
      const { sessionId } = response.data;
      const stripe = await getStripeJs();

      stripe.redirectToCheckout({ sessionId })

    } catch (err) {
      console.log(err)
      alert(err)
    }

  }

  return (
    <button onClick={handleSubscribe} type="button" className={styles.subscribeButton}>
      Subscribe Now</button>
  )
}

export default SubscribeButton;