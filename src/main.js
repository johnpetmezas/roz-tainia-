import './style.css'

const tape = document.getElementById('the-tape');
const scrollPath = document.getElementById('scroll-path');
const clickMe = document.getElementById('click-me');
const finalSection = document.getElementById('final');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const noResponse = document.getElementById('no-response');
const alertOverlay = document.getElementById('alert-overlay');
const closeModal = document.getElementById('close-modal');

// Scroll Logic for Tape growth
window.addEventListener('scroll', () => {
    if (!scrollPath || !tape) return;
    
    const start = scrollPath.offsetTop;
    const end = scrollPath.offsetTop + scrollPath.offsetHeight - window.innerHeight;
    const current = window.pageYOffset;
    
    if (current >= start && current <= end) {
        const percentage = ((current - start) / (end - start)) * 100;
        tape.style.height = percentage + '%';
    } else if (current < start) {
        tape.style.height = '0%';
    } else {
        tape.style.height = '100%';
    }
});

// Click Me Logic
clickMe?.addEventListener('click', () => {
    finalSection?.scrollIntoView({ behavior: 'smooth' });
});

// Interactive Logic
yesBtn?.addEventListener('click', () => {
    alertOverlay?.classList.add('active');
});

noBtn?.addEventListener('click', () => {
    if (noResponse) {
        noResponse.style.opacity = '1';
        setTimeout(() => { noResponse.style.opacity = '0'; }, 2500);
    }
});

closeModal?.addEventListener('click', () => {
    alertOverlay?.classList.remove('active');
});

alertOverlay?.addEventListener('click', (e) => {
    if (e.target === alertOverlay) alertOverlay.classList.remove('active');
});
