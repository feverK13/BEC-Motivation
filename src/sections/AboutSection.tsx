import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Carousel } from '../components/Carousel';
import './Sections.css';

interface AboutSectionProps {
  photos: string[];
}

export function AboutSection({ photos }: AboutSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      id="about"
      ref={ref}
      className={`section about-section fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="about-container">
        <div className="about-content">
          <h2>
            {/* USER_CONTENT */}
            Привіт! Я <span>Твоє Ім'я</span>
            {/* USER_CONTENT */}
          </h2>
          <p>
            {/* USER_CONTENT */}
            Тут можеш розказати трохи про себе — хто ти, чим займаєшся,
            що тебе мотивує. Це місце для твого особистого вступу,
            щоб майбутні команди могли познайомитися з тобою ближче.
            {/* USER_CONTENT */}
          </p>
          <p>
            {/* USER_CONTENT */}
            Розкажи про свій досвід, захоплення або чому ти вирішив
            податися саме на цю роль. Не соромся бути собою!
            {/* USER_CONTENT */}
          </p>
        </div>
        <Carousel photos={photos} altPrefix="Photo" />
      </div>
    </section>
  );
}
