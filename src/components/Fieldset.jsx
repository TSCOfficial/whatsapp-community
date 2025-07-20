import styles from "../assets/Fieldset.module.css"

export default function Fieldset({children, title}) {
    return (
        <fieldset className={styles.fieldset}>
            { title && <h3>{title}</h3> }
            {children}
        </fieldset>
    )
}