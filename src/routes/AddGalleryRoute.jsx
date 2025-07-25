import { Form } from "react-router";
import Field from "../components/Field";
import Button from "../components/Button";
import { upload } from "../lib/buckets/gallery";

async function clientAction({request}) {
    const formData = await request.formData()
    const picture = formData.get("picture")

    console.log("Picturedata: ", picture)

    const { data, error } = await upload(picture)
    console.log(data, error)
}

export default function AddGalleryRoute() {
    return (
        <>
            <h1>Bild in Galerie hinzufügen</h1>
            <Form method="post" noValidate>
                <Field
                name="picture"
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                />
                <p>Aktzeptierte Dateitypen: jpg, jpeg, png</p>

                <Button
                type="submit">Hochladen</Button>
            </Form>
        </>
    )
}

AddGalleryRoute.action = clientAction