import { useState } from "react";
import toast from "react-hot-toast";

export const Question = ({
  question,
  answerOptions,
  number,
  onAnswerChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelection = (e, option) => {
    console.log("handleAnswerSelection is called by: ", e.target);
    e.stopPropagation();
    if (selectedAnswer && selectedAnswer !== option.answer) {
      console.log("not allowed ");
      toast.error("Can't change answer once attempted");
    } else {
      console.log("allowed : ", option.answer);
      setSelectedAnswer(option.answer);
      onAnswerChange(option.answer);
    }
  };
  return (
    <div className="mb-6  ">
      <div
        className={`bg-white flex flex-col justify-between items-center w-full  shadow-sm rounded-lg  p-5 text-lg font-semibold mb-2 disabled:text-gray-600 disabled:shadow-none text-teal-700 ${
          isOpen
            ? " shadow-xl shadow-gray-200 hover:shadow-gray-300"
            : selectedAnswer !== null
            ? "text-gray-400  "
            : ""
        }`}
      >
        <div className="flex justify-between items-start w-full">
          <div className="text-left pr-6">
            Q.{number}) {question}{" "}
          </div>
          <div className="flex  items-center justify-center px-5">
            {selectedAnswer !== null && (
              <div className=" mr-1 text-sm bg-teal-700 text-white rounded-full px-2">
                Attempted
              </div>
            )}
            <button
              className="text-right text-3xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "▲" : "▼"}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="m-5  p-5 grid  gap-3 w-full    ">
            {answerOptions.map((option, index) => (
              <div key={index}
             >
                <button
                  className={`border disabled:cursor-not-allowed rounded-lg p-2 hover:bg-teal-900 hover:text-white ${
                    selectedAnswer === option.answer
                      ? "bg-teal-700 text-white cursor-not-allowed"
                      : ""
                  }`}
                  onClick={(e) => {
                    //e.preventDefault();
                     e.stopPropagation();
                    handleAnswerSelection(e, option);
                  }}
                 
                  title={
                    selectedAnswer !== null
                      ? "Already attempted answer can't be changed"
                      : ""
                  }
                >
                  <label className="  flex items-start "
                
                  >
                    <div className=" w-5 ">
                      <input
                        type="radio"
                        name={`answer-${number}`}
                        value={option.answer}
                        checked={selectedAnswer === option.answer}
                        readOnly
                       
                      />
                    </div>

                    <div 
                    onClick={(e)=>e.stopPropagation()}
                    className=" w-52 text-left pl-3 ">{option.answer}</div>
                  </label>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
