# Spy Cat Agency - Frontend

Frontend application for managing spy cats. Built with Next.js.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

## Installation

1. Install dependencies:
```bash
npm install
```

## Configuration

1. Create `.env` file in the root directory:
```bash
NEXT_PUBLIC_API_URL=http://0.0.0.0:8000/api/v1
```

Replace `http://0.0.0.0:8000` with your backend API URL if different.

## Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Features

- View list of all spy cats
- Add new spy cat (Name, Years of Experience, Breed, Salary)
- Edit cat salary
- Delete spy cat
- Form validation
- Error handling

## API Endpoints

The application expects the following backend endpoints:

- `GET /cats` - Get all cats
- `GET /cats/:id` - Get cat by ID
- `POST /cats` - Create new cat
- `PATCH /cats/:id` - Update cat (salary only)
- `DELETE /cats/:id` - Delete cat

## Project Structure

```
frontend/
├── app/              # Next.js pages and layout
├── components/       # React components
├── services/         # API services
├── hooks/            # Custom React hooks
├── types/            # TypeScript types
└── lib/              # Utilities
```

## Technologies

- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- Axios
- React Hook Form

## Troubleshooting

- If the app cannot connect to backend, check the `NEXT_PUBLIC_API_URL` in `.env`
- Make sure the backend server is running
- Restart the dev server after changing `.env` file


