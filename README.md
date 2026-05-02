<div align="center">

# 📡 WiFi Key Viewer

### Professional WiFi Credential Manager & Security Auditor

[![Version](https://img.shields.io/badge/version-2.4.1-00ffcc?style=for-the-badge&logo=wifi&logoColor=white)](.)
[![License](https://img.shields.io/badge/license-MIT-00bfff?style=for-the-badge)](.)
[![Status](https://img.shields.io/badge/status-Active-a855f7?style=for-the-badge)](.)
[![CEH Training](https://img.shields.io/badge/CEH-Training%20Tool-f59e0b?style=for-the-badge)](.)

> A sleek, dark-themed cybersecurity dashboard for IT administrators and ethical hackers to view, audit, and export saved WiFi credentials — built with pure HTML, CSS, and JavaScript.

</div>

---

## 🖥️ Preview

![WiFi Key Viewer Dashboard Preview](screenshot.png)

*(Note: Please capture a screenshot of your dashboard and save it as `screenshot.png` in the project root directory.)*

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Live Network Scanner** | Simulates scanning saved WLAN profiles with animated progress |
| 👁️ **Password Reveal** | Toggle password visibility per network entry |
| 📋 **Clipboard Copy** | One-click copy of any network password |
| 📤 **CSV Export** | Export all saved credentials to `wifi_passwords.csv` |
| 🔒 **Security Audit** | Color-coded badges for WPA3 / WPA2 / WPA / WEP protocols |
| 📊 **Security Score** | Visual score ring showing overall network security health |
| 🔎 **Search & Filter** | Real-time SSID search with security protocol dropdown filter |
| 🌐 **Animated Background** | Particle canvas with grid and scan-line effects |
| 🔔 **Toast Notifications** | Auto-dismissing alerts for every user action |
| 📱 **Responsive Layout** | Collapsible sidebar with mobile-friendly design |

---

## 🚀 Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Edge, Brave)
- No Node.js, no build tools, no dependencies required

### Installation

```bash
# Clone or download the project
git clone https://github.com/your-username/wifi-key-viewer.git

# Navigate to the project folder
cd wifi-key-viewer
```

### Running

Simply open `index.html` in your browser:

```bash
# Option 1 — Double-click index.html in File Explorer

# Option 2 — Open via CLI (Windows)
start index.html

# Option 3 — Use VS Code Live Server
# Right-click index.html → "Open with Live Server"
```

> **No server required.** The app runs entirely in the browser.

---

## 📁 Project Structure

```
wifi-key-viewer/
├── index.html      # Main application shell & UI layout
├── style.css       # Full design system (glassmorphism, animations, tokens)
├── app.js          # Application logic (scan, export, filter, notifications)
└── README.md       # Project documentation
```

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| **HTML5** | Semantic application structure |
| **Vanilla CSS3** | Custom properties, glassmorphism, animations |
| **Vanilla JavaScript** | All logic — no frameworks, no dependencies |
| **Canvas API** | Animated particle background with scan-line effect |
| **Clipboard API** | Password copy-to-clipboard functionality |
| **Google Fonts** | Inter & JetBrains Mono typography |

---

## 🔑 Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + K` | Focus the search bar |
| `Escape` | Close scan modal / unfocus search |

---

## 📊 Security Classifications

| Badge | Protocol | Security Level |
|---|---|---|
| 🟢 **WPA3** | Wi-Fi Protected Access 3 | ✅ Top Tier |
| 🔵 **WPA2** | Wi-Fi Protected Access 2 | ✅ Strong |
| 🟡 **WPA** | Wi-Fi Protected Access | ⚠️ Moderate |
| 🔴 **WEP** | Wired Equivalent Privacy | ❌ Weak — Deprecated |

---

## ⚠️ Disclaimer

> **For Educational and Ethical Use Only**
>
> This tool is developed as part of a **Certified Ethical Hacker (CEH) Training** program.
> It is intended strictly for:
> - ✅ Authorized IT administrators managing their own infrastructure
> - ✅ Cybersecurity students and professionals in lab environments
> - ✅ Ethical hacking training and security awareness
>
> **Do NOT use this tool to access, copy, or export credentials from systems you do not own or have explicit written permission to test.** Unauthorized access to computer systems is illegal and punishable under cybercrime laws in most jurisdictions.

---

## 🗺️ Roadmap

- [ ] Real Windows WLAN profile integration via `netsh wlan` (Electron wrapper)
- [ ] Dark/Light theme toggle
- [ ] Password strength analyzer
- [ ] Network history timeline view
- [ ] QR code generation for quick WiFi sharing
- [ ] PDF export with redacted passwords

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with 💻 for **CEH Training** — by [Jhatu Hacker](https://github.com/your-username)

*"Know your network. Secure your network."*

</div>
