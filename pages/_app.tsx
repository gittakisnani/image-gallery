import '../styles/globals.css'
import type { AppProps } from 'next/app'
import PictureModel from '../components/PictureModel'
import { useRouter } from 'next/router'
import CreatorModel from '../components/CreatorModel'


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <>
      {router.query.picture && <PictureModel />}
      {router.query.creator && <CreatorModel />}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
