import styles from "../assets/Masonry.module.css"
import Avatar from "./Avatar.jsx";

export default function Masonry({columns = 2, pictures}) {
    const columnData = Array.from({ length: columns }, () => [])

    pictures.forEach((pic, i) => {
        columnData[i % columns].push(pic) // gleichmäßig verteilen
    })

    return (
        <div className={styles.masonry}>
            {
                columnData.map((column, colIndex) => (
                    <div key={colIndex} className={styles.column}>
                        {column.map((picture, index) => (
                            <div key={index} className={styles.item}>
                                <img src={picture.url} alt={picture.name} />
                                {
                                    picture.display_name
                                        ? <div>
                                            {console.log(picture)}
                                            <Avatar userId={picture.owner_id}></Avatar>
                                            <p>{picture.display_name}</p>
                                        </div>
                                        : <p>Anonym</p>
                                }

                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}