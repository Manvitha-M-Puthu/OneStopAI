

***

# OneStopAI

**OneStopAI** is a unified AI-powered platform aimed at centralizing access to multiple AI tools and services. Its modular architecture enables rapid prototyping and integration with cutting-edge AI models, making powerful AI accessible to developers and users alike.

***

## 🖼️ Screenshots

<img width="1895" height="913" alt="image" src="https://github.com/user-attachments/assets/54adf98e-e457-42d5-a91a-c4b324a23817" />
<img width="1878" height="913" alt="image" src="https://github.com/user-attachments/assets/e919e157-f727-4594-b7b2-9daaa8882c89" />
<img width="1890" height="914" alt="image" src="https://github.com/user-attachments/assets/01d3198a-6c87-44f1-8ac6-79af00f6109d" />


# Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Architecture Overview](#architecture-overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

***

## 🚀 Features

- **Centralized AI Hub:** One-stop access to capabilities like text generation, image analysis, summarization, and more.
- **Modular Frontend & Backend:** Easily scalable architecture.
- **Pluggable AI Integrations:** Add or swap AI models and services as needed.
- **User Authentication:** Optional support for secure user accounts (if implemented).
- **Real-time Results:** Asynchronous feedback for quick user experience.
- **Modern UI:** Fully responsive design.
- **Deployment-Ready:** Cloud deployment support, e.g., Vercel.

***

## 🔗 Demo

**Live Demo:** [onestop-ai.vercel.app](https://onestop-ai.vercel.app)

***

## 🏗️ Architecture Overview

```
┌─────────────┐        HTTP/API        ┌──────────────┐        AI Engines &
│   Client    │ <───────────────►      │   Server     │◄─────► Model APIs
│ (React.js)  │         JSON           │ (Node.js)    │       (OpenAI, etc.)
└─────────────┘                        └──────────────┘
```

- **Client**: Multi-page app built with React.js for user interaction.
- **Server**: Node.js backend exposes REST APIs to connect client and AI models/services.
- *PostgreSQL For database Storage*

***

## ⚙️ Getting Started

### Prerequisites

- Node.js v14 or later
- npm (or yarn)
- Git

### Installation

**1. Clone the Repository**
```bash
git clone https://github.com/Manvitha-M-Puthu/OneStopAI.git
cd OneStopAI
```

**2. Set Up the Client**
```bash
cd client
npm install         # or yarn install
npm start
```

**3. Set Up the Server**
```bash
cd ../server
npm install         # or yarn install
npm run dev         # or npm start
```

**4. Open the App**
- Visit [http://localhost:3000](http://localhost:3000) in your browser.

***

## 📁 Project Structure

```
OneStopAI/
├── client/          # Frontend (React)
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── Assets/
        ├── App.jsx
        ├── main.jsx
├── server/          # Backend (Node.js)
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   └── configs/
├── server.js
├── .gitignore
├── README.md
└── package.json
```

***

## ⚙️ Configuration

1. **Environment Variables**

   - Create `.env` files in both `/client` and `/server` as needed.

     Example for `server/.env`:
     ```
      DATABASE_URL=

      #Clerk Auth
      CLERK_PUBLISHABLE_KEY=
      CLERK_SECRET_KEY=

      #Google Gemini
      GEMINI_API_KEY=

     #Clipdrop
      CLIPDROP_API_KEY=

      #Cloudinary
      CLOUDINARY_CLOUD_NAME=
      CLOUDINARY_API_KEY=
      CLOUDINARY_API_SECRET=

      CORS_ORIGIN=
     ```

2. **API Keys & Secrets**
   - Store your AI API credentials (e.g., Google-OpenAI) securely in environment files.

3. **Client Configuration**
   - Configure API endpoint URLs as needed, possibly in `.env` or config files.

***

## 📜 Available Scripts

From within the `client` or `server` directory:

- `npm install` — Install dependencies
- `npm start` or `npm run dev` — Start development server
- `npm run build` (client) — Build for production

## 🤝 Contributing

Your contributions are welcome!

1. **Fork** the repository.
2. **Create** your feature branch: `git checkout -b feature/feature-name`
3. **Commit** your changes: `git commit -m 'Add some feature'`
4. **Push** to the branch: `git push origin feature/feature-name`
5. **Open** a Pull Request.

***

## 📝 License

Licensed under the MIT License.

***

## 🙏 Acknowledgments

- Inspired by advancements in AI, powered by APIs like [OpenAI], [Hugging Face], and others as integrated.
- Special thanks to contributors and the open-source community!

***

**Tip:**  
Tailor the feature list, endpoints, and architectural notes to provide rich, accurate documentation for future users and contributors!

***
