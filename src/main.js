import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const canvas = document.getElementById('sequence-canvas')
const context = canvas.getContext('2d')

// Configuration
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
        context.clearRect(0, 0, canvas.width, canvas.height);
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
resizeCanvas(); 

// Load and start
preloadImages();

// GSAP ScrollTrigger Sequence
gsap.to(sequence, {
  frame: endFrame,
  snap: 'frame',
  ease: 'none',
  scrollTrigger: {
    trigger: '#scrolly-container',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1.5, // Even smoother scrub
    onUpdate: render 
  }
})

// Bubble Text Animation ("PINK")
gsap.to('.bubble-text', {
  opacity: 1,
  scale: 1,
  scrollTrigger: {
    trigger: '#scrolly-container',
    start: 'top 50%',
    end: 'top 30%',
    scrub: true
  }
})

// Hero Watermark Animation
gsap.to('.bg-watermark', {
  y: -100,
  opacity: 0.2,
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
})

// Snippet Logic
const animateSnippet = (id, start, end) => {
    gsap.to(id, {
        opacity: 1,
        y: -30,
        scrollTrigger: {
            trigger: '#scrolly-container',
            start: `${start}% top`,
            end: `${start + 10}% top`,
            scrub: true
        }
    });
    gsap.to(id, {
        opacity: 0,
        scrollTrigger: {
            trigger: '#scrolly-container',
            start: `${end}% top`,
            end: `${end + 5}% top`,
            scrub: true
        }
    });
}

animateSnippet('#snippet-1', 10, 25);
animateSnippet('#snippet-2', 40, 55);
animateSnippet('#snippet-3', 70, 85);

// Interactions
const clickMeBtn = document.getElementById('click-me');
const finalSection = document.getElementById('final');

clickMeBtn?.addEventListener('click', () => {
    finalSection?.scrollIntoView({ behavior: 'smooth' });
});

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
        noResponse.innerText = 'Κρίμα... Ίσως την επόμενη φορά.';
        noResponse.style.opacity = '1';
        setTimeout(() => { noResponse.style.opacity = '0'; }, 3000);
    }
});

closeModal?.addEventListener('click', () => {
  alertOverlay?.classList.remove('active');
});

images[0].onload = render;
