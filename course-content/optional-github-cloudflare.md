# Optional hosting with GitHub and Cloudflare

This is an after-course exercise with an estimated 20–30-minute practice allowance. It introduces GitHub and Cloudflare accounts outside the ChatGPT-only core. Complete and verify the Sites build first. You can use the desktop app's built-in browser for the steps below.

This draft guide has been checked against the linked provider documentation and the course's local static export. A separate Cloudflare deployment has not yet been verified for this course version; follow the result checks before relying on your deployed copy.

## Export the static dashboard

Ask ChatGPT: “Prepare a portable static copy of my reviewed Aura dashboard. Include index.html, its CSS and JavaScript modules, the bundled synthetic data, the brief mirror and any source downloads the links require. Keep all asset paths relative. Include no credentials, database dependencies, Sites identity files or private workspace metadata. Package the files with index.html at the archive root and give me a file list.”

The course's reference export supplies a buildless HTML dashboard. It does not export your private Pages permissions or turn a Page into a public document. Keep your decision brief in Pages; if readers cannot access it, include only its reviewed synthetic text in the exported brief mirror.

## Put the files in GitHub

1. Sign in to your own GitHub account and create a repository for the synthetic dashboard. Choose visibility deliberately. A private source repository does not make the eventual hosted site private.
2. In the repository, choose **Add file**, then **Upload files**. Upload the extracted dashboard files and folders, rather than uploading the ZIP as the sole repository file. Ensure index.html is at the repository root.
3. Review the filenames and commit the upload with a descriptive message such as “Add reviewed Aura dashboard.” Never include API keys, login credentials or actual customer information.

GitHub's browser uploader supports file/folder upload subject to its documented size and file-count limits. For this small static reference, a browser upload is sufficient. Repository protection rules can require a branch and review. [GitHub upload guidance](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).

## Connect Cloudflare Pages

1. Sign in to Cloudflare and open **Workers & Pages**. Choose to create a Pages project and connect the GitHub repository. Follow the current account connection prompts; grant access to the intended repository.
2. Select the repository and production branch containing the reviewed files. For this static reference, choose no framework preset, set the build command to `exit 0` if the form requires a command, and use the repository root as the output directory. Do not introduce a framework or a server for a buildless HTML site.
3. Deploy, then retain the Pages-generated URL. The exact settings labels may change; use Cloudflare's current static HTML and Git integration guides when the form differs.
4. Test the deployed result before sharing it. Compare June / All controls, switch to Mobile-acquired, operate the +20% scenario and open every brief and source link.

Cloudflare Pages supports static HTML and Git-connected deployments. Changes pushed to the configured repository branch can trigger later deployments. Review your account's current terms and limits; this appendix does not require a paid feature, custom domain, database or API service. [Static HTML guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/), [Git integration guide](https://developers.cloudflare.com/pages/get-started/git-integration/).

## Check the exported result

June / All should show revenue MYR600,000, 40,000 transacting customers, activation 38%, CAC MYR66, contribution margin 36% and transaction success 96.77%. A +20% spending assumption should show an additional MYR132,000 per month, 2,000 hypothetical verified customers and 760 hypothetical activated customers.

If a control or link fails, ask ChatGPT to correct the source and repeat the check. Changing a local file does not update either host until the reviewed source is deployed there. Sites sharing settings and Pages permissions do not transfer to Cloudflare. Before sharing the new URL, check the audience and ensure any public copy contains only the synthetic training material you intend to expose.
