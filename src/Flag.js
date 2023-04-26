import React, { useState, useEffect } from 'react';
import './Flag.css';

export default function Flag() {
    let [flag, setFlag] = useState(null)
    let [currentChars, setCurrentChars] = useState('')

    useEffect(() => {
        fetch("https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/766572", {
            method: "GET",
        })
            .then(response => response.text()).then(data => setFlag(data))
    }, [])

    useEffect(() => {
        typeWriterEffect()
    }, [flag])

    const typeWriterEffect = () => {
        if (!flag) return

        let i = -1
        let timer = setInterval(() => {
            i += 1
            if (i === flag.length - 1) clearInterval(timer)
            setCurrentChars((prev) => prev + flag[i])
        }, 500)
    }

    const currentCharsList = currentChars.split('')

    return (
        <div className='Flag'>
            {
                !flag &&
                <span>Loading...</span>
            }
            <ul>
                {
                    currentCharsList.map((ele, idx) =>
                        <li key={idx}>{ele}</li>
                    )
                }
            </ul>
        </div>
    )
}
