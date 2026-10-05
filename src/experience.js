const paths = {
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  pill: '<path d="m9 15 6-6M5 19a5.7 5.7 0 0 1 0-8l6-6a5.7 5.7 0 0 1 8 8l-6 6a5.7 5.7 0 0 1-8 0ZM8 8l8 8"/>',
  shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>',
  heart: '<path d="M20.8 5.6a5.5 5.5 0 0 0-8.8.5 5.5 5.5 0 0 0-8.8-.5C-1 11 12 20 12 20s13-9 8.8-14.4Z"/>',
  chart: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M7 16v-4m5 4V8m5 8v-6"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z"/><path d="M14 3v6h6M8 13h8m-8 4h5"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5v2"/>',
  graduation: '<path d="m2 9 10-5 10 5-10 5L2 9Zm4 2v6c4 3 8 3 12 0v-6m4-2v8"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  chat: '<path d="M21 11a8 8 0 0 1-8 8H7l-4 3V11a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z"/><path d="M7 11h10m-10 4h6"/>',
  camera: '<path d="M4 7h3l2-3h6l2 3h3a1 1 0 0 1 1 1v11H3V8a1 1 0 0 1 1-1Z"/><circle cx="12" cy="12" r="3"/>',
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.grid}</svg>`;
function renderIcons(root = document) { root.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); }); }
renderIcons();

const views = {
  intake: { icon: 'pill', title: 'Your morning, made simpler.', subtitle: 'A reminder that fits naturally into your day.', content: `<div class="routine-greeting"><span>YOUR DAILY ROUTINE</span><strong>Good morning, welcome back.</strong><p>Small steps towards a more supported day.</p></div><div class="routine-item"><span class="preview-icon">${icon('clock')}</span><div><strong>After breakfast</strong><small>Scheduled medication · Sample reminder</small></div><span class="status-badge">Upcoming</span></div><div class="verification-steps"><span>${icon('camera')} Present medicine</span><span>${icon('shield')} Check prescription</span><span>${icon('check')} Record intake</span></div>`, text: 'Routine-aware reminders and a guided verification workflow connect medicine identity, pill count, and intake evidence.' },
  safety: { icon: 'shield', title: 'More context. Better awareness.', subtitle: 'Medication screening built around the individual.', content: `<div class="safety-preview"><span class="large-icon">${icon('shield')}</span><strong>Every detail adds context.</strong><p>A personalized review connects medicines with the information that matters.</p></div><div class="context-chips"><span>Medication history</span><span>Recorded allergies</span><span>Chronic conditions</span><span>Age &amp; polypharmacy</span></div><div class="preview-note">Research decision support. Clinical decisions remain with qualified professionals.</div>`, text: 'Patient-specific rules and pharmacovigilance evidence help explain potential safety concerns and contributing factors.' },
  wellbeing: { icon: 'heart', title: 'A little time for yourself.', subtitle: 'Meaningful moments are part of everyday wellbeing.', content: `<div class="wellbeing-photo"><img src="public/images/eldermeds-hero.png" alt="An older adult spending a supportive moment with a caregiver" loading="lazy"/><span>Connection begins with a conversation.</span></div><div class="wellbeing-options"><span>${icon('chat')} Talk</span><span>${icon('grid')} Play</span><span>${icon('heart')} Remember</span></div>`, text: 'Supportive conversations, adaptive cognitive activities, and consent-based reminiscence encourage daily engagement.' },
  records: { icon: 'chart', title: 'Connected care, at a glance.', subtitle: 'A shared picture from everyday moments.', content: `<div class="record-summary"><span class="preview-icon">${icon('users')}</span><div><strong>Care overview</strong><small>Illustrative record categories</small></div></div><div class="record-tiles"><span>${icon('pill')}<strong>Medication</strong><small>Routines &amp; intake history</small></span><span>${icon('shield')}<strong>Safety</strong><small>Screening explanations</small></span><span>${icon('heart')}<strong>Wellbeing</strong><small>Engagement history</small></span><span>${icon('chat')}<strong>Conversation</strong><small>Grounded record access</small></span></div>`, text: 'Permitted records come together in one dashboard, helping older adults and caregivers understand what has happened.' },
};
const panel = document.querySelector('#experience-panel');
const tabs = [...document.querySelectorAll('[data-view]')];
function selectView(key) {
  const view = views[key];
  tabs.forEach(tab => { const selected = tab.dataset.view === key; tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1; });
  panel.setAttribute('aria-labelledby', `tab-${key}`);
  panel.innerHTML = `<div class="preview-top"><span>${icon(view.icon)} ELDERMEDS</span><span class="sample-label">Research preview</span></div><div class="preview-content"><h3>${view.title}</h3><p>${view.subtitle}</p>${view.content}</div><div class="preview-caption">${view.text}<a href="#components">Explore the research ${icon('arrow')}</a></div>`;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectView(tab.dataset.view));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); tabs[next].focus(); selectView(tabs[next].dataset.view); }
  });
});
selectView('intake');

const componentIcons = ['pill', 'shield', 'heart', 'chart'];
document.querySelectorAll('.research-component header').forEach((header, i) => header.insertAdjacentHTML('afterbegin', `<div class="component-symbol">${icon(componentIcons[i])}</div>`));
document.querySelectorAll('.resource').forEach(el => el.insertAdjacentHTML('afterbegin', `<div class="resource-symbol">${icon('file')}</div>`));
document.querySelectorAll('.comparison li').forEach((el, i) => el.insertAdjacentHTML('afterbegin', `<span class="journey-icon">${icon(['pill', 'grid', 'camera', 'check', 'shield', 'users', 'chat'][i])}</span>`));
const comparisonIcon = document.querySelector('.comparison-icon');
if (comparisonIcon) comparisonIcon.innerHTML = icon('heart');

const progress = document.createElement('div');
progress.className = 'reading-progress';
progress.setAttribute('aria-hidden', 'true');
document.body.append(progress);
let scheduled = false;
function updateProgress() { const available = document.documentElement.scrollHeight - innerHeight; progress.style.transform = `scaleX(${available > 0 ? Math.min(1, scrollY / available) : 0})`; scheduled = false; }
addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); } }, { passive: true });
addEventListener('resize', updateProgress);
updateProgress();
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('.nav-dropdown[open]').forEach(el => el.removeAttribute('open'));
  const navigation = document.querySelector('.nav-links');
  const toggle = document.querySelector('.nav-toggle');
  const wasOpen = navigation.classList.contains('open');
  navigation.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  if (wasOpen) toggle.focus();
});
