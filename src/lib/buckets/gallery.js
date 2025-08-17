import Supabase from "../../../lib/supabase"
import Log from "../../../lib/logging"
import {useCurrentUser} from "../session.js";
import {useEffect, useState} from "react";

const supabaseId =
    typeof window === 'undefined'
        ? process.env.VITE_SUPABASE_ID
        : import.meta.env.VITE_SUPABASE_ID; // allow vercel usage

const BUCKET_NAME = "gallery"

//
// GET
// sortBy: { column: "created_at", order: "desc"}
export async function getAllPictures() {
    const { data, error} = await Supabase().from("gallery")
        .select("*")
        .order("created_at", { ascending: false })

    console.log("gallery data: ", data)
    if (error) {
        new Log(`Error fetching pictures: `, error).error()
        return error
    }
    return data;

}

export async function getPictureById(id) {
  const pictures = await getAllPictures()

  const data = pictures.filter((picture) => picture.id == id)

  if (data.length == 0) {
    new Log(`Error fetching picture: 0 length index`).error()
    return
  }
  return data;
}

export function getPictureUrl(name) {
    return `https://${supabaseId}.supabase.co/storage/v1/object/public/${BUCKET_NAME}/${name}`;
}

export async function getPictureUrlById(id) {
  const picture = await getPictureById(id)
  const url = getPictureUrl(picture[0].name)
  return url
}

//
// POST
//
export async function upload(name, picture) {
    console.log(name, picture);
    const { data, error } = await Supabase().storage.from(BUCKET_NAME).upload(name, picture)

    if (error) {
        new Log(`Error uploading picture: `, error).error()
        return error
    }
    return data;
}