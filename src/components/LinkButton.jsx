import { Link } from "react-router";
import styles from "../assets/LinkButton.module.css"

export default function LinkButton({children, to}) {
    return (
        <Link className={styles.link} to={to}>
            {children}
        </Link>
    )
}