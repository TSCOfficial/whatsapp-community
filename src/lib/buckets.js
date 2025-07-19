import Supabase from "../../lib/supabase"
import Log from "../../lib/logging"

export async function getAllProfiles() {
    const {data, error} = await Supabase().storage.from("profilepictures").list()

    new Log("Data: ")
    console.log(data)
    if (error) {
            new Log(`Error fetching profilepictures: ${error}`).error()
        } else {
            new Log(`Successfully fetchted profilepictures: ${data}`)
            return data;
        }
}

export async function getProfileUrl(name) {
    const {data, error} = await Supabase().storage.from("profilepictures").getPublicUrl(name)

    new Log("Data: ")
    console.log(data)
    if (error) {
            new Log(`Error fetching profilepictures: ${error}`).error()
        } else {
            new Log(`Successfully fetchted profilepictures: ${data}`)
            return data;
        }
}