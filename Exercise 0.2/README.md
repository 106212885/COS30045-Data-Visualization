# COS30045 – Data Visualisation  
## Exercise 0.2 – Energy Website

## Generative AI Reflection

### Which Tool(s) Used
* Google Gemini

### What GenAI Was Used For
* Guiding and generate semantic HTML5 templates for three pages site navigation (`index.html`, `televisions.html`, `about.html`).
* Created HTML page templates and CSS styling matched to the logo palette.
* Structuring in JavaScript (`main.js`) for the interactive FAQ accordion.
* Troubleshooting Git deployment and commit issues in GitHub Desktop.

### What Was Changed or Adapted After Generation
* Replaced generic `<div>` containers with semantic HTML elements (`<main>`, `<section>`, `<article>`, `<button>`) that we learned in sem 1 COS10026 Web Technology Project.
* Removed the optional interactive energy calculator and deleted `calculator.js`.
* Replaced advanced DOM listeners (`addEventListener`, `querySelectorAll`, `DOMContentLoaded`) with a beginner-friendly `toggleFAQ()` function using `document.getElementById()` and `onclick` attributes.

### What Was Learned
* How to connect HTML `onclick` events to custom JavaScript functions to manipulate element classes with `classList.toggle()` in JavaScript.
* How to troubleshoot GitHub Desktop server push errors (`Internal Server Error`) and structure clear, meaningful commit messages.

### Limitations or Issues Encountered
* Initial AI code included advanced concepts (like CSS variables) that needed to be simplified to match class teachings.