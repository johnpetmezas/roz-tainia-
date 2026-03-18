import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const canvas = document.getElementById('sequence-canvas')
const context = canvas.getContext('2d')

// Configuration
const frameCount = 100
const startFrame = 11
const endFrame = 100

// Generate frame URL
const currentFrame = index => `/frames/frame_${index.toString().padStart(3, '0')}_delay-0.041s.jpg`

const images = []
const sequence = {
  frame: startFrame
}

// Preload images
const preloadImages = () => {
  for (let i = startFrame; i <= endFrame; i++) {
    const img = new Image()
    img.src = currentFrame(i)
    images.push(img)
  }
}

// Render logic
const render = () => {
    const img = images[sequence.frame - startFrame];
    if (img && img.complete) {
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Handle aspect ratio (contain style)
        const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        
        context.drawImage(img, 
            0, 0, img.width, img.height, 
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }
}

// Handle Canvas Sizing
const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial call

// Load and start
preloadImages();

// GSAP ScrollTrigger
gsap.to(sequence, {
  frame: endFrame,
  snap: 'frame', // Snap to integer frame
  ease: 'none',
  scrollTrigger: {
    trigger: '#scrolly-container',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.5, // Smooth scrubbing
    onUpdate: render // Render on varje scroll update
  }
})

// Text Snippets Animations
gsap.to('#snippet-1', {
  opacity: 1,
  y: -50,
  scrollTrigger: {
    trigger: '#scrolly-container',
    start: '10% top',
    end: '30% top',
    scrub: true
  }
})

gsap.to('#snippet-1', {
    opacity: 0,
    scrollTrigger: {
      trigger: '#scrolly-container',
      start: '31% top',
      end: '40% top',
      scrub: true
    }
})

gsap.to('#snippet-2', {
    opacity: 1,
    y: -50,
    scrollTrigger: {
      trigger: '#scrolly-container',
      start: '60% top',
      end: '80% top',
      scrub: true
    }
})

gsap.to('#snippet-2', {
    opacity: 0,
    scrollTrigger: {
      trigger: '#scrolly-container',
      start: '81% top',
      end: '90% top',
      scrub: true
    }
})

// Smooth scroll to final section
const clickMeBtn = document.getElementById('click-me');
const finalSection = document.getElementById('final');

clickMeBtn?.addEventListener('click', () => {
    finalSection?.scrollIntoView({ behavior: 'smooth' });
});

// Final interactions
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
        noResponse.style.opacity = '1';
        noResponse.innerText = 'Κρίμα...';
        setTimeout(() => { noResponse.style.opacity = '0'; }, 3000);
    }
});

closeModal?.addEventListener('click', () => {
  alertOverlay?.classList.remove('active');
});

alertOverlay?.addEventListener('click', (e) => {
    if (e.target === alertOverlay) alertOverlay.classList.remove('active');
});

// Intro Hero Animation
gsap.from('.hero-title', {
  y: 60,
  opacity: 0,
  duration: 1.5,
  ease: 'power4.out',
  delay: 0.5
})

// Ensure initial frame is drawn
images[0].onload = render;
