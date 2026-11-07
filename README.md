# Developer portfolio

A responsive personal portfolio built with HTML, CSS, and vanilla JavaScript. It includes a navigation bar, hero, about, skills, projects, and contact section. There is no build step and no framework.

The copy, project cards, and contact details are samples. Replace them with your own before you publish the site.

## Folder structure

```text
portfolio-website/
├── index.html    Page structure and content
├── style.css     Layout, typography, and responsive styles
├── script.js     Menu, scroll state, and form checks
├── README.md     This guide
└── .gitignore    Files Git should ignore
```

Keep these files in the project root. The stylesheet and script are linked from `index.html`, so they need to stay next to it.

## How to run it

Open `index.html` in a browser. That is enough for reading the page and checking the layout.

For a local server, run one of these commands from this folder, then visit the printed address:

```bash
python -m http.server 5500
```

```bash
npx serve .
```

## Customize

1. Replace `Your Name`, `Your city`, and `you@example.com` in `index.html`.
2. Rewrite the About copy and swap the sample projects for work you can explain.
3. Change each project link `href` from `#` to a live demo or repository.
4. Adjust colors and type in the `:root` variables at the top of `style.css`.

The contact form validates in the browser only. It does not send email. Connect it to a form service when you are ready to receive messages.

## Browser support

The layout uses CSS Grid, custom properties, and `scroll-behavior`. Current versions of Chrome, Edge, Firefox, and Safari support those features.
