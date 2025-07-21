import Supabase from "../../lib/supabase"
import Log from "../../lib/logging"

export async function getAllAvatars() {
    const {data, error} = await Supabase().storage.from("avatars").list()

    if (error) {
        new Log(`Error fetching avatars: `, error).error()
        return
    }

    new Log(`Successfully fetchted avatars: `, data)
    return data;

}

export async function getAvatarById(id) {
  const avatars = await getAllAvatars()

  const data = avatars.filter((avatar) => avatar.id == id)

  if (data.length == 0) {
    new Log(`Error fetching avatar: 0 length index`).error()
    return
  }

  new Log(`Successfully fetchted avatar: `, data)
  return data;
}

export async function getAvatarUrl(name) {
    const {data, error} = await Supabase().storage.from("avatars").getPublicUrl(name)

    if (error) {
      new Log(`Error fetching avatar URL: `, error).error()
      return
    }

    new Log(`Successfully fetchted avatar URL: `, data)
    return data;
        
}

export async function getAvatarUrlById(id) {
  const avatar = await getAvatarById(id)
  const url = getAvatarUrl(avatar[0].name)
  return url
}