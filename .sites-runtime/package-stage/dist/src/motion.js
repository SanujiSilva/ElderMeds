const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const precisePointer = matchMedia('(hover: hover) and (pointer: fine)');

// A lightweight, frame-scheduled highlight follows the pointer on desktop cards.
// Touch devices keep the same static appearance and native scrolling.
document.querySelectorAll('.research-component, .objective-grid article, .resource, .metric').forEach(card => {
  card.classList.add('interactive-surface');
  let frame = 0;
  let point;
  card.addEventListener('pointermove', event => {
    if (reducedMotion.matches || !precisePointer.matches || event.pointerType === 'touch') return;
    point = { x: event.clientX, y: event.clientY };
    if (frame) return;
    frame = requestAnimationFrame(() => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--pointer-x', `${point.x - bounds.left}px`);
      card.style.setProperty('--pointer-y', `${point.y - bounds.top}px`);
      card.classList.add('pointer-active');
      frame = 0;
    });
  });
  card.addEventListener('pointerleave', () => {
    cancelAnimationFrame(frame);
    frame = 0;
    card.classList.remove('pointer-active');
  });
});

const header = document.querySelector('.site-header');
let frame = 0;
function updateHeader() {
  header.classList.toggle('scrolled', scrollY > 28);
  frame = 0;
}
addEventListener('scroll', () => {
  if (!frame) frame = requestAnimationFrame(updateHeader);
}, { passive: true });
updateHeader();

// Keep visual emphasis tied to the currently explored section.
const milestones = document.querySelectorAll('.milestone-track article');
const milestoneObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.target.classList.toggle('in-view', entry.isIntersecting));
}, { rootMargin: '-15% 0px -20% 0px', threshold: 0.3 });
milestones.forEach(item => milestoneObserver.observe(item));

reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) document.querySelectorAll('.pointer-active').forEach(card => card.classList.remove('pointer-active'));
});
