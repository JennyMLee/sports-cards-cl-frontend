import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/SetItem.module.css'

export default function SetItem({ st }) {
    return (
        <Link href={`/sets/${st.slug}`}>
                <div className={styles.setItem}>
                    <Image src={st.image.data[0].attributes.formats.medium.url} width={225} height={275} />
                    <div className={styles.setItemContent}>
                        <h4 >{st.name}
                        </h4>
                        <p >Set Size: {st.set_size}
                        </p>
                    </div>
                </div>
        </Link>
    )
}
