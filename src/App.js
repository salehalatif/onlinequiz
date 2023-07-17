import React, { useState } from 'react';
import './App.css';
import quesArray from "./data/gkquestions.json";
/*
const quesArray = [
    
  {
    "id": 1,
    "question": "What is the use of the create-react-app command in the React.js application??",
    "options": ["It is used to update a React app.","It is used to create a new React app.","It is used to install dependencies.","None of the above."],
    "answer": "It is used to create a new React app.",
    "correctOptionIndex": 1
  },
  {
    "id": 2,
    "question": "Which of the following is the correct name of React.js?",
    "options": ["React", "React.js", "ReactJS", "All of the above"],
    "answer": "All of the above",
    "correctOptionIndex": 3
  },
  {
    "id": 3,
    "question": "What does ES6 stand for?",
    "options": ["ECMAScript 6","ECMA 6","ECMAJavaScript 6","EJavaScript 6"],
    "answer": "ECMAScript 6",
    "correctOptionIndex": 0
  },
  {
    "id": 4,
    "question": "Which of the following command is used to install create-react-app?",
    "options": ["npm install -g create-react-app","npm install create-react-app","npm install -f create-react-app","install -g create-react-app"],
    "answer": "npm install -g create-react-app",
    "correctOptionIndex": 0
  },
  {
    "id": 5,
    "question": " What is a state in React?",
    "options": ["A permanent storage.","Internal storage of the component.","External storage of the component.","None of the above."],
    "answer": "Internal storage of the component.",
    "correctOptionIndex": 1
  }
];
*/

const App = () => {

  //defining State variables
  const [currentQIndx, setcurrentQIndx] = useState(0);
  //dont show any seclection at starts
  const [selectedOption, setSelectedOption] = useState(''); // null or ''
  //starting userScore is 0
  const [userScore, setUserScore] = useState(0);
  //at end of quiz showScore, currently it is false, when all quesArray asked it will be true
  const [showScore, setShowScore] = useState(false);
  const [showImg, setShowImg] = useState('');

  //set selected option which user select
  const eventOptionSelect = (option) => {
    //user only select option once
    if (!selectedOption)
      setSelectedOption(option);
  };

  const eventNextQuestion = () => {
    //if correct answer add in user userScore
    if (selectedOption === quesArray[currentQIndx].answer) {
      setUserScore(userScore + 1);
    }

    setSelectedOption(''); // for next question make it null [not selected]

    //check if quiz is finished
    if (currentQIndx + 1 < quesArray.length) {
      setcurrentQIndx(currentQIndx + 1);
    } else {
      setShowScore(true);

      setShowImg(`./images/${userScore}.jfif`);
      //setShowImg(`/images/logo192.png`);
      if (userScore === quesArray.length) {
        //const imageUrl =+ './public/images/firework.jfif';
      }
    }
  };

  return (
    <div className="app">
      {
        showScore ? (
          <div className="quiz-section">
            You scored {userScore} out of {quesArray.length}
            <div className="question-section">
              <img src={showImg} alt="result..." />
            </div>
          </div>
        ) : (
          <div className="quiz-section">
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQIndx + 1}</span>/{quesArray.length}
              </div>
              <div className="question-text">{quesArray[currentQIndx].question}</div>
            </div>
            <div className="options-section">
              {quesArray[currentQIndx].options.map((option, QuesOptionIndex) => {

                //console.log(option+" => "+QuesOptionIndex);
                const isCorrect = QuesOptionIndex === quesArray[currentQIndx].correctOptionIndex;
                const isSelected = selectedOption === option;

                // Applying different classes based on correctness and selection
                const optionClass = isSelected
                  ? isCorrect
                    ? 'correct'
                    : 'wrong'
                  : '';

                //console.log(" optionClass => "+optionClass);

                return (
                  <button
                    key={QuesOptionIndex}
                    className={`option ${optionClass}`}
                    onClick={() => eventOptionSelect(option)}
                  >
                    {option}
                  </button>
                )

              })
              }
            </div>
            <button className="next-button" onClick={eventNextQuestion}>
              Next Question
            </button>
          </div>
        )}
    </div>
  );
};

export default App;