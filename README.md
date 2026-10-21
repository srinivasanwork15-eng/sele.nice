# Srinivasan — Personal Portfolio Website

A clean, modern, and accessible personal portfolio website built with semantic **HTML5**, responsive **CSS3**, and modular **Vanilla JavaScript**. Designed with an authentic human front-end developer aesthetic — featuring a refined dark obsidian theme, balanced typography, subtle micro-interactions, and zero external runtime dependencies.

---

## 🌟 Key Highlights & Design Choices

- **Distinct Visual Identity:** A dark obsidian palette (`#0b0f19`) paired with fresh mint/emerald accents (`#10b981`) and warm terminal highlights. No generic AI gradients or repetitive glassmorphism templates.
- **Natural Junior Developer Narrative:** Showcases authentic learning progression, core engineering foundations, and real projects rather than inflated skill percentages.
- **Mobile-First & Responsive:** Clean layout across smartphones, tablets, and wide desktop monitors using CSS Flexbox and Grid.
- **Accessibility (a11y) First:** Includes skip navigation link, WCAG AA compliant color contrast, explicit form labels, ARIA landmarks, and full keyboard operability.
- **100% Vanilla Tech Stack:** High performance, zero build steps, and instantaneous load times.

---

## 📁 Project Structure

```text
├── index.html        # Semantic HTML5 markup, landmarks, and content structure
├── style.css         # CSS custom properties, responsive layouts, micro-interactions
├── script.js         # Mobile drawer, scrollspy, interactive modal, contact validation
└── README.md         # Documentation, setup guide, and customization instructions
```

---

## 🚀 How to Open in VS Code & Run in Google Chrome

### Method A: Using VS Code "Live Server" (Recommended)

1. **Open VS Code:** Launch Visual Studio Code.
2. **Open the Project Folder:**
   - In VS Code, click **File** > **Open Folder...** (or press `Ctrl + K, Ctrl + O`).
   - Select the folder containing `index.html`, `style.css`, and `script.js`.
3. **Install the Live Server Extension (if not already installed):**
   - Click the **Extensions** icon on the left sidebar (or press `Ctrl + Shift + X`).
   - Search for **Live Server** (by *Ritwick Dey*) and click **Install**.
4. **Launch in Chrome:**
   - Right-click `index.html` in the VS Code file explorer.
   - Click **"Open with Live Server"** (or press `Alt + L, Alt + O`).
   - Your default browser (or Google Chrome) will automatically open `http://127.0.0.1:5500/index.html`.
   - Any changes you save in VS Code will immediately hot-reload in Chrome!

### Method B: Direct Browser Launch (No Extensions Needed)

1. Open your File Explorer and navigate to the project directory.
2. Right-click `index.html` and choose **Open with** > **Google Chrome**.
3. Alternatively, open Chrome and drag the `index.html` file directly into an open Chrome tab.

---

## 🎨 How to Personalize This Portfolio

All code has been written with clear comments and organized sections so you can customize it in minutes:

### 1. Update Your Name & Headline (`index.html`)
- Open `index.html`.
- Line 6: Update the `<title>` tag with your name:
  ```html
  <title>Your Name | Front-End Developer</title>
  ```
- Line 25: Edit the brand logo text:
  ```html
  <span class="logo-text">yourname<span class="logo-dot">.</span>dev</span>
  ```
- Lines 86–101: Update the **Hero Section** with your name, headline, and bio.

### 2. Update About Me & Skills (`index.html`)
- Under `<section id="about">` (Lines ~160–225): Replace the bio paragraphs with your personal background, learning path, and values.
- Under `<section id="skills">` (Lines ~230–330): Add or modify skills in the grid. You can adjust badges (`Core Foundation`, `Tools`, `Workflow`) and skill tags.

### 3. Update Projects & GitHub Links (`index.html` & `script.js`)
- In `index.html` under `<section id="projects">`:
  - Change project titles (`TaskPulse`, `DevShelf`, `WeatherFlow`).
  - Replace the project descriptions and technology badges.
  - Update the GitHub links: `<a href="https://github.com/your-username/your-repo">`.
- In `script.js` (around Line ~230): Update the `PROJECT_DATA` object to customize the **"Quick View"** modal content with your project architecture highlights.

### 4. Update Your Contact Info & Socials (`index.html`)
- Search for `srinivasan.dev@example.com` and replace it with your real email.
- In the direct reach and social blocks (Lines ~410–480), replace the placeholder URLs:
  - GitHub: `https://github.com/your-username`
  - LinkedIn: `https://linkedin.com/in/your-username`
  - Twitter / X: `https://twitter.com/your-handle`

### 5. Change Theme Colors (`style.css`)
At the top of `style.css` (lines 19–46), you will find the `:root` CSS variables. You can easily switch accent colors:
```css
:root {
  /* Change the primary accent from emerald to your favorite color */
  --accent-primary: #10b981;   /* Try #6366f1 (Indigo), #3b82f6 (Blue), or #f43f5e (Rose) */
  --accent-hover: #34d399;
  --accent-glow: rgba(16, 185, 129, 0.15);
}
```

---

## 💡 Front-End Best Practices Demonstrated in this Project

If you are presenting this project in a junior developer interview, here are the key engineering practices you can highlight:

1. **Semantic HTML5:** Using `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` rather than generic `<div>` soup.
2. **Defensive CSS Architecture:** Modular CSS with custom properties (`:root`), standard BEM-inspired naming conventions, and fluid spacing using `clamp()`.
3. **Graceful Degredation & Motion:** Respects `prefers-reduced-motion` to disable animations for users sensitive to motion sickness.
4. **Accessible Micro-Interactions:** Custom focus outlines (`:focus-visible`), keyboard navigable modals (`Escape` key, backdrop click), and accessible form errors (`aria-live="polite"`).
5. **Clean Vanilla JavaScript:** Zero external dependencies; uses modern APIs including `IntersectionObserver` for high-performance scrollspy, `navigator.clipboard` for copy actions, and native form validation.

---

## 📄 License
This project is open source and free to use for your personal portfolio under the [MIT License](https://opensource.org/licenses/MIT).

