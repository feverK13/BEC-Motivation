import { useCarousel } from '../hooks/useCarousel';
import './Carousel.css';
export function Carousel({ photos, altPrefix = 'Photo' }: { photos: string[]; altPrefix?: string }) {
  const { currentIndex, progress, goToSlide, nextSlide, prevSlide, pause, resume } = useCarousel({ totalSlides: photos.length, autoPlayInterval: 8000 });
  return (
    <div className="carousel" onMouseEnter={pause} onMouseLeave={resume}>
      <div className="carousel-arrows">
        <button className="carousel-arrow" onClick={prevSlide} aria-label="Previous photo">◀</button>
        <button className="carousel-arrow" onClick={nextSlide} aria-label="Next photo">▶</button>
      </div>
      <div className="carousel-images">
        {photos.map((photo, index) => (
          <img key={index} src={photo} alt={`${altPrefix} ${index + 1}`} className={`carousel-image ${index === currentIndex ? 'active' : ''}`} />
        ))}
      </div>
      <div className="carousel-dots">
        {photos.map((_, index) => (
          <button key={index} className={`carousel-dot ${index === currentIndex ? 'active' : ''}`} onClick={() => goToSlide(index)} aria-label={`Go to photo ${index + 1}`} />
        ))}
      </div>
      <div className="carousel-timer" style={{ width: `${progress}%` }} />
    </div>
  );
}
