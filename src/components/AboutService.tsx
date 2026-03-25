import "./AboutService.css";

export default function AboutService() {
  return (
    <section className="about-service">
      <h1 className="about-title">About the MVECafe service</h1>

      <p className="about-text">
        MVECafe is a convenient way to grab a quick snack between classes. The
        service features current menu items, affordable prices, and clear
        descriptions of dishes.
      </p>

      <p className="about-text">
        The web application was created to simplify interaction with the
        cafeteria. It allows you to preview the selection in advance, view
        prices, and place an order without waiting.
      </p>

      <p className="about-text">
        The service interface is adapted for computers, tablets, and mobile
        devices, making it convenient for students and college staff throughout
        the school day.
      </p>

      <p className="about-text">
        The menu and data are updated in real time, ensuring up-to-date
        information and stable operation of the service.{" "}
      </p>
    </section>
  );
}
