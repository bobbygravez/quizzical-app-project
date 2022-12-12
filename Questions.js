import React from "react"

export default function Questions(props){ 

     let placeholder = document.createElement('div');
        placeholder.innerHTML = props.question;
    let question = placeholder.innerText;
        
     let answersArrObj = props.incorrectAnswers
     if(answersArrObj.length < 4){
         answersArrObj.push(props.correctAnswer)
         answersArrObj.sort(function(){return 0.5 - Math.random()})
     }  
     
     let endStyles;
     
     
    const answersArray = answersArrObj.map(ans => { 
        let placeholders = document.createElement('div');
        placeholders.innerHTML = ans.answer;
        let answer = placeholder.innerText;

        if(props.chosenAnswer === props.correctAnswer.answer){
         endStyles = {
             backgroundColor: ans.isSelected? "#94D7A2" : "#F5F7FB",
             border: ans.isSelected? "none": "0.794239px solid #4D5B9E"
         }
     } else if(props.chosenAnswer !== props.correctAnswer.answer){
         
         endStyles = {
                backgroundColor: ans.isCorrect? "#F8BCBC" : ans.isSelected? "#94D7A2" : "#F5F7FB",
                border: ans.isCorrect? "none" : ans.isSelected? "none" : "0.794239px solid #4D5B9E",
                opacity: ans.isCorrect?  0.5 : 1
         }
         
     }

        const styles = {
            backgroundColor: ans.isSelected? "#D6DBF5" : "#F5F7FB",
            border: ans.isSelected? "none": "0.794239px solid #4D5B9E"
        }
        return <div className="options" key={ans.id} onClick={(event) => {props.selectAnswer(event, props.id, ans.id)}} style={props.quizEnded? endStyles : styles }>{answer}</div>
    })
    
    return(
        <div className="questions">
            <h2>{question}</h2>
            <div className="options-container">
                {answersArray}
            </div>
            <hr/>
        </div>
    )
}