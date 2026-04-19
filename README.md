# SUPAA - Multi-Agent Orchestration Platform (Frontend)

SUPAA is the intelligent orchestration layer for multi-agent AI systems. This repository contains the frontend web application and UI prototypes, primarily showcasing the **English-Japanese AI Tutor**.

## Repository Structure

- `src/`: Next.js (React) frontend source code.
- `public/`: Static assets and images.
- `prototypes/`: UI mockups and early stage prototypes.
- `webapp/`: Auxiliary web components.

## Engineering Documentation Standard
All engineers contributing to this repository must follow the [SUPAA Engineering Documentation Standard](https://github.com/SuperAgentsCompany/documentations/blob/main/engineering/standards.md). Ensure all major changes, how-to instructions, progress updates, and metrics are documented.

## Getting Started

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

- The frontend will be available at `http://localhost:3000`

### Deployment
This application is designed to be containerized using the included `Dockerfile` and deployed to Google Cloud Run.

```bash
gcloud run deploy --source .
```

## Tech Stack
- **Frontend:** Next.js, React, TypeScript, Vanilla CSS.
