import { useState } from 'react';

export default function() {
    const [renderCount, setRenderCount] = useState(0);

    return () => {
        setRenderCount(renderCount + 1);
    }
}