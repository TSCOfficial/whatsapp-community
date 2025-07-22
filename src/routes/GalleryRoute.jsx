import { useEffect, useState } from "react"
import { getAllPictures, getPictureUrl } from "../lib/buckets/gallery"
import styles from "../assets/GalleryRoute.module.css"

export default function Gallery() {
    const [pictureList, setPictureList] = useState([])

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
    return (
        <div id={styles.gallery}>
            {
                pictureList.map((picture, i) => {
                    return <img src={picture.url} alt="" key={i}/>
                })
            }
        </div>
    )
}