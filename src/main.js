import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 1. Scrollytelling Sequence Animations
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#scrolly-container',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1, // Smooth scrub
    pin: true, // Internal pinning handled by container styling? 
    // Actually, Scrub 1 + Pin = high end feel.
  }
})

// Rotate the roll image + Unroll the strip
tl.to('#roll-img', {
  rotateZ: 720, // Spin twice
  scale: 1.1,
  duration: 1
})

// Animate the pink strip extending
tl.fromTo('#the-strip', 
  { height: 0 }, 
  { height: '100vh', duration: 1 }, 
  0 // Start at same time as rotation
)

// Dynamic Background Snippets
tl.to('#snippet-1', { opacity: 1, y: -20, duration: 0.2 }, 0.2)
tl.to('#snippet-1', { opacity: 0, y: -40, duration: 0.2 }, 0.4)
tl.to('#snippet-2', { opacity: 1, y: -20, duration: 0.2 }, 0.6)
tl.to('#snippet-2', { opacity: 0, y: -40, duration: 0.2 }, 0.8)

// 2. Click Me: Smooth scroll to final section
const clickMeBtn = document.getElementById('click-me');
const finalSection = document.getElementById('final');

clickMeBtn?.addEventListener('click', () => {
    finalSection?.scrollIntoView({ behavior: 'smooth' });
});

// 3. Final Interactions
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const noResponse = document.getElementById('no-response');
const alertOverlay = document.getElementById('alert-overlay');
const closeModal = document.getElementById('close-modal');

yesBtn?.addEventListener('click', () => {
  alertOverlay?.classList.add('active');
});

noBtn?.addEventListener('click', () => {
    if (noResponse) {
        noResponse.innerText = 'Κρίμα...';
        noResponse.style.opacity = '1';
        setTimeout(() => { noResponse.style.opacity = '0'; }, 3000);
    }
});

closeModal?.addEventListener('click', () => {
  alertOverlay?.classList.remove('active');
});

// Proactive check: If user clicks overlay background
alertOverlay?.addEventListener('click', (e) => {
  if (e.target === alertOverlay) alertOverlay.classList.remove('active');
});

// 4. Entry Hero Animation
gsap.from('.hero-title', {
  y: 60,
  opacity: 0,
  duration: 1.5,
  ease: 'power4.out',
  delay: 0.5
})
