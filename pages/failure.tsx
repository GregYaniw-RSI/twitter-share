import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Failure: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Failure</h1>
      <p>Something went wrong tweeting your betslip receipt to Twitter. Please try again!</p>
      <button onClick={() => window.close()}>Close</button>
    </div>
  )
}

export default Failure
