import React from "react";
import "./FaQ.css";

const FAQ: React.FC = () => {
  return (
    <section className="faq">
      <h2 className="faq-title">Часто задаваемые вопросы</h2>

      <div className="faq-item">
        <p className="faq-question">Как сделать заказ в буфете онлайн?</p>
        <p className="faq-answer">
          Выберите блюда в меню, добавьте их в корзину и оформите заказ через
          форму на сайте.
        </p>
      </div>

      <div className="faq-item">
        <p className="faq-question">Можно ли забрать заказ самостоятельно?</p>
        <p className="faq-answer">
          Да, после подтверждения заказа вы можете прийти и забрать его в
          указанное время.
        </p>
      </div>

      <div className="faq-item">
        <p className="faq-question">Какие способы оплаты доступны?</p>
        <p className="faq-answer">
          Мы принимаем оплату картой онлайн, наличными при самовывозе, а также
          через мобильные платежи.
        </p>
      </div>

      <div className="faq-item">
        <p className="faq-question">Есть ли доставка?</p>
        <p className="faq-answer">
          Да, мы доставляем заказы в пределах района с помощью нашего
          курьерского сервиса.
        </p>
      </div>
    </section>
  );
};

export default FAQ;
