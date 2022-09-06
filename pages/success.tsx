import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'

const Success: NextPage = () => {

  useEffect(() => {
    window.close();
  }, []);

  return null;
}

export default Success
