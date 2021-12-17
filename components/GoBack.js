import Link from 'next/link'
import styles from '../styles/GoBack.module.css'
import { IoArrowBackCircleSharp } from "react-icons/io5";

export default function GoBack({ link, name }) {
    return <div className={styles.backButton}>
        <Link href={link}>
            <a>
                <IoArrowBackCircleSharp size={20} /> {name ? name : 'Go Back'}
            </a>
        </Link>
    </div>
}