import React, { useState } from "react";
import "./QuestionBox.css";

export default function QuestionBox({ question }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const wordLimit = 50;

    const truncateText = (text) => {
        const words = text.split(" ");
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(" ") + "...";
    };

    return (
        <div className="qa-box">
            <h6 className="question">{question.question}</h6>
            <p className="answer">
                {isExpanded ? question.answer : truncateText(question.answer)}
            </p>
            <p className="read-more" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? "Read Less" : "Read More"}
            </p>
        </div>
    );
}
