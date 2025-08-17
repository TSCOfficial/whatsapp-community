import { useEffect, useState } from "react"
import {getAllPictures, getPictureUrl} from "../lib/buckets/gallery"
import styles from "../assets/GalleryRoute.module.css"
import Masonry from "../components/Masonry"
import Button from "../components/Button"
import LinkButton from "../components/LinkButton"
import {useCurrentUser} from "../lib/session.js";

export default function Gallery() {
    const user = useCurrentUser()
    const [pictureList, setPictureList] = useState([])
    

    useEffect(() => {
        const fetchGallery = async () => {
            const pictures = await getAllPictures()
            pictures.map((picture) => {
                const url = getPictureUrl(picture.name)
                setPictureList((prev) => [...prev, {...picture, url: url}])
            })   
        }

        fetchGallery()
    }, [])

    

    return (
        <>
            {
                user && <LinkButton to="/gallery/add">Add picture</LinkButton>
            }

            <Masonry pictures={pictureList}/>
        </>
  )

}