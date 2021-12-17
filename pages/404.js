import Layout from "../components/Layout";
import styles from '../styles/404.module.css';
import Link from 'next/link';
import {FaExclamationTriangle} from 'react-icons/fa';

export default function NotFoundPage() {
    return (
        <Layout title='Page not found'>
            <div className={styles.error}>
                <h1> <FaExclamationTriangle />{' '}Page not found</h1>
                <h4>Hmm sorry but we cannot seem to located the page you are trying to access</h4>
                <Link href='/'>Go back home</Link>
            </div>
        </Layout>
    )
}
