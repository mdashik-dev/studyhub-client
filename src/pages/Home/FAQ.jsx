import React, { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I get started?",
      answer:
        "Sign up on our platform, select your desired course, and start learning right away! You can access materials anytime.",
    },
    {
      question: "Is there a trial period?",
      answer:
        "Yes, we offer a 7-day free trial for most of our courses. This gives you the opportunity to explore the content before committing.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Yes, we offer a 30-day refund policy if you are not satisfied with the course. Simply contact our support team for assistance.",
    },
    {
      question: "Do I get a certificate after completing a course?",
      answer:
        "Yes, StudyHub provides certificates upon completion of each course, which can be added to your resume or LinkedIn profile.",
    },
    {
      question: "Can I switch between courses?",
      answer:
        "Yes, you can switch between courses if you need to adjust your learning path. Simply contact our support team for assistance.",
    },
    {
      question: "Are there live sessions?",
      answer:
        "Yes, we offer live sessions with expert tutors in addition to the pre-recorded course materials for an interactive learning experience.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can contact our support team via email at support@studyhub.com or through our contact form on the website.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept payments via credit card, PayPal, and other secure payment gateways.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Frequently Asked Questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="space-y-4">
            <button
              onClick={() => toggle(index)}
              className="w-full text-left text-xl font-semibold text-gray-800 py-4 px-6 bg-gray-200 rounded-lg"
            >
              {faq.question}
            </button>
            {openIndex === index && (
              <p className="text-lg text-gray-700 p-6 bg-gray-100 rounded-lg">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
