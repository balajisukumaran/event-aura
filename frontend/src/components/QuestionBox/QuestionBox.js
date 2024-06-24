import "./QuestionBox.css";

export default function QuestionBox({ question }) {
    return (
        <div className="qa-box">
            <h6 className="question">
                {question.question}
            </h6>
            <p className="answer">{question.answer}</p>
            <p>Read More</p>
        </div>
    );
}