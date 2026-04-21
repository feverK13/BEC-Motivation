import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { RoleTabs } from '../components/RoleTabs';
import './Sections.css';

export function RoleSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  const logisticianContent = {
    why:
      '{/* USER_CONTENT */}',
    bring:
      '{/* USER_CONTENT */}',
    get:
      '{/* USER_CONTENT */}',
  };

  const itSpecialistContent = {
    why:
      '{/* USER_CONTENT */}',
    bring:
      '{/* USER_CONTENT */}',
    get:
      '{/* USER_CONTENT */}',
  };

  return (
    <section
      id="role"
      ref={ref}
      className={`section role-section fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="role-container">
        <h2>
          {/* USER_CONTENT */}
          Я хочу бути <span>частиною команди</span>
          {/* USER_CONTENT */}
        </h2>
        <p className="role-intro">
          {/* USER_CONTENT */}
          Обери роль, на яку я подаюся, і дізнайся більше про мою мотивацію
          {/* USER_CONTENT */}
        </p>
        <RoleTabs
          logistician={logisticianContent}
          itSpecialist={itSpecialistContent}
        />
      </div>
    </section>
  );
}
