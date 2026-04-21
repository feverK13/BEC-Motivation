import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Sections.css';

export function SummarySection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      id="summary"
      ref={ref}
      className={`section summary-section fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="summary-container">
        <div className="summary-box">
          <h2>
            {/* USER_CONTENT */}
            Готовий до <span>нових викликів</span>
            {/* USER_CONTENT */}
          </h2>
          <p>
            {/* USER_CONTENT */}
            Це місце для твого заклику до дії. Розкажи, чому саме тебе
            варто взяти в команду, як ти плануєш розвиватися і що
            ти можеш дати організації.
            {/* USER_CONTENT */}
          </p>
        </div>
      </div>
    </section>
  );
}
