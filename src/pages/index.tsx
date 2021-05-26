import { GetStaticProps } from "next";
import Head from "next/head";

import { stripe } from "../services/stripe";

import styles from '../styles/home.module.scss';
import SubscribeButton from "../Components/SubscribeButton";

interface IHome {
  product: {
    priceId: string;
    amout: number;
  }
}

export default function Home({ product }: IHome) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>

          <p>
            Get acess to all the publications <br />
            for <span>{product.amout}</span> month
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1Iv7q9F3LL249qyC8ybRrA3Y', {
    expand: ["product"]
  });

  const product = {
    priceId: price.id,
    amout: new Intl.NumberFormat('en-US', {
      style: "currency",
      currency: "USD"
    }).format(price.unit_amount / 100)
  }


  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, //24horas
  }
}