Deploying to Vercel (quick guide)

1) Prepare your repository locally

Open PowerShell in the project root and run the helper script:

```powershell
./scripts/publish-to-vercel.ps1
```

The script will:
- initialize git if needed
- create an initial commit if none exists
- prompt for a remote and add it as `origin` (optional)
- push to `origin/main` if you confirm
- optionally run `vercel --prod` to deploy (requires Vercel CLI and login)

2) Set environment variables in the Vercel dashboard

In your Vercel project settings (Environment Variables) add:

- BASE_URL = https://your-production-domain.com
- PROD_DOMAIN = your-production-domain.com

3) Import the repo to Vercel

- On Vercel, choose "Import Project" -> "From Git Repository" and select your pushed repo.
- Keep the detected settings (Next.js) and deploy.

4) Sanity checks after deploy

- Visit: https://your-production-domain.com/
- Check: https://your-production-domain.com/sitemap.xml
- Check: https://your-production-domain.com/robots.txt
- Inspect page source for JSON-LD and Open Graph meta tags

Troubleshooting

If Vercel build fails, check the build logs for errors and ensure you've set the environment variables above. If you used the helper script, make sure you pushed the `main` branch and your repo is public (or give Vercel access to the private repo).
