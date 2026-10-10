# My Dashboard

A launcher page for my sites, published with GitHub Pages.

## Change the sites

Edit `sites.js`. Each site needs a `name` and either a `url` or a `locked` code.

## Lock a site behind a password

1. Open `lock.html` on the live dashboard.
2. Enter the site's name, link, and a password, then click **Make locked entry**.
3. Paste the result into the `sites` list in `sites.js` and push.

The link is encrypted with the password, so it never appears in the page source. Anyone who already knows a locked site's address can still go to it directly, so sites with sensitive content need their own login too.

## Files

- `index.html` – the dashboard
- `sites.js` – the list of sites (the only file you normally edit)
- `lock.html` – makes locked entries
- `shared.js`, `style.css` – shared code and styles
