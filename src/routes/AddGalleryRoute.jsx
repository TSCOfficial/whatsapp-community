import { Form } from "react-router";
import Field from "../components/Field";
import Button from "../components/Button";
import { upload } from "../lib/buckets/gallery";
import {useState} from "react";

/**
 * Add an image to the Gallery.<br>
 * *Uses inline event handler (handleSubmit) due to File object not supported by clientAction*
 * @returns {JSX.Element}
 * @constructor
 */
export default function AddGalleryRoute() {
    const [picture, setPicture] = useState();

    const handleSubmit = async () => {
        const { data, error } = await upload(picture);
        if (data) {
            console.log("Data: ", data);
        }
        if (error) {
            console.log("Dataerror: ", error);
        }
    }
    return (
        <>
            <h1>Bild in Galerie hinzufügen</h1>
            <Form noValidate>
                <Field
                name="picture"
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                onChange={(e) => setPicture(e.target.files[0])}
                />
                <p>Aktzeptierte Dateitypen: jpg, jpeg, png</p>

                <Button type="submit" onClick={handleSubmit}>Hochladen</Button>
            </Form>
        </>
    )
}