import { useEffect, useRef, useState } from "react";
import useIsInViewport from "../../hooks/useIsInViewport";
import ButtonContainer from "../buttonContainer/ButtonContainer";
import { ErrorContainer } from "../errorContainer/ErrorContainer";
import rightArrow from "../../assets/right-arrow.svg";
import check from "../../assets/check.svg";

const RadioGroupInput = ({
    error,
    question,
    onAnswer,
    showError,
    questionText,
    updateCurrentQuestionId,
    questionNumber,
    updateNextPage,
    maxSelections,
}) => {

    const radioRef = useRef(null);
    const isInViewport = useIsInViewport(radioRef);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [disabledOptions, setDisabledOptions] = useState([]);

    useEffect(() => {
        // listen for changes

        if (isInViewport) {
            radioRef.current.focus();
            updateCurrentQuestionId(question.id);
        }
    }, [isInViewport]);


    const handleOptionChange = (option) => {
        if (disabledOptions.includes(option)) return;
        let newSelectedOptions = selectedOptions;

        if (selectedOptions.includes(option)) {
            newSelectedOptions = selectedOptions.filter((o) => o !== option);
            setDisabledOptions([]);
        } else {
            if (newSelectedOptions.length !== maxSelections) {
                newSelectedOptions = [...newSelectedOptions, option];
            }
        }

        if (newSelectedOptions.length === maxSelections) {
            const newDisabledOptions = question.options.filter(
                (o) => !newSelectedOptions.includes(o)
            );
            setDisabledOptions(newDisabledOptions);
        }
        onAnswer(newSelectedOptions, question.id);
        setSelectedOptions(newSelectedOptions);
    };

    const handleKeyDown = (event) => {
        if (event.key.length === 1 && /[a-zA-Z]/.test(event.key)) {
            const key = event.key.toUpperCase().charCodeAt(0);
            const index = key - 65;
            if (index < question.options.length) {
                handleOptionChange(question.options[index]);
            }
        }
    };

    const getSelectionMessage = () => {
        if (selectedOptions.length === maxSelections)
            return ""
        if (selectedOptions.length === 0)
            return `Choose ${maxSelections}`

        let pendingSelection = maxSelections - selectedOptions.length
        return `Choose ${pendingSelection} more`
    };

    return (
        <div className="question-container">
            <div className="question-number-container">
                <span className="question-number">
                    {questionNumber}{" "}
                    <img src={rightArrow} alt="right arrow" className="right-arrow" />
                </span>
                <label className="question-text" htmlFor={question.id}>
                    {questionText} {question.isRequired && <span>*</span>}
                </label>
            </div>
            <div className="question-subtitle">
                <span>{question.subText}</span>
            </div>
            <div
                className="radio-group"
                role="radiogroup"
                ref={radioRef}
                onKeyDown={handleKeyDown}
                tabIndex={0}
            >
                <span className="selection-number">{getSelectionMessage()}</span>
                {question.options.map((option, index) => (
                    <div
                        key={option}
                        className={`radio-button  ${disabledOptions.includes(option) ? "disabled" : ""
                            }`}
                        onClick={() => handleOptionChange(option)}
                    >
                        <div className="key-hint-container">
                            <div
                                className={`key-hint 
                    ${selectedOptions.includes(option) ? "active" : ""} 
                    ${disabledOptions.includes(option) ? "disabled" : ""}
                    `}
                            >
                                {String.fromCharCode(65 + index)}
                            </div>
                        </div>
                        <div
                            key={option}
                            className={`radio-label  ${disabledOptions.includes(option) ? "disabled" : ""
                                }`}
                        >
                            <span className="radio-text">{option}</span>
                        </div>
                        <div
                            className={`checked 
                  ${selectedOptions.includes(option) ? "active" : ""}
                  `}
                        >
                            <img src={check} alt="checked" className="radio-checked" />
                        </div>
                    </div>
                ))}
            </div>
            <div>{showError && <ErrorContainer error={error} />}</div>
            <div>
                {!showError && (
                    <ButtonContainer
                        buttonText="OK"
                        showPressEnter={true}
                        handleButtonClick={updateNextPage}
                        showPressEnterText={question.isLastQuestion === true ? "Ctrl + Enter" : "Enter"}
                    />
                )}
            </div>
        </div>
    );

};

export default RadioGroupInput;
