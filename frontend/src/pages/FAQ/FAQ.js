/**
 * Author : Sruthi Shaji
 */
import "../../App.css";
import QuestionBox from "../../components/QuestionBox/QuestionBox";
import "./FAQ.css";
export default function FAQ() {
    const questions = getSampleQuestions();
    return (
        <div className="App">
            <div className="topic-box">
                <div style={{
                    backdropFilter: "blur(20px)",
                    backgroundColor: "#f19a1644",
                    padding: "20px"
                }}>
                    <h1 style={{ color: "#fff" }}>Frequently Asked Questions</h1>
                </div>

            </div>
            <div className="qa-container">
                {questions.map(question => (
                    <QuestionBox key={question.id} question={question} />
                ))}
            </div>
            <header className="App-header">

            </header>
        </div>);
}


const getSampleQuestions = () => {
    return [
        {
            "id": 1,
            "question": "How far in advance should I use your services?",
            "answer": "For organizers we recommend using our services at least 2 weeks in advance. This allows us to secure the best resources and provide you with the support you need for a successful event. If you're planning a large-scale event or have specific requirements, booking earlier will help ensure everything goes smoothly. For attendees to secure your spot at an event, it's best to book your tickets as soon as possible. Popular events can sell out quickly, so booking early guarantees you a place and often provides better options for seating and pricing."
        },
        {
            "id": 2,
            "question": "Can you help with both corporate and private events?",
            "answer": "Yes, we can assist with both corporate and private events. Whether you're planning a business conference, a team-building event, a wedding, or a private party, we offer customized services to fit your needs. No matter the type of event, our team of experienced professionals is dedicated to delivering exceptional service and ensuring a memorable experience for you and your guests. We take pride in our ability to handle a wide range of events with attention to detail and a commitment to excellence."
        },
        {
            "id": 3,
            "question": "What are the payment terms and methods accepted?",
            "answer": "We accept various payment methods including credit and debit cards, bank transfers, and online payment platforms such as PayPal and Stripe. For specific details about payment schedules, additional payment options, or any special arrangements, please do not hesitate to contact us directly. Our team is here to assist you and ensure a smooth payment process for your event."
        },
        {
            "id": 4,
            "question": "What happens if I need to cancel or reschedule my event?",
            "answer": "If you need to cancel or reschedule your event, please notify us as soon as possible. Our cancellation and rescheduling policies vary based on the timing and nature of the event. Generally, cancellations made 1 days before the event may incur a small fee of the total cost. For rescheduling, we will work with you to find a new date and adjust the arrangements accordingly. Please contact us for detailed information and to discuss your specific situation."
        },
        {
            "id": 5,
            "question": "Are there any restrictions or requirements for venues?",
            "answer": "We strive to provide maximum flexibility with your choice of venue, so we do not impose strict restrictions. However, there are a few general guidelines to ensure your event is successful. It’s essential to select a venue that can comfortably accommodate your expected number of guests. Booking the venue well in advance is recommended to secure your preferred date and time."
        },
        {
            "id": 6,
            "question": "What should I do if I have special accessibility needs for my event?",
            "answer": "If you or your guests have special accessibility needs, please contact us as soon as possible so we can make the necessary arrangements to accommodate these needs effectively. We are dedicated to ensuring that all guests can enjoy your event comfortably. We will work with you to select a venue that meets accessibility standards, including features like ramps, elevators, and accessible restrooms."
        }
    ];
};