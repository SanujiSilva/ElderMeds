# ElderMeds Research Website

**ElderMeds: A Multimodal Voice Vision Based Intelligent Assistant for Medication Adherence**

ElderMeds is a research project exploring intelligent medication support and wellbeing for older adults. This repository contains the project's public research website, presenting the research problem, objectives, methodology, four research components, evaluation results, milestones, documents, and team.

The website is a static HTML, CSS, and JavaScript application. The AI models, patient database, and clinical services described in the research are part of the wider ElderMeds platform and are not implemented in this repository.

## Project Details

| Detail | Information |
| --- | --- |
| Group ID | **R26-SE-028** |
| Institution | Sri Lanka Institute of Information Technology (SLIIT) |
| Department | Department of Software Engineering |
| Research period | 2025–2026 |
| Hosted website | [https://elder-meds.vercel.app/](https://elder-meds.vercel.app/) |
| Repository | [SanujiSilva/ElderMeds](https://github.com/SanujiSilva/ElderMeds) |

## Group Members

All four members are Software Engineering undergraduates at SLIIT.

| Name | Student ID | Indexed Name | Email | LinkedIn |
| --- | --- | --- | --- | --- |
| Dewmini Christine | IT22094254 | Christine K.D.D | [dewminichristine996@gmail.com](mailto:dewminichristine996@gmail.com) | [Profile](https://www.linkedin.com/in/dewmini-christine/) |
| Sanuji Silva | IT22082374 | Silva K.S.S.G | [sanujisandanima@gmail.com](mailto:sanujisandanima@gmail.com) | [Profile](https://www.linkedin.com/in/sanuji-silva-a15328250/) |
| Sandali Perera | IT22167200 | Perera L.K.S.T | [stharuka093@gmail.com](mailto:stharuka093@gmail.com) | [Profile](https://www.linkedin.com/in/sandalitharakaperera/) |
| Thyaga Alwis | IT22278708 | Alwis L.W.R.T | [thyagaalwis@gmail.com](mailto:thyagaalwis@gmail.com) | [Profile](https://www.linkedin.com/in/thyaga-alwis/) |

## Supervision

| Name | Role | Department / Affiliation |
| --- | --- | --- |
| Prof. Samantha Thelijjagoda | Supervisor | Department of Computer Systems Engineering, SLIIT |
| Ms. Hansi De Silva | Co-Supervisor | Department of Software Engineering, SLIIT |
| Mr. Jagath Kodagoda | External Supervisor | Director of Victoria Home for Incurables |
| Dr. Sunil H. Pathegama | External Supervisor | Primary Medical Care Unit, Weligama; University of Colombo |

## Research Components

1. **Intelligent Medication Reminder and Intake Verification:** Personalized reminders, pill identification, dose verification, intake-motion evidence, and stock monitoring.
2. **Personalized Medication Safety and Risk Assessment:** Patient-specific rules and machine learning to screen medication-safety concerns.
3. **Emotional and Cognitive Engagement Support:** Emotion-aware conversations, adaptive activities, and reminiscence support.
4. **Unified Conversational Dashboard:** Conversational access to health records, caregiver visibility, risk awareness, and user-confirmed actions.

## Website Features

- Responsive layout with mobile navigation and animated research previews.
- Research background, gaps, objectives, methodology, and architecture.
- Component descriptions and evaluation results.
- Interactive assessment and milestone selector.
- Links to project reports, presentations, checklists, and publication evidence.
- Embedded research paper PDF.
- Group member and supervisor profiles.
- Contact form integrated with Web3Forms.

## Technology Stack

| Technology | Purpose |
| --- | --- |
| HTML5 | Page structure and research content |
| CSS3 | Styling, responsive layouts, and animations |
| JavaScript | Navigation, interactive content, and form handling |
| Web3Forms | Contact form delivery |

The website uses plain JavaScript without a frontend framework. The server and build scripts use Node.js built-in modules; no npm dependencies are currently declared.

## Run Locally

### Prerequisites

- Git installed and available in your terminal.
- Node.js version 18 or later, as specified in `package.json`, with npm available.
- A modern web browser.

Check your tools:

```sh
git --version
node --version
npm --version
```

### 1. Clone the repository

```sh
git clone https://github.com/SanujiSilva/ElderMeds.git
cd ElderMeds
```

### 2. Start the local server

There are no package dependencies to install, so you can start the project immediately:

```sh
npm run dev
```

Open **[http://localhost:4173](http://localhost:4173)** in your browser. Keep the terminal running while using the website. Press `Ctrl+C` to stop the server.

Edit the source files and refresh the browser to view changes. The server does not provide automatic browser reload. Use the local server instead of opening `index.html` directly because the site uses JavaScript modules.

### 3. Build the website

```sh
npm run build
```

This recreates the `dist/` directory and copies the HTML, CSS, JavaScript, images, and documents into it. Make content changes in the source files because rebuilding replaces the contents of `dist/`.

### 4. Preview the build

Stop the development server first if it is using port 4173, then run:

```sh
npm run preview
```

Open **[http://localhost:4173](http://localhost:4173)** to view the generated website.

### Use a different port

For PowerShell:

```powershell
$env:PORT = "3000"
npm run dev
```

For macOS / Linux:

```sh
PORT=3000 npm run dev
```

Then open `http://localhost:3000`. The `PORT` environment variable also applies to `npm run preview`.

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Serve the source website locally |
| `npm run build` | Generate the static website in `dist/` |
| `npm run preview` | Serve the generated `dist/` directory locally |

## Project Structure

```text
ElderMeds/
├── index.html              # Main page and research content
├── styles.css              # Main website styles
├── script.js               # Team data, results, navigation, resources, and contact form
├── server.js               # Local static HTTP server
├── package.json            # Project metadata and npm scripts
├── vercel.json             # Vercel build and routing configuration
├── src/
│   ├── brand.css           # Brand styling
│   ├── experience.css      # Research preview styles
│   ├── experience.js       # Interactive research previews
│   ├── motion.css          # Animation styles
│   ├── motion.js           # Animation behavior
│   ├── research-gap.css    # Research gap section styles
│   ├── research-gap.js     # Research gap section behavior
│   └── data/
│       └── links.js        # Research resource links and contact configuration
├── public/
│   ├── images/             # Branding, evidence, and team images
│   └── documents/          # Research paper and supporting documents
├── scripts/
│   ├── build.js            # Static build script
│   └── check-responsive.cjs # Responsive checking utility
└── dist/                   # Generated website output
```

## Updating Content

- **Research content and milestones:** Edit `index.html`.
- **Members, supervisors, and results:** Edit the data arrays in `script.js`.
- **Document and presentation links:** Edit `src/data/links.js`.
- **Photos and documents:** Add or replace files in `public/images/` and `public/documents/` and update their references.
- **Appearance:** Edit `styles.css` and the relevant CSS files in `src/`.
- **Contact form:** The `web3FormsAccessKey` setting in `src/data/links.js` controls Web3Forms delivery. A separate deployment should use its own Web3Forms configuration.

No database, `.env` file, or AI service is required to run this research website. External documents and contact form delivery require internet access.

## Hosting

The hosted website is available at **[https://elder-meds.vercel.app/](https://elder-meds.vercel.app/)**.

The repository includes `vercel.json`, which configures a static build from `package.json`, serves the generated `dist/` directory, and falls back to `index.html` for unmatched routes. The local build command is `npm run build`.

## Troubleshooting

- **`node` or `npm` is not recognized:** Install Node.js with npm and reopen the terminal.
- **PowerShell blocks `npm.ps1`:** Use `npm.cmd run dev`, `npm.cmd run build`, or `npm.cmd run preview`.
- **Port already in use:** Stop the existing server or set a different `PORT` as shown above.
- **Build preview is missing or outdated:** Run `npm run build` before `npm run preview`.
- **Contact form fails:** Check your internet connection and the Web3Forms configuration in `src/data/links.js`.
