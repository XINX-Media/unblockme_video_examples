import { useState } from "react";

export default function() {
    const [counter, setCounter] = useState(0);

    return () => {
        if (counter > 1000000) {
            setCounter(0);
        } else {
            setCounter(counter + 1);
        }
    }
}