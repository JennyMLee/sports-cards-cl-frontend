import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/ProductItem.module.css'
const comingSoonURL = "https://res.cloudinary.com/df4ohxhsp/image/upload/v1639539663/coming_soon_f24b9af3a0.jpg"

export default function ProductItem({ product }) {
    const productData = product.attributes
    return (
        <div className={styles.event}>
            <div className={styles.img}>
                <Image
                    src={
                        productData.image.data
                            ? productData.image.data[0].attributes.formats.medium.url
                            : comingSoonURL
                    }
                    width={200}
                    height={200}
                />
            </div>
            <div className={styles.info}>
                <h4>{productData.name}</h4>
                <p>Season: {productData.season}</p>
                <p> Release Date: {productData.release}</p>
                <p>Manufacturer: {productData.manufacturer}</p>
            </div>
            <Link href={`/products/${productData.slug}`}>
                <div className={styles.link}>
                    Details
                </div>
            </Link>
        </div>
    )
}