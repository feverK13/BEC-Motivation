import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SocialLinks } from '../components/SocialLinks';
import './Sections.css';

export function FooterSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      id="contacts"
      ref={ref}
      className={`section footer-section fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="footer-container">
        <h2>
          {/* USER_CONTENT */}
          Зв'яжись зі <span>мною</span>
          {/* USER_CONTENT */}
        </h2>
        <p className="footer-text">
          {/* USER_CONTENT */}
          Маєш питання? Хочеш познайомитися ближче? Ось мої соціальні мережі
          {/* USER_CONTENT */}
        </p>
        <SocialLinks />
        <p className="footer-copyright">
          {/* USER_CONTENT */}
          2025 Твоє Ім'я. Створено з для BEST.
          {/* USER_CONTENT */}
        </p>
      </div>
    </section>
  );
}
