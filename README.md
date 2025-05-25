# Serverless RealWorld Monorepo

![RealWorld](https://img.shields.io/badge/realworld-implemented-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

> ### Serverless implementation of the RealWorld specification using a monorepo architecture

This codebase contains a full-stack application (frontend + backend) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) specification, implemented using a monorepo structure and serverless architecture.

## Overview

This project demonstrates how to build a modern web application using:

- **Monorepo Architecture**: Single repository for both frontend and backend code
- **Serverless Backend**: AWS Lambda functions with microservice architecture
- **Modern Frontend**: Next.js-based frontend application

The application implements the RealWorld specification, also known as the "Medium clone", providing a real-world example of a blog platform with features like authentication, article creation, commenting, and user profiles.

## Project Structure

```
monorepo/
├── apps/
│   ├── frontend/   # Next.js frontend application
│   └── backend/    # Serverless backend services
├── packages/       # Shared libraries and utilities
├── tools/          # Build and development tools
├── configs/        # Shared configuration files
└── docs/           # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Yarn (v1.22 or later)
- AWS CLI (for backend deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/roboco-io/serverless-realworld-monorepo.git
   cd serverless-realworld-monorepo
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

### Development

#### Running the Frontend

```bash
yarn workspace frontend dev
```

The frontend will be available at http://localhost:3000.

#### Running the Backend Locally

```bash
yarn workspace backend dev
```

The backend API will be available at http://localhost:4000.

### Testing

Run tests across all packages and applications:

```bash
yarn test
```

Or test specific workspaces:

```bash
yarn workspace frontend test
yarn workspace backend test
```

### Building

Build all packages and applications:

```bash
yarn build
```

## Deployment

### Frontend Deployment

The frontend can be deployed to Vercel or any static hosting service:

```bash
yarn workspace frontend build
yarn workspace frontend deploy
```

### Backend Deployment

The backend is deployed to AWS using the Serverless Framework:

```bash
yarn workspace backend deploy
```

## Documentation

Additional documentation is available in the `docs/` directory:

- [Project Plan](docs/project-plan.md) - Detailed project roadmap and implementation plan
- [Monorepo Integration](docs/ideation.md) - Information about the monorepo structure and integration approach
- **Legacy Codebase Analysis**:
  - [Overview](docs/legacy-codebase-analysis/README.md) - Introduction to the legacy codebase analysis
  - [01. Shared Data Types](docs/legacy-codebase-analysis/01_공유_데이터_타입_.md) - Analysis of shared data types
  - [02. Frontend User Actions and Session Management](docs/legacy-codebase-analysis/02_프론트엔드_사용자_액션_및_세션_관리_.md) - Analysis of frontend user interactions
  - [03. Frontend API Routes](docs/legacy-codebase-analysis/03_프론트엔드_api_라우트_.md) - Analysis of frontend API routes
  - [04. Backend API Endpoints (Controllers)](docs/legacy-codebase-analysis/04_백엔드_api_엔드포인트__컨트롤러__.md) - Analysis of backend API controllers
  - [05. Backend Core Service Logic](docs/legacy-codebase-analysis/05_백엔드_핵심_서비스_로직_.md) - Analysis of backend service implementations
  - [06. Backend Data Models and Persistence](docs/legacy-codebase-analysis/06_백엔드_데이터_모델_및_영속성_.md) - Analysis of data models and database interactions
  - [07. Backend Authentication and Security](docs/legacy-codebase-analysis/07_백엔드_인증_및_보안_.md) - Analysis of authentication mechanisms

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [RealWorld](https://github.com/gothinkster/realworld) for the application specification
- [Serverless Framework](https://www.serverless.com/) for simplifying serverless development
- [Next.js](https://nextjs.org/) for the frontend framework
