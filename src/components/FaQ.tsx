import React from "react";
import "./FaQ.css";

const FAQ: React.FC = () => {
  return (
    <section className="faq">
      <h2 className="faq-title">Frequently Asked Questions</h2>

      <div className="faq-item">
        <p className="faq-question">How do I order from the buffet online?</p>
        <p className="faq-answer">
          Select dishes from the menu, add them to your cart, and place your
          order using the form on the website.
        </p>
      </div>

      <div className="faq-item">
        <p className="faq-question">Can I pick up my order in person?</p>
        <p className="faq-answer">
          Yes, after confirming your order, you can come and pick it up at the
          specified time.
        </p>
      </div>

      <div className="faq-item">
        <p className="faq-question">What payment methods are available?</p>
        <p className="faq-answer">
          We accept card payments online, cash upon pickup, and mobile payments.
        </p>
      </div>

      <div className="faq-item">
        <p className="faq-question">Do you deliver?</p>
        <p className="faq-answer">
          Yes, we deliver orders within the area using our courier service.
        </p>
      </div>
    </section>
  );
};

export default FAQ;
