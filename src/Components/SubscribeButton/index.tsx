import styles from './styles.module.scss';

interface ISubscribeButton {
  priceId: string;
}

const SubscribeButton: React.FC<ISubscribeButton> = ({ priceId }: ISubscribeButton) => {
  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe Now</button>
  )
}

export default SubscribeButton;