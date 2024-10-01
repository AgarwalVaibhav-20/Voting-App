
import { useState } from 'react';

const faqData = [
  {
    question: "How do I create an account?",
    answer: "You can create an account by clicking the 'Sign Up' button on the homepage and filling in the required information."
  },
  {
    question: "How do I vote in an election?",
    answer: "To vote, navigate to the ongoing elections section, select your preferred candidate, and submit your vote."
  },
  {
    question: "What should I do if I forget my password?",
    answer: "If you forget your password, click on the 'Forgot Password?' link on the login page to reset it."
  },
  {
    question: "Can I change my vote?",
    answer: "Once your vote has been submitted, it cannot be changed. Please ensure that you review your choice before submitting."
  },
  {
    question: "Is my vote confidential?",
    answer: "Yes, your vote is confidential. We employ strict security measures to ensure your privacy."
  },
  {
    question: "What are the eligibility requirements to vote?",
    answer: "You must be a registered user and at least 18 years old to vote in elections."
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f8f7ff] flex flex-col justify-center items-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <div 
                className="flex justify-between items-center cursor-pointer py-4"
                onClick={() => toggleAnswer(index)}
              >
                <h2 className="text-lg font-semibold text-gray-800">{faq.question}</h2>
                <span className={`transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
              {openIndex === index && (
                <p className="text-gray-600 text-sm pb-4">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
