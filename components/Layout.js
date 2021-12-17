import Head from 'next/head'
import styles from '../styles/Layout.module.css'
import Header from './Header'
import Showcase from './Showcase'
import Footer from './Footer'

export default function Layout({ title, keyword, description, children }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
            </Head>
            <div className={styles.main}>
                <Header />
                {children}
                <Footer />
            </div>
        </div>
    )
}

Layout.defaultProp = {
    title: 'Sports Cards',
    description: 'Sports Cards Checklist',
    keywords: 'sport cards, checklist',
}