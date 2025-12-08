import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation() {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Animate elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    animatedElements.forEach((el) => {
      const animationType = el.getAttribute('data-animate');
      const delay = parseFloat(el.getAttribute('data-delay') || '0');
      
      gsap.set(el, { 
        opacity: 0, 
        y: animationType === 'fade-up' ? 50 : 0,
        scale: animationType === 'scale' ? 0.95 : 1,
      });

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay,
            ease: 'power3.out',
          });
        },
      });
    });

    // Staggered animations for lists
    const staggerContainers = document.querySelectorAll('[data-stagger]');
    
    staggerContainers.forEach((container) => {
      const children = container.children;
      
      gsap.set(children, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: container,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(children, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
}

export function animateOnScroll(element: HTMLElement, animation: gsap.TweenVars) {
  ScrollTrigger.create({
    trigger: element,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(element, {
        ...animation,
        ease: 'power3.out',
      });
    },
  });
}
