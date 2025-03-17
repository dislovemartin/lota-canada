/**
 * Immersive Effects - Enhances the dark theme with subtle animations and effects
 * Inspired by Immersive Garden (https://immersive-g.com/)
 */

// Wait for page to be fully loaded before initializing effects
window.addEventListener('load', () => {
  // Delay initialization to prioritize critical content rendering
  setTimeout(() => {
    // Initialize effects only if the browser is not reporting reduced motion preference
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      initParallaxEffect();
      initScrollReveal();

      // Further delay less critical effects
      setTimeout(() => {
        initCustomCursor();
        initMagneticElements();
      }, 1000);
    }
  }, 300);
});

/**
 * Throttle function to limit how often a function can be called
 */
function throttle(callback, delay = 100) {
  let isThrottled = false;

  return function(...args) {
    if (isThrottled) return;

    isThrottled = true;
    callback.apply(this, args);

    setTimeout(() => {
      isThrottled = false;
    }, delay);
  };
}

/**
 * Initialize parallax effect on elements with .parallax-layer class
 */
function initParallaxEffect() {
  const parallaxLayers = document.querySelectorAll('.parallax-layer');

  if (parallaxLayers.length === 0) return;

  // Use throttled event handler to improve performance
  window.addEventListener('mousemove', throttle((e) => {
    // Use requestAnimationFrame for smooth animation
    requestAnimationFrame(() => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      parallaxLayers.forEach(layer => {
        const speed = layer.getAttribute('data-speed') || 0.05;
        const x = (mouseX - 0.5) * speed * 100;
        const y = (mouseY - 0.5) * speed * 100;

        layer.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }, 16)); // ~60fps
}

/**
 * Initialize scroll reveal animations
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .stagger-reveal > *, .text-reveal span');

  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.parentElement && entry.target.parentElement.classList.contains('text-reveal')) {
          entry.target.parentElement.classList.add('revealed');
        } else {
          entry.target.classList.add('revealed');
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  revealElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Initialize custom cursor effect
 */
function initCustomCursor() {
  const cursorAreas = document.querySelectorAll('.custom-cursor-area');

  if (cursorAreas.length === 0) return;

  // Create custom cursor element
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  // Update cursor position on mouse move
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  // Add hover effect when hovering over interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .interactive');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });

    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });

  // Show/hide cursor based on cursor area
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
}

/**
 * Initialize magnetic effect on elements with .magnetic class
 */
function initMagneticElements() {
  const magneticElements = document.querySelectorAll('.magnetic');

  if (magneticElements.length === 0) return;

  magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      const strength = 15; // Adjust the magnetic strength
      const moveX = distanceX / strength;
      const moveY = distanceY / strength;

      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translate(0, 0)';
    });
  });
}

/**
 * Helper function to wrap text in span elements for text reveal animation
 * Usage: wrapTextForReveal('.my-heading');
 */
function wrapTextForReveal(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach(element => {
    const text = element.textContent;
    element.innerHTML = '';
    element.classList.add('text-reveal');

    const span = document.createElement('span');
    span.textContent = text;
    element.appendChild(span);
  });
}

/**
 * Helper function to prepare text distortion effect
 * Usage: prepareTextDistortion('.my-text');
 */
function prepareTextDistortion(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach(element => {
    const text = element.textContent;
    element.classList.add('text-distort');
    element.setAttribute('data-text', text);
  });
}
