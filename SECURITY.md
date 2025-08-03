# Security Configuration

## Environment Variables Required

Before running this application, you must create a `.env` file in the root directory with the following variables:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Security Notes

- Never commit your `.env` file to version control
- The `.env.example` file shows the required structure
- All sensitive credentials are now properly externalized
- The application will not start without proper environment variables

## Setup Instructions

1. Copy `.env.example` to `.env`
2. Replace placeholder values with your actual Supabase credentials
3. Restart your development server

## Production Deployment

Ensure all environment variables are properly configured in your deployment platform.
