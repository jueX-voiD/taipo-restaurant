# Taipo Restaurant Website

A modern restaurant website built with React/Vite frontend and Express.js backend, featuring a contact form and reservation system that sends emails via Gmail SMTP.

## Features

- 🍽️ Beautiful restaurant UI with smooth animations
- 📧 Contact form that sends emails via Gmail SMTP
- 📋 Reservation form that sends emails via Gmail SMTP
- 📱 Fully responsive design
- 🚀 Built with modern tech: Vite, React, Express, Tailwind CSS
- 🔐 Environment-based configuration

## Project Structure

```
taipo-website/
├── client/           # React/Vite frontend
├── server/           # Express.js backend with API routes
├── shared/           # Shared TypeScript types
├── dist/             # Built production files (client + server)
├── public/           # Static assets
└── ...config files
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (package manager used in this project)
- A Gmail account (for email functionality)

## Local Development Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Copy the example environment file and fill in your Gmail credentials:

```bash
cp .env.example .env
```

Then edit `.env` with your actual values:

```env
# ---------- GMAIL SMTP (for both reservation & contact emails) ----------
# Gmail requires an App Password if you have 2-Factor Authentication enabled.
# See: https://support.google.com/accounts/answer/185833
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_char_app_password  # NOT your regular Gmail password!

# Verified sender – must be the same Gmail address (or an alias you own)
MAIL_FROM="Taipo <your_email@gmail.com>"
# Where you want to receive the messages (reservation & contact)
MAIL_TO=your_email@gmail.com

# Optional: change the ping message for the /api/ping health check
PING_MESSAGE="pong"

# Server port (cPanel will usually override this, but keep it for local dev)
PORT=3000
```

> **Important**: You MUST use an **App Password**, not your regular Gmail password:
> 1. Enable 2-Factor Authentication on your Google Account
> 2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
> 3. Select "Mail" as the app and generate a 16-character password
> 4. Use that 16-character password (without spaces) for `SMTP_PASS`

### 3. Start Development Server

```bash
pnpm dev
```

This starts both:
- Vite dev server (frontend) on `http://localhost:8080`
- Express API server (backend) proxied through Vite

### 4. Test the Application

- Visit `http://localhost:8080` to see the homepage
- Visit `http://localhost:8080/contact` to test the contact form
- Visit `http://localhost:8080/api/ping` to verify the API is working (`{ "message": "pong" }`)

## Building for Production

```bash
# Build both client and server
pnpm build

# Start the production server
pnpm start
```

The production server will run on `http://localhost:3000` (or the port specified in your `.env` file).

## Testing Email Functionality

### Contact Form
1. Go to `/contact-us` page
2. Fill in the form (Name, Email, Phone, Message)
3. Click "Submit"
4. Check your email (the one set in `MAIL_TO`) for the submission

### Reservation Form
The reservation form follows the same pattern and uses the same email configuration.

## Deployment Options

### Option 1: Render.com (Recommended for quick testing)
1. Push your code to a GitHub/GitLab repository
2. Create a new **Web Service** on Render
3. Connect your repository
4. Set:
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `pnpm start`
5. Under "Environment", add all variables from your `.env` file
6. Deploy!

### Option 2: Railway.app
1. Connect your GitHub repository
2. Railway will auto-detect it's a Node.js project
3. Add your environment variables from `.env` in the dashboard
4. Deploy!

### Option 3: Traditional VPS (DigitalOcean, Linode, etc.)
1. Create a small server ($5/month droplet)
2. Install Node.js and PM2
3. Clone your repository
4. Run: 
   ```bash
   pnpm install
   pnpm build
   pm2 start "pnpm start" --name taipo-website
   ```
5. Set up a reverse proxy (nginx) if needed for port 80/443

### Option 4: cPanel "Setup Node.js App" (what the demo site uses)

The production server only runs the **built** output in `dist/` (the source
folders are never executed), and shared hosting usually cannot run the build,
so build on your own computer and upload the result.

Server settings (Setup Node.js App): Node.js 20.19+ (22/24 also fine),
Application mode **Production**, Application root `repositories/taipo-restaurant`,
Startup file `app.cjs`, plus the `SMTP_*`, `MAIL_FROM` and `MAIL_TO` environment
variables.

**Deploy checklist**

1. Push the code to GitHub, then in cPanel > Git Version Control click
   **Update from Remote**.
2. On your computer build a fresh zip (delete the old zip first, otherwise
   `zip` keeps stale files from the previous build inside it):
   ```bash
   rm -f dist.zip && pnpm build && zip -r dist.zip dist
   ```
3. On the server delete the old `dist` folder, upload `dist.zip` to the app
   root and extract it, then delete the zip. You should end up with
   `dist/server/node-build.mjs` and `dist/spa/index.html` (not `dist/dist/...`).
4. Only if `package.json` changed, in the cPanel terminal:
   ```bash
   source ~/nodevenv/repositories/taipo-restaurant/20/bin/activate && cd ~/repositories/taipo-restaurant
   npm install --omit=dev
   ```
5. Stop old app processes. The **Restart** button does not always kill them,
   and an old process keeps serving the previous build from memory (this
   caused missing fonts on iPhones that had no cached copy):
   ```bash
   ps -u goldenja -o pid,lstart,cmd | grep lsnode | grep -v grep
   kill <PID>   # any process that started before your upload
   ```
6. In Setup Node.js App click **Restart** (or Stop, then Start), then run the
   `ps` command again and confirm the start time is fresh.
7. Test in a private window: `/api/ping` returns `{"message":"ping"}`, a made-up
   URL shows the 404 page, `/taipo-favicon.svg` loads, both forms send email.
   Test on an iPhone with Safari's cache cleared (Settings > Safari > Clear
   History and Website Data).

If the site still works after deleting `dist`, an old process is serving it
from memory: see step 5.

## Important Notes

### Email Limitations
- Gmail has sending.

### Troubleshooting Email Issues
1. **Authentication failed**: Double-check your App Password (must be 16 characters, no spaces)
2. **Emails not arriving**: Check your spam/junk folder
3. **Connection refused**: Verify `SMTP_HOST` and `SMTP_PORT` are correct for Gmail
4. **Still not working?**: Enable "Less secure app access" in your Google Account if you're having persistent issues (though App Passwords are preferred)

### Environment Variables Reference
| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_HOST` | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port (587 for STARTTLS) | `587` |
| `SMTP_USER` | Your Gmail address | `your_email@gmail.com` |
| `SMTP_PASS` | **Gmail App Password** (16 chars) | `abcd efgh ijkl mnop` (no spaces) |
| `MAIL_FROM` | Sender email address | `"Taipo <your_email@gmail.com>"` |
| `MAIL_TO` | Recipient email | `your_email@gmail.com` |
| `PORT` | Server port | `3000` |
| `PING_MESSAGE` | Custom ping response | `"pong"` |

## Troubleshooting

### "Cannot find module" errors
Try reinstalling dependencies:
```bash
pnpm install
```

### Port already in use
Change the `PORT` in your `.env` file or kill the process using the port:
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill
```

### Email not sending
1. Verify your App Password is correctly formatted (16 characters, no spaces)
2. Check that 2-Factor Authentication is enabled on your Google Account
3. Ensure "Less secure app access" is OFF (when using App Passwords)
4. Check server logs for specific error messages

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Need help?** If you encounter issues with deployment or email configuration, please check:
1. Your `.env` file is correctly formatted
2. You're using a Gmail App Password (not your regular password)
3. Your Google Account has 2-Factor Authentication enabled