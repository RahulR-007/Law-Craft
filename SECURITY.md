# Security Configuration

## Environment Variables Required

Before running this application, you must create a `.env` file in the root directory with the following variables:

```bash
VITE_Firebase_URL=your_Firebase_project_url
VITE_Firebase_ANON_KEY=your_Firebase_anon_key
```

## Security Notes

- Never commit your `.env` file to version control
- The `.env.example` file shows the required structure
- All sensitive credentials are now properly externalized
- The application will not start without proper environment variables

## Setup Instructions

1. Copy `.env.example` to `.env`
2. Replace placeholder values with your actual Firebase credentials
3. Restart your development server

## Production Deployment

Ensure all environment variables are properly configured in your deployment platform.
