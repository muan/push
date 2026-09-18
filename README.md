# Push

> [!IMPORTANT]
> This is almost entirely vibe-coded with Claude (except this README) and reviewed humanly by me. Reading through the code should take less than 5 minutes.

---

Receive push notifications on your Apple device with a web page, no app or server required. 

Built with Safari's [Declarative Web Push](https://webkit.org/blog/16535/meet-declarative-web-push/) format (Web Push without service workers), only supported now in Apple products.

- Prerequisites: 
  1. Static Web Host (default: GitHub Pages)
  2. Worker (default: GitHub Actions)
  3. Apple Shortcut ([install template](https://github.com/muan/push/raw/main/Web%20Push%20template.shortcut))
  
  Swap as you wish and make code changes accordingly.

- [Demo](https://muan.github.io/push/): notifications can only be sent with my keys combined with the payload generated.

- [Fork and deploy](#fork-and-deploy)

## Use case

Clare (you, potentially) is Mu-An's neighbor who has a cat called Chi-chi. Mu-An would like to be notified every time Chi-chi is out on the balcony. Clare has a camera with animal detection feature, and Mu-An has an iPhone and view of Clare's balcony. 

### Setup

**Clare** forks and setup this repository.

**Mu-An** goes to `index.html` via HTTPS → **Mu-An** subscribes and gives **Clare** the payload → **Clare** puts the payload into the installed Shortcut, and setup the automation to run the shortcut when triggered.

### Result

Automation calls GitHub Action API → GitHub Actions runs `send.js` to push notify **Mu-An** that Chi-chi is on Clare's balcony.

Reusable: Clare's new girlfriend finds out about this, and would also like to be notified with Chi-chi's whereabouts. She goes to the web page to subscribe, and Clare adds her subscription payload to the automation.

## Workflow

1. Open the web page in Safari, add it to iOS home screen, and open it from there.
2. Tap "Allow notifications," then "Share subscription details" and save or share that JSON to notification sender.
3. Send notifications with a Shortcut ([install template](https://github.com/muan/push/raw/main/Web%20Push%20template.shortcut)) that fires a dispatch call to the GitHub Action.

## Structure

- `index.html`: the home-screen web app your phone subscribes through, using Safari's [`window.pushManager`](https://caniuse.com/mdn-api_window_pushmanager).

- `.github/workflows/push.yml`: a GitHub Action runs `send.js` with provided payload without a server.

- `send.js`: signs and encrypts a message, and delivers it to a subscribed phone (via payload).

## Fork and deploy

1. Fork this repo and deploy `index.html` somewhere reachable over HTTPS (e.g. GitHub Pages).

2. Generate a VAPID key pair, e.g. with `npx web-push generate-vapid-keys`.

3. Add `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, and `VAPID_SUBJECT` (a `mailto:` address, e.g. `mailto:you@example.com`) as GitHub Secrets on your fork.

4. In `index.html`'s `<head>`, set the `vapid-public-key` `<meta>` to the public key from step 2, and optionally the `github-repo` `<meta>` to your fork's `owner/repo` to show the admin curl example.

This gives you your own copy of the "Send Push Notification" GitHub Action, which `send.js` runs: signing and encrypting a message and delivering it through Apple's push servers when given a `title`, `body`, `subscription` JSON, and `navigate` URL to open on tap (defaults to `com.apple.home://`).
