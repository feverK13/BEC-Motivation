import { useState, useEffect, useCallback, useRef } from 'react';

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
  const progressRef = useRef(progress);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const step = 100 / (autoPlayInterval / 100);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

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

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const nextProgress = progressRef.current + step;

      if (nextProgress >= 100) {
        nextSlide();
      } else {
        setProgress(nextProgress);
      }
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, nextSlide, step]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  return { currentIndex, progress, goToSlide, nextSlide, prevSlide, pause, resume };
}
