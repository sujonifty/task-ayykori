import { useState } from "react";


const AlphabetInteraction = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    const [outputString, setOutputString] = useState('');
    // console.log(alphabet)

    const handleTileByClick = (letter) => {
        let newString = outputString + letter;
        console.log(newString)
        const regex = new RegExp(`${letter}{3,}`);
        newString = newString.replace(regex, (match) => '_'.repeat(match.length));

        setOutputString(newString);
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div id="outputString" className="mb-6 text-2xl font-semibold text-gray-800">
                {outputString || 'Click on a tile to start'}
            </div>

            
            <div className="grid grid-cols-6 gap-5">
                {alphabet.map((letter) => (
                    <button
                        key={letter}
                        onClick={() => handleTileByClick(letter)}
                        className="w-16 h-16 bg-cyan-500 text-white text-xl font-bold rounded-lg hover:bg-blue-600"
                    >
                        {letter}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AlphabetInteraction;