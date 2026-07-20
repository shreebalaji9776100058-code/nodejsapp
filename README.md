# Node.js Hello World on Hostinger

This is a lightweight, zero-dependency Node.js application tailored for deployment on **Hostinger Web Hosting**.

---

## 📁 File Structure

```text
├── app.js          # Core application logic & HTML rendering
├── package.json    # Node.js metadata & start scripts
├── .env            # Local environment configuration variables
└── README.md       # Setup & deployment guide
```

---

## 🛠️ Local Setup & Development

1. Ensure **Node.js** (v18 or higher) is installed on your local system.
2. Start the application locally:
   ```bash
   npm start
   ```
   *For live reloading during development:*
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:3000`.

---

## 🚀 Hostinger Deployment Steps

1. **Log in to Hostinger hPanel**:
   - Go to your hosting control panel and select your domain.

2. **Configure Node.js Application**:
   - Locate the **Node.js** section under *Advanced* / *Hosting*.
   - Click **Create Application** (or edit existing settings):
     - **Node.js Version**: Select `18.x` or `20.x`.
     - **Application Mode**: `Production`
     - **Application Root**: `public_html` (or your assigned directory).
     - **Application Startup File**: `app.js`

3. **Upload Application Files**:
   - Extract the contents of this ZIP archive into your Application Root directory using Hostinger **File Manager** or **FTP**.

4. **Start/Restart Application**:
   - Click **Run npm install** (if prompted/needed).
   - Click **Restart Application** in the Hostinger hPanel dashboard.
