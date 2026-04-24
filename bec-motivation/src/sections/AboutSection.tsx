import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { Carousel } from "../components/Carousel";
import "./Sections.css";

interface AboutSectionProps {
  photos: string[];
}

export function AboutSection({ photos }: AboutSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.2,
  });

  return (
    <section
      id="about"
      ref={ref}
      className={`section about-section fade-in-section ${isVisible ? "visible" : ""}`}
    >
      <div className="about-container">
        <div className="about-content">
          <h2>
            {/* USER_CONTENT */}
            Привіт! Я <span>Ігор</span>
            {/* USER_CONTENT */}
          </h2>
          <p>
            {/* USER_CONTENT */}
            Маючи за честь потрапити в BEST Lviv саме цього весняного набору, я
            отримав шикарну нагоду — податися в BEC 2026.
            {/* USER_CONTENT */}
          </p>
          <p>
            {/* USER_CONTENT */}
            Щиро сподіваюсь, що зможу переконати тебе у відповідності моєї
            кандидатури, поки ти, шановний МО, будеш ознайомлюватись з цією
            мотивашкою. Вдалого перегляду!
            {/* USER_CONTENT */}
          </p>
        </div>
        <Carousel photos={photos} altPrefix="Photo" />
      </div>
    </section>
  );
}
