import React from "react"

export default function Modal(props){
    return (
        <div className="modal">
            <h1>Quizzical</h1>
            <h3>The quiz for Geniuses</h3>
            <button className="start-quiz" onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}