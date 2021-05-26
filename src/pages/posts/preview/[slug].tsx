import React, { useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

import Link from 'next/link';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';

import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../../services/prismic';

import Head from 'next/head';

import styles from '../post.module.scss'

interface IPostPreview {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

const PostPreview: React.FC<IPostPreview> = ({ post }: IPostPreview) => {
  const [session] = useSession();
  const router = useRouter();


  useEffect(() => {
    if (session) {
      router.push(`/posts/${post.slug}`);
      return;
    }


  }, [session])

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div className={`${styles.postContent} ${styles.previewContent}`} dangerouslySetInnerHTML={{ __html: post.content }} />
          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/home">
              <a> Subscribe now 🤗 </a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByID(String(params.slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: "2-digit",
      month: "long",
      year: "numeric"
    })
  }

  return {
    props: {
      post
    },
    revalidate: 60 * 30 // 30 minutos
  }
}

export default PostPreview;