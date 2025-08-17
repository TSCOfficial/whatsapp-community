import { useEffect, useState } from "react"
import { getAllPictures } from "../lib/buckets/gallery"
import styles from "../assets/GalleryRoute.module.css"
import Masonry from "../components/Masonry"
import Button from "../components/Button"
import LinkButton from "../components/LinkButton"
import {useCurrentUser} from "../lib/session.js";

const supabaseId =
    typeof window === 'undefined'
        ? process.env.VITE_SUPABASE_ID
        : import.meta.env.VITE_SUPABASE_ID; // allow vercel usage

export default function Gallery() {
    const user = useCurrentUser()
    const [pictureList, setPictureList] = useState([])
    

    useEffect(() => {
        const fetchGallery = async () => {
            const pictures = await getAllPictures()
            pictures.map(async (picture) => {
                const url = `https://${supabaseId}.supabase.co/storage/v1/object/public/gallery/${picture.name}`
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