import React from 'react';

// Performance optimization utilities

// Lazy load components
export const lazyLoad = (importFunc: () => Promise<any>) => {
  return React.lazy(importFunc);
};

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
};

// Preload critical resources
export const preloadResource = (href: string, as: string = 'fetch') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
};

// Optimize images
export const optimizeImage = (src: string, width: number, quality: number = 80) => {
  // Add image optimization parameters
  return `${src}?w=${width}&q=${quality}&auto=format`;
};

// Memory management
export const cleanupEventListeners = (element: Element, event: string, handler: EventListener) => {
  element.removeEventListener(event, handler);
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
}; 