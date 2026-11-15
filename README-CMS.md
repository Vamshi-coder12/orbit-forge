# ORBIT_FORGE + Pages CMS

This project is wired for Pages CMS. Pages CMS is a GitHub-backed CMS: editors change files in the repository, and the site consumes those files at build time.

## 1. Put the project in GitHub

Create a GitHub repository and push this project to it. Keep the `.pages.yml` file at the repository root.

## 2. Open Pages CMS

Go to https://app.pagescms.org and sign in with GitHub. Install the Pages CMS GitHub App for the account that owns the repository, then open the ORBIT_FORGE repository.

Pages CMS will read `.pages.yml` and show **Website Content** as an editable file.

## 3. Edit content

Open **Website Content**. You can edit:

- Hero title, description and CTA labels
- Launch screen words/message
- Antigravity section copy
- About section
- Service cards
- Contact information
- Footer text
- Navigation labels/links
- Social links

Changes are committed back to GitHub.

## 4. Publish changes automatically

Connect the GitHub repository to your Netlify site. Set the build command to `npm run build` and publish directory to `dist`.

Because the CMS edits `src/content/site.json`, each GitHub commit can trigger a new Netlify build. The React app imports that JSON at build time, so the published site receives the updated content.

## 5. Media

Pages CMS is configured to manage files under `public/images`. The existing FlexCarousel images are therefore available to the CMS media manager.

## Important

Pages CMS itself is not embedded into the public ORBIT_FORGE page. It is the editing interface for the GitHub repository. Your visitors only see the ORBIT_FORGE website.
