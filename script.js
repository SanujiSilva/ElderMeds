import { researchLinks } from "./src/data/links.js";

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const isPageReload = performance.getEntriesByType("navigation")[0]?.type === "reload";

if (isPageReload && location.hash) {
  history.replaceState(history.state, "", location.pathname + location.search);
}

window.addEventListener("pageshow", () => {
  if (isPageReload) {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return;
  }
  const target = document.getElementById(location.hash.slice(1));
  if (target) target.scrollIntoView();
  else window.scrollTo(0, 0);
});

const results = [
  {
    title: "Component 1 – Intelligent Medication Reminder & Intake Verification",
    metrics: [["Model", "YOLO11n"], ["Accuracy", "96.74%"], ["Precision", "98.87%"], ["Recall", "97.21%"], ["F1-score", "98.03%"], ["Exact-count accuracy", "90.93%"], ["Test images", "860"]],
    note: "High pill-detection performance, with medication counting and verification supported by visual evidence."
  },
  {
    title: "Component 2 – Personalized Medication Safety & Risk Assessment",
    metrics: [["ML model", "Tuned Logistic Regression"], ["ML accuracy", "86.88%"], ["ML recall", "98.17%"], ["ML F1-score", "91.80%"], ["Hybrid controller accuracy", "81.55%"], ["Dangerous-class precision", "82.20%"], ["Dangerous-class recall", "97.50%"], ["Dangerous-class false-negative rate", "2.50%"]],
    note: "The hybrid rule–ML controller achieved high sensitivity to Dangerous cases in proxy-labelled evaluation. Clinical validation is still required."
  },
  {
    title: "Component 3 – Emotional & Cognitive Engagement Support",
    metrics: [["Model", "MiniLM emotion classifier"], ["Accuracy", "81.43%"], ["Macro precision", "82.78%"], ["Macro recall", "81.43%"], ["Macro F1-score", "81.66%"], ["Macro specificity", "96.90%"], ["Test responses", "140"], ["Emotion categories", "7"]],
    note: "Effective classification of seven emotional states to support adaptive conversations and personalized engagement activities."
  }
];

const team = [
  { name: "Dewmini Christine", initials: "DC", role: "Undergraduate", studentId: "IT22094254", indexedName: "Christine K.D.D", department: "Department of Software Engineering", email: "dewminichristine996@gmail.com", linkedin: "https://www.linkedin.com/in/dewmini-christine/", photo: "public/images/team/dewmini-christine.png" },
  { name: "Sanuji Silva", initials: "SS", role: "Undergraduate", studentId: "IT22082374", indexedName: "Silva K.S.S.G", department: "Department of Software Engineering", email: "sanujisandanima@gmail.com", linkedin: "https://www.linkedin.com/in/sanuji-silva-a15328250/", photo: "public/images/team/sanuji-silva.png" },
  { name: "Sandali Perera", initials: "SP", role: "Undergraduate", studentId: "IT22167200", indexedName: "Perera L.K.S.T", department: "Department of Software Engineering", email: "stharuka093@gmail.com", linkedin: "https://www.linkedin.com/in/sandalitharakaperera/", photo: "public/images/team/sandali-perera.png" },
  { name: "Thyaga Alwis", initials: "TA", role: "Undergraduate", studentId: "IT22278708", indexedName: "Alwis L.W.R.T", department: "Department of Software Engineering", email: "thyagaalwis@gmail.com", linkedin: "https://www.linkedin.com/in/thyaga-alwis/", photo: "public/images/team/thyaga-alwis.png" }
];

const supervisors = [
  { name: "Prof. Samantha Thelijjagoda", initials: "ST", role: "Supervisor", department: "Department of Computer Systems Engineering", email: "samantha.t@sliit.lk", linkedin: "https://www.linkedin.com/in/samantha-thelijjagoda-84342037/", photo: "public/images/team/samantha-thelijjagoda.png" },
  { name: "Ms. Hansi De Silva", initials: "HD", role: "Co-Supervisor", department: "Department of Software Engineering", email: "hansi.d@sliit.lk", linkedin: "https://www.linkedin.com/in/hansi-de-silva-03629b79/", photo: "public/images/team/hansi-de-silva.png" },
  { name: "Mr. Jagath Kodagoda", initials: "JK", role: "External Supervisor", department: "Director of Victoria Home for Incurables", photo: "public/images/team/jagath-kodagoda.png" },
  { name: "Dr. Sunil H. Pathegama", initials: "SP", role: "External Supervisor", department: "Primary Medical Care Unit, Weligama", institution: "University of Colombo", location: "Matara", photo: "public/images/team/sunil-pathegama.png" }
];

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navDropdowns = [...navLinks.querySelectorAll(".nav-dropdown")];
const navItems = [...document.querySelectorAll(".nav-links a[href^='#']")];

function setActiveNavigation(sectionId) {
  navItems.forEach((link) => {
    const active = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  const scopeSections = new Set(["about", "gap", "research-problem-solution", "objectives", "methodology", "technology", "components", "results"]);
  navDropdowns[0]?.classList.toggle("active", scopeSections.has(sectionId));
  navDropdowns[1]?.classList.toggle("active", ["about-us", "supervision", "team"].includes(sectionId));
}

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
navLinks.addEventListener("click", (event) => {
  const link = event.target.closest("a[href^='#']");
  if (!link) return;
  const target = document.querySelector(link.getAttribute("href"));
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  history.pushState(null, "", link.getAttribute("href"));
  setActiveNavigation(target.id);
  navLinks.classList.remove("open");
  navDropdowns.forEach((dropdown) => dropdown.removeAttribute("open"));
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
});
navDropdowns.forEach((dropdown) => {
  dropdown.addEventListener("toggle", () => {
    if (dropdown.open) navDropdowns.filter((item) => item !== dropdown).forEach((item) => item.removeAttribute("open"));
  });
});
document.addEventListener("click", (event) => {
  if (!navLinks.contains(event.target)) navDropdowns.forEach((dropdown) => dropdown.removeAttribute("open"));
  if (!navLinks.contains(event.target) && !navToggle.contains(event.target)) {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  }
});

document.querySelector("#resultsGrid").innerHTML = results.map(({ title, metrics, note }) => `<article class="metric evaluation-card"><h3>${title}</h3><table><thead><tr><th scope="col">Evaluation metric</th><th scope="col">Result</th></tr></thead><tbody>${metrics.map(([label, value]) => `<tr><th scope="row">${label}</th><td>${value}</td></tr>`).join("")}</tbody></table><p><b>Key result:</b> ${note}</p></article>`).join("");
function memberCard(member) {
  const role = member.role ? `<span class="role-badge">${member.role}</span>` : "";
  const studentMeta = member.studentId ? `<p class="student-meta"><strong>${member.studentId}</strong><span>${member.indexedName}</span></p>` : "";
  const linkedin = member.linkedin
    ? `<a href="${member.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>`
    : `<span aria-disabled="true">LinkedIn</span>`;
  const email = member.email
    ? `<a href="mailto:${member.email}">Email</a>`
    : `<span aria-disabled="true">Email</span>`;
  const contactLinks = member.studentId || member.linkedin || member.email
    ? `<div class="member-links">${linkedin}${email}</div>`
    : "";
  return `
  <article class="member">
    <div class="photo-wrap${member.photo ? "" : " missing-photo"}">
      ${member.photo ? `<img src="${member.photo}" alt="${member.name}" loading="lazy" onerror="this.remove(); this.parentElement.classList.add('missing-photo');" />` : ""}
      <span class="avatar" aria-hidden="true">${member.initials}</span>
    </div>
    <div class="member-body">
      ${role}
      <h3>${member.name}</h3>
      ${studentMeta}
      <p>${member.department}<br>${member.institution || "Sri Lanka Institute of Information Technology"}${member.location ? `<br>${member.location}` : ""}</p>
      ${contactLinks}
    </div>
  </article>
`;
}

document.querySelector("#teamGrid").innerHTML = team.map(memberCard).join("");
document.querySelector("#supervisorGrid").innerHTML = supervisors.map(memberCard).join("");

function linkButton(url, label) {
  if (!url) return `<span class="button secondary disabled" aria-disabled="true">Link Coming Soon</span>`;
  return `<a class="button primary" href="${url}" target="_blank" rel="noopener noreferrer">${label} &#8599;</a>`;
}

const projectDocuments = [
  ["TAF", "Topic Assessment Form", "Research topic, initial scope, problem context, and proposed direction.", researchLinks.tafDriveUrl],
  ["Proposal", "Proposal Report", "Research gap, objectives, methodology, architecture, and four component proposals.", researchLinks.proposalDriveUrl],
  ["Final", "Final Report", "Complete implementation, evaluation results, limitations, and future research directions.", researchLinks.finalReportDriveUrl],
  ["Paper", "Research Paper", "The consolidated ElderMeds paper accepted for ICSCDS 2026 presentation and publication.", researchLinks.researchPaperDriveUrl || researchLinks.researchPaperUrl],
  ["Check Lists", "Check Lists", "Supporting research check lists for project requirements, deliverables, and review.", researchLinks.checklistsDriveUrl]
];

document.querySelector("#resourceGrid").innerHTML = projectDocuments.map(([type, title, description, url]) => `
  <article class="resource"><p class="eyebrow">${type}</p><h3>${title}</h3><p>${description}</p>${linkButton(url, `Open ${type}`)}</article>
`).join("");

document.querySelector("#presentationAction").innerHTML = linkButton(researchLinks.presentationsDriveUrl, "View Presentation Files");

const paperUrl = researchLinks.researchPaperUrl;
document.querySelector("#paperActions").innerHTML = `
  ${linkButton(paperUrl, "Open Paper")}
  ${linkButton(paperUrl, "Download Paper")}
`;
document.querySelector("#paperViewer").innerHTML = paperUrl
  ? `<iframe title="ElderMeds research paper PDF" src="${paperUrl}"></iframe>`
  : `<div class="paper-placeholder"><strong>Research paper coming soon</strong><p>Add the PDF URL in <code>src/data/links.js</code>.</p></div>`;

document.documentElement.classList.add("motion-ready");
// Reveal individual cards rather than waiting for a tall mobile grid to enter view.
document.querySelectorAll('.gap-grid.reveal, .cards.reveal, .results-grid.reveal, .architecture.reveal, .resource-grid.reveal, .milestone-track.reveal, .objective-grid.reveal, .team-block.reveal').forEach(group => {
  group.classList.remove('reveal');
  const children = group.matches('.team-block') ? group.querySelectorAll('.member') : group.children;
  [...children].forEach((child, index) => {
    child.classList.add('reveal');
    child.style.setProperty('--reveal-delay', `${(index % 4) * 65}ms`);
  });
});
const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) if (entry.isIntersecting) {
    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  }
}, { threshold: 0.04 });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];
const activeObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  setActiveNavigation(visible.target.id);
}, { rootMargin: "-30% 0px -60% 0px", threshold: [0.1, 0.5, 0.9] });
sections.forEach((section) => activeObserver.observe(section));

const contactForm = document.querySelector("#contactForm");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const submitButton = contactForm.querySelector("button[type='submit']");
  const status = document.querySelector("#formStatus");
  const formData = Object.fromEntries(new FormData(contactForm).entries());

  if (!researchLinks.web3FormsAccessKey) {
    sessionStorage.setItem("eldermedsContactInquiry", JSON.stringify(formData));
    status.textContent = "Contact delivery is not configured yet. Add your Web3Forms access key in src/data/links.js.";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  status.textContent = "Sending your inquiry...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      access_key: researchLinks.web3FormsAccessKey,
      subject: `ElderMeds contact: ${formData.subject}`,
      from_name: formData.name,
      email: formData.email,
      message: formData.message
    })
  })
    .then((response) => response.json())
    .then((result) => {
      if (!result.success) throw new Error(result.message || "Unable to send inquiry.");
      status.textContent = "Thank you. Your inquiry has been sent to the ElderMeds team.";
      contactForm.reset();
    })
    .catch(() => {
      sessionStorage.setItem("eldermedsContactInquiry", JSON.stringify(formData));
      status.textContent = "Sorry, the inquiry could not be sent right now. Please try again later.";
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Send Inquiry";
    });
});

const topButton = document.querySelector(".to-top");
window.addEventListener("scroll", () => topButton.classList.toggle("visible", window.scrollY > 600), { passive: true });
topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }));
