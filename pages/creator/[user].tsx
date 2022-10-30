import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import CreatorPage, { Creator } from '../../components/CreatorPage'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { useState } from 'react'
import Modal from '../../components/Modal'
import fetcher from '../../utils/fetcher'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { User } from '../edit-profile'

const Creator: NextPage<{ user: Creator, me: User }> = ({ user: fallbackData, me }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()
  const [text, setText] = useState('');
  const { data: user } = useSWR<Creator | null>(
    `users/${router.query.user}`,
    fetcher,
    { fallbackData }
  )

  const { data: currentUser }= useSWR<User | null>(
    'me',
    fetcher,
    { fallbackData: me }
  )

    return (
      <>
      <Head>
        <title>Creator Page</title>
        <meta name="description" content="Creators page allow you to see all his pictures, follow him...." />
      </Head>
        <main className=''>
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} text={text} />
          <Header user={currentUser!} bg='bg-white' searchBar className=' z-50'  />
          <CreatorPage loggedUser={currentUser!} setIsOpen={setIsOpen} isOpen={isOpen} setText={setText}  creator={user!}  />
        </main>
        <Footer />
      </>
    )
}

export default Creator

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = context.query;
  const data = await fetcher<Creator>(`users/${user}`);
  const me = await fetcher<User>('me');

  return {
    props: {
      user: data,
      me
    }
  }
}
