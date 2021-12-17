import styles from '../styles/Header.module.css'
import Link from 'next/link';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>
                    <a> Sports Cards Checklist</a>
                </Link>
            </div>
        </header>
    )
}
