import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  

  return (
    <div className={styles.container}>
      <h1>SUCH.MARKET</h1>
      <div>
        Sign in
      </div>
      <div>
        <a href="#">List your service</a>
      </div>
      <div>
          services for sale
      </div>
    </div>
  )
}
