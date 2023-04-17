import React, { useState } from 'react';

export default function TextInput({ onBlur, value }) {
    const [tempValue, setTempValue] = useState(value);

    return (
        <input
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={() => {
                onBlur(tempValue);
            }}
        />
    );
}