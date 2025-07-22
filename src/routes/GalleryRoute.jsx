import { useEffect, useState } from "react"
import { getAllPictures, getPictureUrl } from "../lib/buckets/gallery"
import Masonry from '@mui/lab/Masonry';
import styles from "../assets/GalleryRoute.module.css"

export default function Gallery() {
    const columns = 2
    const [pictureList, setPictureList] = useState([])
    const columnData = Array.from({ length: columns }, () => [])

    useEffect(() => {
        const fetchGallery = async () => {
            const pictures = await getAllPictures()
            pictures.map(async (picture) => {
                const url = await getPictureUrl(picture.name)
                setPictureList((prev) => [...prev, {...picture, url: url.publicUrl}])
            })   
        }

        fetchGallery()
    }, [])

    pictureList.forEach((pic, i) => {
        columnData[i % columns].push(pic) // gleichmäßig verteilen
    })

    return (
    <div className={styles.masonry}>
        {
            columnData.map((column, colIndex) => (
                <div key={colIndex} className={styles.column}>
                    {column.map((picture, index) => (
                        <div key={index} className={styles.item}>
                            <img src={picture.url} alt={picture.name} />
                            <p>{picture.name}</p>
                        </div>
                    ))}
                </div>
            ))
        }
    </div>
  )

}