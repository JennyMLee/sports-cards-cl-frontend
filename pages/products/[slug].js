import Head from 'next/head'
import Image from 'next/image'
import Layout from '../../components/Layout'
import SetItem from '../../components/SetItem'
import { API_URL } from '../../config/index'
import styles from '../../styles/Product.module.css'
import Router from 'next/router'
import GoBack from '../../components/GoBack'


export default function ProductPage({ product }) {
    return (
        <Layout title={product.data[0].attributes.name}>
            <GoBack link={'/'}/>
            <div className={styles.productContainer}>
                <div className={styles.productTitle}>
                    <h1>{product.data[0].attributes.name}</h1>
                </div>
                <div className={styles.productSetsContainer}>
                    {product.data[0].attributes.sets.data.map((st) => (<SetItem key={st.id} st={st.attributes} />))}
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ params: { slug } }) {
    const res = await fetch(`${API_URL}/api/products?filters[slug][$eq]=${slug}&populate[sets][populate]=*`)
    const product = await res.json()
    return {
        props: { product: product }
    }
}