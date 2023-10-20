import { useEffect, useState } from 'react';
import { decToHex, hexToDec } from '../utils/numbers';

export default function RainbowText({ text, startColor, endColor, speed }) {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setOffset((oldOffset) => {
                return oldOffset - 1;
            });
        }, speed);

        return () => {
            clearInterval(interval);
        }
    }, [speed]);

	const startColorDec = hexToDec(startColor);
	const endColorDec = hexToDec(endColor);

	const diff = endColorDec-startColorDec;
	const perLetter = diff / text.length;

	const generatedColors = [];
	for (let i=startColorDec;i<=endColorDec;i+=perLetter) {
		const num = parseInt(i);
		const hexNum = `${decToHex(num)}`.padStart(3, "0");
		generatedColors.push(decToHex(`#${hexNum}`));
	}

    return <span>
        {text.split("").map((character, index) => {
            const colorIndex = Math.abs((index + offset) % generatedColors.length);
			return <span
                key={`rainbow_${index}`}
				style={{
					color: generatedColors[colorIndex],
				}}
			>{character}</span>;
		})}
    </span>
}