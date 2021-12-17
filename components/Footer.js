import Link from 'next/link'
import styles from '../styles/Footer.module.css'
import { FaInstagram } from "react-icons/fa";


export default function Footer() {
    return (
        <div className={styles.footer}>
            <p className={styles.follow}><Link href='https://www.instagram.com/wsportscollector/'><FaInstagram /></Link></p>
            <p>Copyright &copy; Jenny Lee 2021</p>
        </div>
    )
}