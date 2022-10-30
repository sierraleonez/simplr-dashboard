import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useAuth } from '../src/components/Auth/provider'
import React from 'react'
const Home: NextPage = () => {
  const authContext = useAuth()
  return (
    <div className={styles.container}>
      {authContext?.authState.token ? <div>Authenticated</div> : <div>Not Authenticated</div>}
    </div>
  )
}

export async function getStaticProps(context: any){
  return {
    props: {
      protected: false
    }
  }
}
export default Home
