# SPX / VIX Explorer

Includes your original React code and its built-in SPX and VIX datasets.
The dataset is static. Imported datasets are saved in this browser's localStorage,
not in your GitHub repository and not shared across devices.

## Publish with GitHub Pages

1. Extract the ZIP on your computer. Do not upload the ZIP itself.
2. Create a public GitHub repository with the default branch named main.
3. Upload all extracted files and folders to the repository root, including
   .github/workflows/deploy.yml. package.json and index.html must be at the root,
   not inside another spx-vix-explorer folder. Commit the upload.
4. Open Settings > Pages. Under Build and deployment, set Source to GitHub Actions.
5. Open Actions > Deploy to GitHub Pages > Run workflow, select main, and run it.
   If the first automatic run failed before Pages was enabled, rerun it now.
6. After the workflow succeeds, find your website link in Settings > Pages.

If your browser upload skips the .github folder, use Add file > Create new file,
name it .github/workflows/deploy.yml, and paste the contents of the extracted
deploy.yml file. Commit it.

The relative Vite base works with any repository name and custom domains.
Future pushes to main rebuild and deploy the website.

## Run locally

Install Node.js 22.12 or newer, open a terminal in this folder, then run:

    npm install
    npm run dev

Open the local URL printed by Vite. To build: npm run build.

Deployment reference: https://vite.dev/guide/static-deploy.html#github-pages

The application and statistical calculations are preserved from the supplied code.
The supplied market data has not been independently verified.
