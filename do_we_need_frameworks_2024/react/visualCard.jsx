import React from 'react';

export default function VisualCard({ title, image }) {
    return <div
        style={{
            border: '1px solid black',
            borderRadius: 5,
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
        <img 
            src={image}
            style={{
                width: '50px',
                height: '50px',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
            }}
        />
        <div style={{
            textAlign: 'center',
            padding: '5px',
            id: 'title',
        }}>
            {title}
        </div>
    </div>;
}