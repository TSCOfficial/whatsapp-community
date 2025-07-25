import styles from "../assets/Masonry.module.css"

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
                                <p>{picture.name}</p>
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}