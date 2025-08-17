import Supabase from "../../../lib/supabase"
import Log from "../../../lib/logging"

const supabaseId =
    typeof window === 'undefined'
        ? process.env.VITE_SUPABASE_ID
        : import.meta.env.VITE_SUPABASE_ID; // allow vercel usage

const BUCKET_NAME = "avatars"

export async function getAllAvatars() {
    const {data, error} = await Supabase().storage.from(BUCKET_NAME).list()

    if (error) {
        new Log(`Error fetching avatars: `, error).error()
        return
    }
    return data;

}

export async function getAvatarById(id) {
    const avatars = await getAllAvatars()

    const data = avatars.filter((avatar) => avatar.id == id)

    if (data.length == 0) {
        new Log(`Error fetching avatar: 0 length index`).error()
        return
    }
    return data;
}

export function getAvatarUrl(name) {
    return `https://${supabaseId}.supabase.co/storage/v1/object/public/${BUCKET_NAME}/${name}`;
}

export async function getAvatarUrlById(id) {
    const avatar = await getAvatarById(id)
    return getAvatarUrl(avatar[0].name)
}
