# Push

Receive push notifications on your Apple device with a web page, no app or server required. 

Built with Safari's [Declarative Web Push](https://webkit.org/blog/16535/meet-declarative-web-push/) format (Web Push without service workers), so it's Apple-only (iOS, iPadOS, macOS).

## Usage

1. Open the app in Safari, add it to your home screen, and open it from there. (iPhone)
2. Tap "Allow notifications," then "Share subscription details" and save or share that JSON to notification sender.
3. Send notifications with a Shortcut ([install](https://github.com/muan/push/raw/main/Web%20Push%20template.shortcut)) that fires a dispatch call to the GitHub Action.

## Structure

- `index.html`: the home-screen web app your phone subscribes through, using Safari's [`window.pushManager`](https://caniuse.com/mdn-api_window_pushmanager).

- `.github/workflows/push.yml`: a GitHub Action runs `send.js` with provided payload without a server.

- `send.js`: signs and encrypts a message, and delivers it to a subscribed phone (via payload).

## Fork and deploy

1. Fork this repo and deploy `index.html` somewhere reachable over HTTPS (e.g. GitHub Pages).
2. Generate a VAPID key pair, e.g. with `npx web-push generate-vapid-keys`.
3. Add `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, and `VAPID_SUBJECT` (a `mailto:` address, e.g. `mailto:you@example.com`) as GitHub Secrets on your fork.
4. In `index.html`'s `<head>`, set the `vapid-public-key` meta tag to the public key from step 2, and optionally the `github-repo` meta tag to your fork's `owner/repo` to show the admin curl example.

This gives you your own copy of the "Send Push Notification" GitHub Action, which `send.js` runs: signing and encrypting a message and delivering it through Apple's push servers when given a `title`, `body`, `subscription` JSON, and `navigate` URL to open on tap (defaults to `com.apple.home://`).
