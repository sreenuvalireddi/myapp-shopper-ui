# MyApp Shopper UI

A modern React-based shopper interface for end-user shopping experience.

## Features

- Browse and search shops
- View shop details
- User-friendly shopping interface
- Built with React 18, Vite, and Redux Toolkit

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Running the Application

Run both the development server and mock API:

```bash
npm run mock:dev
```

Or run them separately:

```bash
# Development server (port 5173)
npm run dev

# Mock API server (port 3001)
npm run mock
```

## Technology Stack

- React 18
- Redux Toolkit
- React Router DOM
- Vite
- json-server (for mock API)

## Project Structure

```
src/
  ├── components/     # React components
  ├── pages/         # Page components
  ├── store/         # Redux store configuration
  └── App.jsx        # Main application component

mock-server/
  └── db.json        # Mock API data
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run mock` - Start mock API server
- `npm run mock:dev` - Start both servers concurrently
- `npm run build` - Build for production
- `npm run preview` - Preview production build
