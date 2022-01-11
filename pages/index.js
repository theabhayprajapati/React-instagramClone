import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="font-Roboto bg-gray-50 h-screen overflow-y-scroll scrollbar-hide ">
      <div className="">
        <Head>
          <title>Instagram</title>
          <link
            rel="shortcut icon"
            href="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png"
            type="image/x-icon"
          />
        </Head>
        {/* //todo Header */}
        <Header />
        {/* todo Feed */}
        <Feed /> {/* //todo Modal the banner that takes input */}
      </div>
    </div>
  )
}
