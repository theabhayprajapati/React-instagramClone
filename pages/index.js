import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="font-mono text-3xl">
      <div>
        <Head>
          <title>Instagram</title>
          <link
            rel="shortcut icon"
            href="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png"
            type="image/x-icon"
          />
        </Head>
        <div>this is instagram</div>
      </div>
    </div>
  )
}
