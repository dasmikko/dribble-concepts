// Components
import MediaWidget from '../components/mediaWidget/mediaWidget'
import Head from 'next/head'

// Styling
import '../styles/styles.scss'


function HomePage() {
  return (
    <div style={{height: '100vh', width: '100vw'}}>
      <Head>
          <title>Media Widget Example</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MediaWidget />
    </div>
  )
}

export default HomePage