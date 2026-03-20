# Agent Notes

This repository is tied to GitHub account `RicardoReyes-DS`.

## Required GitHub CLI profile

- Use `gh-ricardoreyes-ds` or shell alias `gh-ds`
- If you need plain `gh`, first run `use-gh-ds`
- Do not use the `rrv-enkisys` profile in this repository

## Git identity and remote

- Git author email for this repo: `ricardo@enkisys.com`
- Origin remote must remain `git@github-ricardoreyes-ds:RicardoReyes-DS/ml-agency.git`
- Use SSH, not HTTPS with tokens

## Public brand and contact

- Public brand name: `Enkisys`
- Public domain: `https://enkisys.agency`
- CTA/contact email used on the site: `ricardo@enkisys.net`
- The repo slug may remain `ml-agency`; do not rename repo/remotes unless explicitly requested

## Deploy workflow

- Normal deploy path is GitHub Actions, not manual `gcloud run deploy`
- Use the `Deploy to Cloud Run` workflow in GitHub Actions
- A push to `main` should trigger deploy automatically; `workflow_dispatch` is also enabled for manual runs
- GitHub Actions auth uses Workload Identity Federation; do not switch this repo back to static service-account keys
- Required repository secrets: `WIF_PROVIDER`, `WIF_SERVICE_ACCOUNT`
- Detailed setup/troubleshooting lives in `CI-CD-SETUP.md`

## Infrastructure guardrails

- Do not change `SERVICE_NAME=ml-agency` in deploy/config scripts without explicit approval; that would change the Cloud Run target service
- Do not change the GitHub repo reference `RicardoReyes-DS/ml-agency` in WIF-related docs/scripts unless the repo itself is being migrated
- Branding/content updates for the public site are safe; infrastructure identity updates require explicit confirmation

## Quick checks

- `git config user.email`
- `git remote get-url origin`
- `gh-ricardoreyes-ds auth status`
