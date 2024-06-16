import React, { useEffect, useState } from "react";
import ProgressBar from "./components/progressBar/ProgressBar";
import "./FullScroll.css";

const FullScrollPage = ({ children, answers }) => (
    <div className="full-scroll-page">
        <ProgressBar answers={answers} totalQuestions={10} />
        <img src="https://images.typeform.com/images/LztDQu9MkiiN" alt="BuildForm" className="logo" />
        <div className="full-scroll-page-content">{children}</div>
    </div>
);

function FullScroll({
    answers,
    handleShowError,
    currentQuestionId,
    isRequiredQuestionAnswered,
    checkIfLastQuestion,
    children,
}) {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const pages = React.Children.toArray(children);
    const SCROLL_THRESHOLD = 30;

    const isQuestion = (pageIndex) => pageIndex !== 0;

    const handleNextQuestion = (pageIndex) => {
        if (isQuestion(pageIndex) && !isRequiredQuestionAnswered()) {
            handleShowError(true);
            return pageIndex;
        }
        return Math.min(pageIndex + 1, pages.length - 1);
    };

    const handlePrevQuestion = (pageIndex) => {
        handleShowError(false);
        return Math.max(pageIndex - 1, 0);
    };

    const getNextIndex = (prevPageIndex, delta) => (
        delta > 0 ? handleNextQuestion(prevPageIndex) : handlePrevQuestion(prevPageIndex)
    );

    const handleTouchStart = (event, startY) => {
        startY.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event, startY, isScrolling) => {
        const deltaY = startY.current - event.touches[0].clientY;
        const container = event.target;
        const isAtTop = container.scrollTop === 0;
        const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight;

        if (!isScrolling.current && Math.abs(deltaY) > SCROLL_THRESHOLD) {
            if ((deltaY > 0 && !isAtBottom) || (deltaY < 0 && !isAtTop)) {
                event.preventDefault();
                container.scrollTo({ top: container.scrollTop + deltaY, behavior: "smooth" });
            } else {
                isScrolling.current = true;
                const delta = Math.sign(deltaY);
                setCurrentPageIndex((prevPageIndex) => getNextIndex(prevPageIndex, delta));

                setTimeout(() => { isScrolling.current = false; }, 1000);
            }
        }
    };

    const handleWheel = (event, isScrolling) => {
        const delta = Math.sign(event.deltaY);
        const container = event.target;
        const isAtTop = container.scrollTop === 0;
        const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight;

        if (!isScrolling.current && Math.abs(event.deltaY) > SCROLL_THRESHOLD) {
            if ((delta > 0 && !isAtBottom) || (delta < 0 && !isAtTop)) {
                event.preventDefault();
                container.scrollTo({ top: container.scrollTop + event.deltaY, behavior: "smooth" });
            } else {
                isScrolling.current = true;
                setCurrentPageIndex((prevPageIndex) => getNextIndex(prevPageIndex, delta));

                setTimeout(() => { isScrolling.current = false; }, 1000);
            }
        }
    };

    useEffect(() => {
        let isScrolling = { current: false };
        let startY = { current: 0 };

        const handleTouchStartEvent = (event) => handleTouchStart(event, startY);
        const handleTouchMoveEvent = (event) => handleTouchMove(event, startY, isScrolling);
        const handleWheelEvent = (event) => handleWheel(event, isScrolling);

        window.addEventListener("touchstart", handleTouchStartEvent);
        window.addEventListener("touchmove", handleTouchMoveEvent, { passive: false });
        window.addEventListener("wheel", handleWheelEvent, { passive: false });

        return () => {
            window.removeEventListener("touchstart", handleTouchStartEvent);
            window.removeEventListener("touchmove", handleTouchMoveEvent);
            window.removeEventListener("wheel", handleWheelEvent);
        };
    }, [answers, currentQuestionId]);

    const containerStyle = {
        transform: `translateY(-${currentPageIndex * (100 / pages.length)}%)`,
        scrollSnapType: "y mandatory",
        overflowY: "scroll",
        scrollBehavior: "smooth",
    };

    const updateNextPage = () => {
        checkIfLastQuestion();
        setCurrentPageIndex((prevPageIndex) => handleNextQuestion(prevPageIndex));
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (event.ctrlKey) {
                checkIfLastQuestion();
            } else {
                updateNextPage();
            }
        }
    };

    const addPropsToReactElement = (element) => (
        React.isValidElement(element) ? React.cloneElement(element, { updateNextPage }) : element
    );

    const addPropsToChildren = (children) => (
        Array.isArray(children) ? children.map(addPropsToReactElement) : addPropsToReactElement(children)
    );

    return (
        <div className="full-scroll-container" tabIndex={0} onKeyDown={handleKeyDown}>
            <div className="full-scroll-content" style={containerStyle}>
                {pages.map((page, index) => (
                    <FullScrollPage key={index} answers={answers}>
                        {addPropsToChildren(page)}
                    </FullScrollPage>
                ))}
            </div>
        </div>
    );
}

export default FullScroll;