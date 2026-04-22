import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "./Sections.css";

export function SummarySection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.2,
  });

  return (
    <section
      id="summary"
      ref={ref}
      className={`section summary-section fade-in-section ${isVisible ? "visible" : ""}`}
    >
      <div className="summary-container">
        <div className="summary-box">
          <h2>
            Готовий до <span>BEC</span>
          </h2>
          <p>
            Я мав нагоду побачити закриття нещодавнього івенту, і море радості
            що я бачив в очах людей важко передати словами — хочу також це
            пережити, хочу це пережити після незабутніх 5 місяців підготовки та
            5 днів івенту. Хочу нирнути у кортіму і кайфанути від часу в ній,
            зблизитись із цими людьми та зокрема з тобою.
          </p>
        </div>
      </div>
    </section>
  );
}
