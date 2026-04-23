# Staging Workflow — handypioneers.com

Staging lets you preview changes at **https://staging.handypioneers.com** before they hit production at handypioneers.com / www.handypioneers.com.

## How it's wired

| Piece | Value |
|---|---|
| Staging branch | `staging` on `360Method/handy-pioneers-manus` |
| Staging Railway service | `www-staging` in project `enthusiastic-endurance` |
| Staging URL | https://staging.handypioneers.com |
| Production branch | `main` |
| Production Railway service | `handy-pioneers-www-V2` |
| Production URL | https://handypioneers.com, https://www.handypioneers.com |

`staging` and `main` are both long-lived branches. Changes flow `staging → main`, never the other way.

## Push a change to staging

Option A — let an agent do it. Tell Claude "push this change to staging" and it will commit to the `staging` branch and redeploy.

Option B — by hand:

```bash
git checkout staging
git pull origin staging
# make your edits
git add -A
git commit -m "your message"
git push origin staging
```

Railway picks up the push and redeploys `www-staging` automatically.

## Preview the change

Open https://staging.handypioneers.com in a browser. Give Railway 60–120 seconds after the push for the build to finish. You can watch the deploy in the Railway dashboard under project `enthusiastic-endurance` → `www-staging`.

## Promote staging → main (ship it)

If the staging preview looks right, fast-forward `main` to match `staging`:

```bash
git checkout main
git pull origin main
git merge --ff-only staging
git push origin main
```

If the merge is not fast-forward, it means `main` has commits `staging` doesn't — rebase `staging` on top of `main` first and re-test before promoting.

## Reject a staging change (start over)

If you want to throw out the staging preview and resync staging with production:

```bash
git checkout staging
git fetch origin
git reset --hard origin/main
git push --force-with-lease origin staging
```

This wipes everything on staging and makes it identical to main. Only do this when you're sure the staging-only changes are not worth keeping.

## Emergency hotfix path

For an urgent fix that can't wait for staging review:

```bash
git checkout main
# edit, commit, push
git push origin main
```

Then catch `staging` back up so you don't drift:

```bash
git checkout staging
git merge --ff-only main
git push origin staging
```
