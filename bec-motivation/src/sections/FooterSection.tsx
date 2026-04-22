import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { SocialLinks } from "../components/SocialLinks";
import "./Sections.css";

export function FooterSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.2,
  });

  return (
    <section
      id="contacts"
      ref={ref}
      className={`section footer-section fade-in-section ${isVisible ? "visible" : ""}`}
    >
      <div className="footer-container">
        <h2>
          Мої <span>контакти</span>
        </h2>
        <p className="footer-text">
          {/* USER_CONTENT */}
          Якщо матимеш додаткові питання то зі мною можна зв'язатись через ці
          мережі, а також глянути на мої проекти в GitHub
          {/* USER_CONTENT */}
        </p>
        <SocialLinks />
        <p className="footer-copyright">
          {/* USER_CONTENT */}
          !!!Хочу в BEC 2026!!!
          {/* USER_CONTENT */}
        </p>
      </div>
    </section>
  );
}
