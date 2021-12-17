import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import ProductItem from '../components/ProductItem'
import { API_URL } from '../config/index'

export default function HomePage({ products }) {
  return (
    <Layout title="Sports Card CL">
      <div className={styles.container}>
        {products.data.map((product) => (<ProductItem key={product.id} product={product} />))}
      </div>
    </Layout>
  )
}


export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/products?populate=image`)
  const products = await res.json()
  return {
    props: { products },
  }
}