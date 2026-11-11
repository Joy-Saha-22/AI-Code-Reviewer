# AI-Powered Code Reviewer

## Introduction

AI-Powered Code Reviewer is a web application for getting AI-generated feedback on source code. It combines a React-based code editor with a Node.js/Express API that sends submitted code to Google's Gemini generative AI service and displays the review as Markdown.

## What it does

- Lets you enter and edit code in a browser-based editor with JavaScript syntax highlighting.
- Sends the code to the backend for review.
- Returns AI feedback focused on code quality, performance, security, and scalability.
- Renders the response as formatted Markdown.

The editor currently applies JavaScript syntax highlighting; the AI service can review code submitted in other languages, but the UI does not detect or highlight them.

## Architecture

```text
Browser (React + Vite)
  └── POST /ai/get-review { "code": "..." }
        └── Express API (Node.js, port 3000)
              └── Google Gemini API
```

The frontend is in `Frontend/`. The backend exposes the review route from `Backend/src/routes/ai.routes.js`, validates the submitted code in the controller, and calls the Gemini model in the AI service. The backend requires `GOOGLE_GEMINI_KEY` in its environment.

## Quick start

### Prerequisites

- Node.js 16 or newer and npm.
- A Google Gemini API key.
- Git, if you are cloning the repository.

### Install

Clone the repository and install dependencies for each application:

```bash
git clone 
cd AI-Code-Reviewer

cd Backend
npm install

cd ../Frontend
npm install
```

### Configure

Create `Backend/.env` and add your Gemini API key:

```dotenv
GOOGLE_GEMINI_KEY=your_gemini_api_key
```

Keep the key private and do not commit the `.env` file.

### Run locally

Open two terminals from the repository root.

Start the backend:

```bash
cd Backend
node server.js
```

The API listens on `http://localhost:3000`.

Start the frontend:

```bash
cd Frontend
npm run dev
```

Open the local URL printed by Vite, enter code, and select **Review**.

## Deploying

The repository does not include deployment-specific configuration. A typical deployment uses a Node.js host for the backend and a static hosting provider for the frontend:

1. Deploy `Backend/` to a Node.js host, install dependencies with `npm install`, set `GOOGLE_GEMINI_KEY` in the host's environment settings, and start the service with `node server.js`. Make sure the host allows the frontend origin through CORS.
2. Before building the frontend, update the API URL in `Frontend/src/App.jsx` from `http://localhost:3000/ai/get-review` to the deployed backend URL. The current URL is hard-coded, so a deployed frontend will otherwise try to contact localhost on the visitor's device.
3. Build the frontend with `npm run build` from `Frontend/` and publish the generated `Frontend/dist/` directory.
4. Verify that the deployed frontend can reach the backend and that the backend can access Gemini using its configured API key.

## Repository layout

```text
.
├── Backend/
│   ├── server.js                 # Starts the Express server on port 3000
│   ├── package.json              # Backend dependencies
│   └── src/
│       ├── app.js                # Express app, middleware, and route mounting
│       ├── controllers/
│       │   └── ai.controller.js  # Request validation and HTTP response
│       ├── routes/
│       │   └── ai.routes.js      # AI review endpoint
│       └── services/
│           └── ai.service.js     # Gemini integration and review generation
├── Frontend/
│   ├── index.html
│   ├── package.json              # Frontend dependencies and Vite scripts
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx               # Code editor and review interface
│       ├── App.css
│       ├── index.css
│       └── main.jsx              # React entry point
├── .gitignore
└── README.md
```
