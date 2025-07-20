export default function Select({placeholder, options, isMulti, min = 1, max = 1, onChange}) {
    const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null); // Stores the selected value(s)
    const inputRef = useRef(); // Reference to the custom select input element
    return (
        <div>
            
        </div>
    )
}