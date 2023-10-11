import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    return <div>
        <button
            onClick={() => {
                navigate("/");
            }}
        >
            Return to Home
        </button>
    </div>
}