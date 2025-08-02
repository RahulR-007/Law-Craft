# LawCraft - React Modernization

A modern React-based legal document generation platform, converted from the original PHP/HTML/CSS/JavaScript implementation.

## 🚀 Features

### ✅ Completed
- **Modern Landing Page** with smooth scrolling sections (Home, Info, Pricing, Contact)
- **Authentication System** with Supabase integration (Sign up/Sign in)
- **Responsive Design** with black and purple theme matching original
- **Dashboard** with user profile management
- **React Router** for navigation
- **Chakra UI** for modern component library
- **Framer Motion** for smooth animations
- **TypeScript** for type safety

### 🔄 In Progress
- **AI Chat Integration** (Alice chatbot replacement)
- **Document Generation** interface
- **Pricing Plans** with payment integration
- **Help/Support** pages

### 📋 Todo
- **Database Schema** setup in Supabase
- **Payment Integration** (Stripe/Razorpay)
- **Email Templates** for verification
- **Admin Dashboard** for user management
- **API Integration** for document generation
- **File Upload/Download** functionality

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript
- **UI Library**: Chakra UI
- **Animation**: Framer Motion
- **Routing**: React Router Dom
- **Backend**: Supabase (Database, Authentication, Storage)
- **Build Tool**: Vite
- **Styling**: CSS Modules + Chakra UI theme

## 🚀 Deployment

### Quick Deploy Options

#### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push

#### Netlify
1. Connect your GitHub repository to Netlify  
2. Configure environment variables in Netlify dashboard
3. Deploy automatically on every push

#### Docker
```bash
# Build and run with Docker
docker build -t law-craft .
docker run -p 80:80 law-craft
```

### Environment Variables Required
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Build Optimization
- ✅ Bundle size optimized with code splitting
- ✅ Vendor chunks separated for better caching
- ✅ Lazy loading implemented for routes
- ✅ Assets optimized for production

## 🎨 Design System

### Colors
- **Primary Black**: `#0c0c0c`
- **Primary Purple**: `#970fff`
- **Secondary Purple**: `#7817ff`
- **White**: `#ffffff`
- **Gray variants**: For text and borders

### Typography
- **Font Family**: Montserrat (300, 400, 700, 900)
- **Responsive font sizes** for different screen sizes

## 📁 Project Structure

```
Law-Craft/
├── public/
│   ├── assets/
│   │   └── img/          # Images and assets
│   └── index.html
├── src/
│   ├── components/       # Reusable components
│   ├── contexts/         # React contexts (Auth, etc.)
│   ├── pages/           # Page components
│   │   ├── Landing.tsx   # Main landing page
│   │   ├── Auth.tsx      # Authentication page
│   │   └── Dashboard.tsx # User dashboard
│   ├── theme.new.ts     # Chakra UI theme configuration
│   ├── App.tsx          # Main app component
│   └── main.tsx         # App entry point
├── .env                 # Environment variables
├── package.json         # Dependencies
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Law-Craft
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Copy your project URL and anon key to `.env`
3. Set up authentication in Supabase dashboard
4. Create user profile table:

```sql
-- User profiles table
create table profiles (
  id uuid references auth.users on delete cascade,
  full_name text,
  plan_name text default 'Free',
  tokens integer default 10,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Enable RLS
alter table profiles enable row level security;

-- Policy for users to see own profile
create policy "Users can view own profile" 
  on profiles for select 
  using (auth.uid() = id);

-- Policy for users to update own profile
create policy "Users can update own profile" 
  on profiles for update 
  using (auth.uid() = id);
```

## 📱 Features Overview

### Landing Page
- **Smooth scrolling sections** with animation
- **Interactive navigation** (side nav + mobile nav)
- **Document type showcase** with slider
- **Contact information** and social links

### Authentication
- **Sign up/Sign in** with email and password
- **Email verification** (configured in Supabase)
- **User profile** with plan and token information
- **Secure logout** functionality

### Dashboard
- **AI Chat interface** placeholder (for future integration)
- **User profile modal** with logout option
- **Navigation to different sections**
- **Responsive design** for all devices

## 🎯 Original vs Modern Comparison

| Feature | Original (PHP) | Modern (React) |
|---------|----------------|----------------|
| Frontend | HTML/CSS/JS | React + TypeScript |
| Backend | PHP + MySQL | Supabase |
| Styling | SASS/CSS | Chakra UI + CSS |
| Animation | jQuery | Framer Motion |
| Auth | Custom PHP | Supabase Auth |
| Database | MySQL | PostgreSQL (Supabase) |
| Deployment | Traditional hosting | Vercel/Netlify |

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔮 Future Enhancements

- **AI Integration**: Chat with Alice for document generation
- **Advanced Document Templates**: More legal document types
- **Payment Integration**: Subscription management
- **Admin Panel**: User and document management
- **Mobile App**: React Native version
- **Offline Support**: PWA capabilities
- **Multi-language**: Internationalization support

---

**Note**: This is a modernized version of the original LawCraft project, maintaining the same visual design and user experience while upgrading to modern technologies.
