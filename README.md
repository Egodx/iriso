
![IRIS](./iriso.png)

# Iriso app
Cross-platform application that helps visually impaired users to identify objects around them, read labels, price tags, meters, short texts, describe photos, etc.
It is a client for [IRIS  server](https://github.com/Egodx/iris) and can only work with it.

## IRIS Server
You will need IRIS server credentials before you can use your Iriso app. [See instructions.](https://github.com/Egodx/iris)
Once your IRIS server is up and running, you only need the *URL* and the *access token*.

## Run Iriso with Expo
The fastest way to get Iriso on your device is to use [this Expo Snack](https://snack.expo.dev/@xsdev/iriso-app) and *Expo Go* on your [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) or [iOS](https://apps.apple.com/us/app/expo-go/id982107779) device. Insert your `Server Url` and `Access Token` from the previous step into App.js. 

Select **My Device → on your device: open Expo Go → Scan QR code → Use it** 

Iriso was designed so that it can be easily modified by anyone with minimal knowledge of modern JS. So feel free to customize it to fit the very individual needs of the visually impaired user.

## Build Iriso app with EAS Build
When it's time to share your version of Iriso app with users, you can build it for internal or store distribution. EAS Build is the easiest way to do this.
First, read [Expo documentation on EAS Builds.](https://docs.expo.dev/build/setup/) You can configure `app.json` and `eas.json` from this repo for your project (set project id, package name and slug) or create them from scratch.

## Philosophy
It is impossible to fit all the variety of special needs of visually impaired into one application. Solution? Make your own app that targets specific user or small user group. Both IRIS and Iriso were designed for personal use.

### Why not just use Be My Eyes Virtual Volunteer (Be My AI)?
**Be My Eyes** is a great tool but not for everyone. **Be My AI** only works well when TalkBack or VoiceOver mode is active. Not all low vision users need or want to use these technologies. TalkBack/VoiceOver is difficult for older users to master. Also **Be My AI** sometimes tells you much less or much more information than you need, and there is no way to change such behavior of the proprietary software. *Extra bonus:* many relatively small buttons that are easy to miss.

Iriso can be used completely tactile with eyes closed, without TalkBack of course. Braille feedback can be used rather than voice feedback if necessary.

### TypeScript, prebuilt APK/IPA, Settings Page?
Short answer: no.

Long answer: Iriso is written in functional js to make it understandable for less experienced JS developers. Visually impaired people don't always have an experienced developer by their side. At this point, TypeScript will not make the small application (~200 lines) more readable.

Pre-built APKs are useless because the personal IRIS access token must be in the code. Settings page can help but...

Iriso should to be fool-proof and perfectly protected from accidental changes, and must have a fully tactile configuration. How to do it? By scanning a QR code with settings on the first launch. It's part of the roadmap.

### Can I use IRIS and Iriso to create a subscription-based service? 
Yes you can. Both licenses allow you to do this.

## Roadmap
* "Repeat last description" button
* Haptic feedback
* Ask for QR code with settings on the first run (0-click setup)

## License
MIT. See [MIT.md](./MIT.md)
