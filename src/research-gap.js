// Concept previews explain the gap; they do not represent live patient records.
const concepts = [
  {
    type: 'reminder',
    preview: '<div class="gap-screen-label">DAILY ROUTINE <span>Sample</span></div><div class="gap-time">08:00 <small>AM</small></div><div class="gap-notification"><span class="gap-notification-dot"></span><div><b>Your morning reminder</b><small>After breakfast · Scheduled routine</small></div></div>',
    description: 'A timely nudge to begin the medication routine.',
    gap: 'A reminder alone cannot verify intake.',
  },
  {
    type: 'recognition',
    preview: '<div class="gap-screen-label">VISUAL MEDICINE CHECK</div><div class="gap-camera" aria-hidden="true"><i class="gap-tablet"></i><i class="gap-capsule"></i><span class="gap-scan-line"></span><span class="gap-viewfinder"></span></div><div class="gap-camera-caption">Present medicine for comparison</div>',
    description: 'Visual evidence helps check what is presented.',
    gap: 'Recognition needs prescription context.',
  },
  {
    type: 'safety',
    preview: '<div class="gap-screen-label">PERSONAL CONTEXT</div><div class="gap-check-row"><span>Medication list</span><b>01</b></div><div class="gap-check-row"><span>Recorded allergies</span><b>02</b></div><div class="gap-check-row"><span>Health conditions</span><b>03</b></div><div class="gap-review">Bring the details together</div>',
    description: 'Screening considers the person behind the prescription.',
    gap: 'Isolated checks miss the wider history.',
  },
  {
    type: 'support',
    preview: '<div class="gap-support-photo" role="img" aria-label="An older adult with a supportive caregiver"></div><div class="gap-support-prompt"><b>A moment to connect</b><span>Talk · Play · Remember</span></div>',
    description: 'Conversation and activities support daily engagement.',
    gap: 'Wellbeing can sit apart from care records.',
  },
  {
    type: 'risk',
    preview: '<div class="gap-screen-label">RISK AWARENESS</div><div class="gap-risk-domains"><span>Diabetes</span><span>Stroke</span><span>Hypertension</span></div><div class="gap-risk-note"><span>i</span><p>Understand the context.<br><b>Awareness, not a diagnosis.</b></p></div>',
    description: 'Recorded health context informs non-diagnostic awareness.',
    gap: 'A prediction needs an understandable explanation.',
  },
  {
    type: 'caregiver',
    preview: '<div class="gap-screen-label">CAREGIVER OVERVIEW</div><div class="gap-feed"><span class="gap-feed-marker"></span><div><b>Medication routine</b><small>Intake history &amp; reminders</small></div></div><div class="gap-feed"><span class="gap-feed-marker blue"></span><div><b>Wellbeing moments</b><small>Conversation &amp; engagement</small></div></div><div class="gap-permission">Access to permitted records</div>',
    description: 'Caregivers need one clear view of everyday events.',
    gap: 'Separate apps leave an incomplete picture.',
  },
  {
    type: 'conversation',
    preview: '<div class="gap-screen-label">CONVERSATIONAL ACCESS</div><div class="gap-chat-question">Where can I see my intake history?</div><div class="gap-chat-answer">Let’s look at your recorded medication events.</div><span class="gap-source">Grounded in permitted records</span>',
    description: 'Natural-language questions make records easier to navigate.',
    gap: 'Useful answers depend on connected records.',
  },
];

document.querySelectorAll('.gap-grid article').forEach((card, index) => {
  const concept = concepts[index];
  if (!concept) return;
  card.classList.add('gap-concept', `gap-${concept.type}`);
  const heading = document.createElement('header');
  const title = document.createElement('h3');
  title.className = 'gap-title';
  title.textContent = card.querySelector('.gap-title').textContent;
  card.querySelector('.gap-title').remove();
  heading.append(card.querySelector('.gap-icon'), title);
  card.append(heading);
  card.insertAdjacentHTML('beforeend', `<div class="gap-preview">${concept.preview}</div><p class="gap-description">${concept.description}</p><div class="gap-limitation"><span>THE MISSING LINK</span><p>${concept.gap}</p></div>`);
});

document.querySelector('.gap-grid').insertAdjacentHTML('afterend', `<div class="gap-connection"><span class="gap-connection-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m8 12 3 3 5-6"/><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/></svg></span><div><span>THE ELDERMEDS RESEARCH DIRECTION</span><h3>Separate moments. One connected care story.</h3><p>Shared patient and medication context brings these seven needs into four coordinated research components.</p></div><a href="#components">Explore the components <span aria-hidden="true">→</span></a></div>`);
