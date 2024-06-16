import { useEffect, useRef, useState } from "react";
import { getData } from "./data";
import useIsInViewport from "../../hooks/useIsInViewport";
import ButtonContainer from "../buttonContainer/ButtonContainer";
import { ErrorContainer } from "../errorContainer/ErrorContainer";
import Select, { components } from "react-select";
import rightArrow from "../../assets/right-arrow.svg";

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        border: "1px solid #ccc",
        padding: 10,
        margin: 10,
        width: "97%",
        color: "#CF9FFF",
        fontSize: "20px",
        fontWeight: 400,
        boxSizing: "border-box",
        cursor: "pointer",
        display: "block",
        lineHeight: "28px",
        backgroundColor: "#FAF5FF",
        borderRadius: "4px",
        "&:hover": { backgroundColor: "rgba(207, 159, 255, 0.4)" },

    }),

    menuList: (provided) => ({
        ...provided,
        border: null,
        backgroundColor: "white", // Change the color of the dropdown arrow
    }),

    control: (base, state) => ({
        ...base,
        boxShadow: "rgba(207, 159, 255, 0.6) 0px 0px 0px 2px inset",
        boxSizing: "border-box",
        minWidth: "242px",
        color: "#CF9FFF",
        backgroundColor: "white",
        "&:hover": { borderColor: "gray", }, // border style on hover
    }),

    singleValue: (styles) => ({
        ...styles,
        color: "#CF9FFF",
        fontSize: "20px",
        "@media(max-width: 576px)": {
            fontSize: "14px",
        },
    }),

    placeholder: (styles) => ({
        ...styles,
        fontSize: "20px",
        "@media(max-width: 576px)": {
            fontSize: "14px",
        },
    }),

    indicatorSeparator: (styles) => ({
        ...styles,
        display: "none",
    }),

};

const SelectInput = ({
    error,
    question,
    onAnswer,
    showError,
    questionText,
    updateCurrentQuestionId,
    questionNumber,
    updateNextPage,

}) => {
    const options = getData();
    const [inputValue, setInputValue] = useState(null);
    const inputRef = useRef(null);
    const isInViewport = useIsInViewport(inputRef);

    useEffect(() => {
        if (isInViewport) {
            inputRef.current.focus();
            updateCurrentQuestionId(question.id);
        }
    }, [isInViewport]);

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
            <div style={{ marginTop: "32px" }} ref={inputRef}>
                <Select
                    isClearable={true}
                    value={inputValue}
                    options={options}
                    onChange={(option) => {
                        setInputValue(option);
                        onAnswer(option, question.id);
                    }}
                    styles={customStyles}
                    captureMenuScroll={true}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            primary25: "rgb(48,48,48,0.7)",
                            primary: "rgb(48,48,48)",
                        },
                    })}
                    components={{
                        DropdownIndicator:
                            inputValue !== null
                                ? null
                                : (props) => <components.DropdownIndicator {...props} />,
                    }}
                />
            </div>
            <div>{showError && <ErrorContainer error={error} />}</div>
            <div>
                {!showError && (
                    <ButtonContainer
                        buttonText="OK"
                        showPressEnterText={question.isLastQuestion === true ? "Ctrl + Enter" : "Enter"}
                        showPressEnter={true}
                        handleButtonClick={updateNextPage}
                    />
                )}
            </div>
        </div>
    );
};

export default SelectInput;