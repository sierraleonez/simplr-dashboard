import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useAuth } from '../src/components/Auth/provider'
import React from 'react'
import { StaticPageProps } from 'Constants/Pages'

const Home: NextPage = () => {
  const authContext = useAuth()
  return (
    <div className={styles.container}>
      {authContext?.isUserAuthenticated() ? <div>Authenticated</div> : <div>Not Authenticated</div>}
    </div>
  )
}

export async function getStaticProps(): Promise<StaticPageProps>{
  return {
    props: {
      flow: 'public'
    }
  }
}
export default Home
