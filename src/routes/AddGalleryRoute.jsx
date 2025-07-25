import { Form } from "react-router";
import Field from "../components/Field";

async function clientAction({request}) {
    const formData = await request.formData()
}

export default function AddGalleryRoute() {
    return (
        <>
            <h1>Bild in Galerie hinzufügen</h1>
            <Form>
                <Field
                name="picture"
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                />
                <p>Aktzeptierte Dateitypen: jpg, jpeg, png</p>
            </Form>
        </>
    )
}