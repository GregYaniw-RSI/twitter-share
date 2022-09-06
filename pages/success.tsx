import type { NextPage } from 'next'
import { useEffect } from 'react'

const Success: NextPage = () => {
  useEffect(() => {
    window.close();
  }, []);

  return null;
}

export default Success
