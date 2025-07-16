import { Form } from "react-router";

export default function AuthForm() {
    return (
        <Form>
            <input
            type="text"
            name="username"
            placeholder="Username"
            />
        </Form>
    )
}