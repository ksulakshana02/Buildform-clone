import './App.css';
import { useEffect, useState } from 'react';
import TextInput from './components/textInput/TextInput';
import SelectInput from './components/selectInput/SelectInput';
import RadioInput from './components/radioInput/RadioInput';
import RadioGroupInput from './components/radioInput/RadioGroupInput';
import FullScroll from './FullScroll';
import Start from './components/start/Start';
import Final from './components/final/Final';
import questions from './questions';
import Loader from './components/loader/Loader';


// Utility function to validate email
const isValidEmail = (email) => {
  const validRegerx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return validRegerx.test(email);
};

// Utility function to validate phone number
const isValidPhoneNumber = (phone) => {
  const validRegex = /^\d{8,}$/;
  return validRegex.test(phone);
};

function App() {

  const [answers, setAnswers] = useState([]);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("Please fill this in");
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitForm, setSubmitForm] = useState(false);

  // Simulate loading state
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);


  // Update the current question number
  const updateCurrentQuestionNumber = (prevQuestionNumber, questionId) => {
    if (questionId > currentQuestionId) {
      return prevQuestionNumber + 1;
    } else if (questionId < currentQuestionId) {
      return prevQuestionNumber - 1;
    }
    return prevQuestionNumber;
  };

  // Update the current question ID and question number
  const updateCurrentQuestionId = (questionId) => {
    setQuestionNumber((prevQuestionNumber) => {
      return updateCurrentQuestionNumber(prevQuestionNumber, questionId);
    });

    setCurrentQuestionId(questionId);
  };


  // Handle the answer input for each question
  const handleAnswer = (answer, questionId) => {
    // Convert answer to a string and trim it
    const trimmedAnswer = String(answer).trim();
    if (!trimmedAnswer) {
      removeAnswer(questionId);
      return;
    }

    const currentQuestion = questions.find((q) => q.id === questionId);

    if (currentQuestion.validation === "phone" && isNaN(answer)) {
      displayError("Numbers only please");
      return;
    }

    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      const existingAnswer = newAnswers.find((a) => a.id === questionId);
      if (existingAnswer) {
        existingAnswer.value = answer;
      } else {
        newAnswers.push({ id: questionId, type: currentQuestion.type, value: answer });
      }
      return newAnswers;
    });

    if (showError) setShowError(false);
  };

  // Remove answer for a given question
  const removeAnswer = (questionId) => {
    setAnswers((prevAnswers) => prevAnswers.filter((ans) => ans.id !== questionId));
  };

  // Display error message and handle the animation for error
  const displayError = (message) => {
    setError(message);
    setShowError(true);
    setTimeout(() => setShowError(false), 800);
  };

  // Validate if the current required question is answered correctly
  const isRequiredQuestionAnswered = () => {
    const currentQuestion = questions.find((q) => q.id === currentQuestionId);
    const currentAnswer = answers.find((a) => a.id === currentQuestionId);

    if (!currentQuestion.isRequired) return true;

    if (currentAnswer) {
      if (currentQuestion.type === "radio-group") {
        if (!currentAnswer.value || currentAnswer.value.length < currentQuestion.maxSelect) {
          displayError("Please make more choices");
          return false;
        }
      } else if (!currentAnswer.value.trim()) {
        displayError(currentQuestion.type === "text" ? "Please fill this in" : "Please make a selection");
        return false;
      }

      if (currentQuestion.validation === "email" && !isValidEmail(currentAnswer.value)) {
        displayError("Hmmm... that email doesn't look right");
        return false;
      }

      if (currentQuestion.validation === "phone" && !isValidPhoneNumber(currentAnswer.value)) {
        displayError("Hmmm... that phone number doesn't look right");
        return false;
      }

      return true;
    }

    displayError(currentQuestion.type === "text" ? "Please fill this in" : "Please make a selection");
    return false;
  };

  // Check if the current question is the last question and handle form submission
  const checkIfLastQuestion = () => {
    const currentQuestion = questions.find((q) => q.id === currentQuestionId);
    if (currentQuestion.isLastQuestion && isRequiredQuestionAnswered()) {
      setSubmitForm(true);
    }
  };

  // Generate the current question component based on the question type
  const getCurrentQuestion = (question) => {
    const questionText = question.text;

    if (question.condition && !question.condition(answers)) {
      return null;
    }

    const commonProps = {
      error,
      answers,
      key: question.id,
      question,
      onAnswer: handleAnswer,
      showError,
      questionText,
      updateCurrentQuestionId,
      questionNumber,
    };

    switch (question.type) {
      case "text":
        return <TextInput {...commonProps} />;
      case "select":
        return <SelectInput {...commonProps} />;
      case "radio":
        return <RadioInput {...commonProps} />;
      case "radio-group":
        return <RadioGroupInput {...commonProps} maxSelections={question.maxSelect} />;
      default:
        return null;
    }
  };

  if (loading) {
    return <Loader />
  };

  if (submitForm) {
    return <Final />
  };

  return (
    <>
      <FullScroll
        isRequiredQuestionAnswered={isRequiredQuestionAnswered}
        answers={answers}
        handleShowError={setShowError}
        checkIfLastQuestion={checkIfLastQuestion}
        currentQuestionId={currentQuestionId}
      >
        <Start />
        {questions.map((question) => getCurrentQuestion(question))}
      </FullScroll>
    </>
  );
}

export default App;
