import Supabase from "../../../lib/supabase"
import Log from "../../../lib/logging"

const BUCKET_NAME = "gallery"

export async function getAllPictures() {
    const {data, error} = await Supabase().storage.from(BUCKET_NAME).list(null, {
        sortBy: { column: "created_at", order: "desc"}
    })

    if (error) {
        new Log(`Error fetching pictures: `, error).error()
        return
    }

    new Log(`Successfully fetchted pictures: `, data)
    return data;

}

export async function getPictureById(id) {
  const pictures = await getAllPictures()

  const data = pictures.filter((picture) => picture.id == id)

  if (data.length == 0) {
    new Log(`Error fetching picture: 0 length index`).error()
    return
  }

  new Log(`Successfully fetchted picture: `, data)
  return data;
}

export async function getPictureUrl(name) {
    const {data, error} = await Supabase().storage.from(BUCKET_NAME).getPublicUrl(name)

    if (error) {
      new Log(`Error fetching picture URL: `, error).error()
      return
    }

    new Log(`Successfully fetchted picture URL: `, data)
    return data;
        
}

export async function getPictureUrlById(id) {
  const picture = await getPictureById(id)
  const url = getPictureUrl(picture[0].name)
  return url
}