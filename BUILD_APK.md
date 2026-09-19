# 📱 Building APK on GitHub for Madrasti Live (مدرستي لايف)

This repository is configured with **Capacitor** and **GitHub Actions** to automatically compile and build an Android APK file.

---

## 🚀 Quick Automated Build via GitHub Actions

### Step 1: Export or Push to GitHub
1. Open the project in **Google AI Studio**.
2. Click the top-right settings/menu icon and select **Export to GitHub** (or connect your GitHub repository via git).

---

### Step 2: Automatic APK Generation
Once your code is on GitHub, the automated workflow located at:
`.github/workflows/build-apk.yml`
will **automatically run** whenever you push changes to `main` or `master`.

---

### Step 3: Triggering a Build Manually (One Click)
You can also trigger a fresh build at any time:
1. Go to your repository on **GitHub**.
2. Click on the **Actions** tab at the top.
3. In the left sidebar, click on **Build Android APK**.
4. Click the **Run workflow** dropdown button on the right, and select **Run workflow**.

---

### Step 4: Download Your APK File
1. When the workflow run completes (usually 2–4 minutes), click on the completed run.
2. Scroll down to the **Artifacts** section at the bottom of the page.
3. Click on **madrasti-live-debug-apk** to download the zip file.
4. Extract the zip to get `app-debug.apk`.
5. Transfer `app-debug.apk` to any Android phone or drag it onto an Android emulator to install!

---

## 💻 Optional: Local Build via Android Studio

If you want to build or test locally on your computer:

```bash
# 1. Install dependencies
npm install

# 2. Build the web app
npm run build

# 3. Sync changes to Android
npx cap sync android

# 4. Open in Android Studio
npx cap open android
```

From Android Studio:
- Select **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
- Or click the green **Run** button to launch directly on your connected device or emulator.
