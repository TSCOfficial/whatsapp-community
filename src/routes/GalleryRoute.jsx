import { useEffect, useState } from "react"
import { getAllPictures, getPictureUrl } from "../lib/buckets/gallery"
import styles from "../assets/GalleryRoute.module.css"
import Masonry from "../components/Masonry"
import Button from "../components/Button"
import LinkButton from "../components/LinkButton"

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
        <>
            <LinkButton to="/gallery/add">Add picture</LinkButton>
            <Masonry pictures={pictureList}/>
        </>
  )

}