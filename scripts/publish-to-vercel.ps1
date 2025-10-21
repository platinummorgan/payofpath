# Publish helper for Payoff Day (PowerShell)
# Usage: Open PowerShell in the project root and run:
#   ./scripts/publish-to-vercel.ps1
# This script will:
#  - initialize a git repo if none exists
#  - create an initial commit if none exists
#  - prompt for a remote URL and add it as 'origin' (if not present)
#  - push to the 'main' branch
#  - optionally run `vercel --prod` to deploy (requires Vercel CLI & authentication)

param()

function Exec($cmd) {
  Write-Host "\n> $cmd" -ForegroundColor Cyan
  iex $cmd
}

# ensure we're in project root
Push-Location $PSScriptRoot | Out-Null
Set-Location (Resolve-Path "..\")

if (-not (Test-Path .git)) {
  Write-Host "No git repo found. Initializing..." -ForegroundColor Yellow
  Exec 'git init'
} else {
  Write-Host "Git repo detected." -ForegroundColor Green
}

# check for commits
$hasCommits = $false
try {
  git rev-parse --verify HEAD > $null 2>&1
  if ($LASTEXITCODE -eq 0) { $hasCommits = $true }
} catch { }

if (-not $hasCommits) {
  Write-Host "No commits found. Creating initial commit..." -ForegroundColor Yellow
  Exec 'git add -A'
  Exec 'git commit -m "Initial commit: Payoff Day"'
} else {
  Write-Host "Commits present." -ForegroundColor Green
}

# ensure main branch exists and is the current branch
Exec 'git branch --show-current'
$cur = (git branch --show-current).Trim()
if ($cur -ne 'main') {
  Write-Host "Switching/renaming to 'main' branch" -ForegroundColor Yellow
  Exec 'git branch -M main'
}

# remote add if needed
$hasOrigin = $false
try {
  $remotes = git remote
  if ($remotes -match 'origin') { $hasOrigin = $true }
} catch { }

if (-not $hasOrigin) {
  $remote = Read-Host "Enter remote Git URL (e.g. https://github.com/USERNAME/REPO.git) or leave blank to skip"
  if (![string]::IsNullOrWhiteSpace($remote)) {
    Exec "git remote add origin $remote"
  } else {
    Write-Host "Skipping remote add. You can add it later with: git remote add origin <url>" -ForegroundColor Yellow
  }
} else {
  Write-Host "Remote 'origin' already exists." -ForegroundColor Green
}

# push
$doPush = Read-Host "Push to origin main now? (y/N)"
if ($doPush -match '^[Yy]') {
  Exec 'git push -u origin main'
} else {
  Write-Host "Skipping push. Run 'git push -u origin main' when ready." -ForegroundColor Yellow
}

# Vercel deploy
$doVercel = Read-Host "Run 'vercel --prod' now to deploy? (requires Vercel CLI & login) (y/N)"
if ($doVercel -match '^[Yy]') {
  Write-Host "Running: vercel --prod" -ForegroundColor Cyan
  Exec 'vercel --prod'
  Write-Host "If prompted, follow the interactive instructions to link/import the project." -ForegroundColor Green
} else {
  Write-Host "Skipping Vercel deploy." -ForegroundColor Yellow
}

Write-Host "Done. Remember to set the Production environment variables in Vercel: BASE_URL and PROD_DOMAIN." -ForegroundColor Magenta

Pop-Location | Out-Null
