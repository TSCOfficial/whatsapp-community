export default function Field({title, error, ...props}){
    return (
        <div>
            { title && <h4>{title}</h4> }
            <input {...props}/>
            { error && <h4>{error}</h4> }
        </div>
    )
}