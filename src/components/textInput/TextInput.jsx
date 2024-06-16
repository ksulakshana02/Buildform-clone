import React, { useEffect, useRef } from 'react'
import useIsInViewport from '../../hooks/useIsInViewport';
import rightArrow from "../../assets/right-arrow.svg";
import { ErrorContainer } from '../errorContainer/ErrorContainer';
import ButtonContainer from '../buttonContainer/ButtonContainer';
import { Box, Input } from '@mui/material';
import "./TextInput.css";

const ariaLabel = { 'aria-label': 'description' };

const TextInput = ({
    error,
    answers,
    question,
    onAnswer,
    showError,
    questionText,
    questionNumber,
    updateCurrentQuestionId,
    updateNextPage,
}) => {

    const inputRef = useRef(null);
    const isInViewport = useIsInViewport(inputRef);

    useEffect(() => {
        if (isInViewport) {
            inputRef.current.focus();
            updateCurrentQuestionId(question.id);
        }
    }, [isInViewport]);



    return (
        <div
            className="question-container"
            id={question.validation === "phone" ? "text-input" : ""}
        >
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
            <div>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Input placeholder={
                        question.placeholder
                            ? question.placeholder
                            : "Type your answer here ..."
                    } inputProps={ariaLabel}
                        ref={inputRef}
                        onChange={(e) => onAnswer(e.target.value, question.id)}
                        style={{ color: "#CF9FFF", fontSize: "24px", fontWeight: 400, marginTop: "32px", width: "100%" }}
                        value={
                            answers.find((a) => a.id === question.id) !== undefined
                                ? answers.find((a) => a.id === question.id).value
                                : ""
                        }
                    />
                </Box>
            </div>
            <div>{showError && <ErrorContainer error={error} />}</div>
            <div>
                {!showError && (
                    <ButtonContainer
                        buttonText={question.isLastQuestion === true ? "Submit" : "OK"}
                        showPressEnterText={
                            question.isLastQuestion === true ? "Ctrl + Enter" : "Enter"
                        }
                        showPressEnter={true}
                        handleButtonClick={updateNextPage}
                    />
                )}
            </div>
        </div>
    );
};

export default TextInput;
