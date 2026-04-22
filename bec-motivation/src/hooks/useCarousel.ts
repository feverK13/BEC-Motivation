import { useState, useEffect, useCallback } from 'react';

export function useCarousel({
  totalSlides,
  autoPlayInterval = 8000,
}: {
  totalSlides: number;
  autoPlayInterval?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (100 / (autoPlayInterval / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, autoPlayInterval, nextSlide]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  return { currentIndex, progress, goToSlide, nextSlide, prevSlide, pause, resume };
}
