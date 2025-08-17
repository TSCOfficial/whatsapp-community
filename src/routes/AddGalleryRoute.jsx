import { Form } from "react-router";
import Field from "../components/Field";
import Button from "../components/Button";
import { upload } from "../lib/buckets/gallery";
import {useState} from "react";
import {Input} from "postcss";

/**
 * Add an image to the Gallery.<br>
 * *Uses inline event handler (handleSubmit) due to File object not supported by clientAction*
 * @returns {JSX.Element}
 * @constructor
 */
export default function AddGalleryRoute() {
    const [picture, setPicture] = useState();
    const [name, setName] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, picture);
        const { data, error } = await upload(name, picture);
        if (data) {
            console.log("Data: ", data);
        }
        if (error) {
            console.log("Dataerror: ", error);
        }
    }

    const onPictureChange = (e) => {
        setPicture(e.target.files[0]);
        setName(e.target.files[0].name);
    }
    return (
        <>
            <h1>Bild in Galerie hinzufügen</h1>
            <Form noValidate>
                <Field
                name="picture"
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                onChange={(e) => onPictureChange(e)}
                />
                <p>Aktzeptierte Dateitypen: jpg, jpeg, png</p>
                <Field
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Button type="submit" onClick={(e) => handleSubmit(e)}>Hochladen</Button>
            </Form>
        </>
    )
}