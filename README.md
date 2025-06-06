# RiotLegion Site

This repo contains the static files for the RiotLegion website. A simple admin panel (`rladmin1.html`) can be used when running the local Node server to append content to each page. Edits are stored in the `edits/` directory so they can be committed to Git.

## Running locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
   The site will be available at [http://localhost:8967](http://localhost:8967).

Any content added through `rladmin1.html` is saved as HTML snippets in the `edits/` folder and will appear on the relevant pages.
