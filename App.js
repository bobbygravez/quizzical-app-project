import React from "react"
import Modal from "./Modal"
import Questions from "./Questions"
import generateId from "./generateId"

export default function App (){
    const [quiz, setQuiz] = React.useState(false)
    const [question, setQuestion] = React.useState([])
    const [quizEnded, setQuizEnded] = React.useState(false)
    const [newGame, setNewGame] = React.useState(false)

    function startQuiz(){
        setQuiz(true)
    }
    
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(response => response.json())
            .then(data => setQuestion(data.results.map(ques => {
                        
                        return {
                            key: generateId(),
                            id: generateId(), 
                            question: ques.question,
                            chosenAnswer: '',
                            isCorrect: false,
                            correctAnswer: {
                                id: generateId(),
                                isSelected: false,
                                isCorrect: false,
                                answer: ques.correct_answer
                            },
                            incorrectAnswers: ques.incorrect_answers.map(ans => {
                                return {
                                    id: generateId(),
                                    isSelected: false,
                                    isCorrect: false,
                                    answer: ans
                                }
                            })      
                }
            })))
    }, [newGame])
    
    
    function selectAnswer(event,id1, id2){
        if(!quizEnded){
        setQuestion(prevState => {
            return prevState.map(states => {
            return states.id === id1? {...states,
                                chosenAnswer: event.target.textContent,
                                isCorrect: event.target.textContent === states.correctAnswer.answer? true : false,
                                incorrectAnswers: states.incorrectAnswers.map(state => { 
                                    return state.id === id2 ? {...state, isSelected: true} : {...state, isSelected: false}})
                            } : states
            })
        })
        }
    }   
    
    function countCorrectAnswers(){
        let newArray = []
        for(let ques of question){
            if(ques.isCorrect === true){
                newArray.push(ques)
            }
        }
        return newArray.length
    }
    
    function checkAnswers(){
        setQuizEnded(true)
        setQuestion(prevState => {
            return prevState.map(states => {
                return {
                    ...states,
                    incorrectAnswers: states.incorrectAnswers.map(state => { return state.answer === states.correctAnswer.answer? {...state, isSelected: true} : state.answer === states.chosenAnswer?  {...state, isSelected: true, isCorrect: true} : state})
                } 
            })
        })
    }

 
    
    function startNewGame(){
        setQuizEnded(false)
        setNewGame(prevGame => !prevGame)
        setQuestion(prevState => prevState.map(states => {
            return {
                    ...states,
                    incorrectAnswers: states.incorrectAnswers.map(state => { return  {...state, isSelected: false}})
                }
        }))
    }
    
    const displayQuestions = question.map(ques => { 
        return <Questions
                    {...ques}
                    quizEnded={quizEnded}
                    selectAnswer={selectAnswer}
        />
    })
    
    return(
        <div className="container">
            {!quiz && <Modal startQuiz={startQuiz}/>}
            {quiz &&
            <div className="questions-container">
                {displayQuestions}
                {quizEnded && <h3>you scored: {countCorrectAnswers()}/{question.length} correct answers</h3>}
                {!quizEnded && <button onClick={checkAnswers} className="check-answers">Check answers</button>}
                {quizEnded && <button onClick={startNewGame} className="check-answers">Play again</button>}
            </div>
            }
        </div>
    )
}

