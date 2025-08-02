# 🏛️ LawCraft

A modern, AI-powered legal document generator built with React, TypeScript, and Supabase.

![LawCraft](https://img.shields.io/badge/LawCraft-Legal%20Document%20Generator-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-green?style=flat-square)

## ✨ Features

- **🔐 Secure Authentication**: Email-based authentication with Supabase
- **📄 Document Generation**: AI-powered legal document creation (Contracts, NDAs, Loan Agreements)
- **💎 Subscription Plans**: Multiple pricing tiers (Free, Basic ₹29, Premium ₹49)
- **🎨 Modern UI**: Beautiful, responsive design with Chakra UI and glass morphism effects
- **⚡ High Performance**: Built with Vite for optimal speed and performance
- **📱 Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Chakra UI + Framer Motion
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Emotion + CSS-in-JS
- **Icons**: React Icons

## 📦 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lawcraft.git
   cd lawcraft
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (AuthContext)
├── pages/              # Page components
│   ├── Auth.tsx        # Authentication page
│   ├── Dashboard.tsx   # User dashboard
│   ├── Landing.tsx     # Home page
│   ├── Pricing.tsx     # Subscription plans
│   └── DocumentGenerator.tsx # Document creation
├── lib/                # Utilities (Supabase client)
├── themes/             # Chakra UI theme configuration
└── main.tsx           # Application entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Pages

### 🏠 Landing Page (`/`)
- Hero section with call-to-action
- Features overview
- Pricing plans preview
- Contact information

### 🔐 Authentication (`/auth`)
- Email-based registration
- Secure login system
- Password validation
- Supabase integration

### 📊 Dashboard (`/dashboard`)
- User profile management
- Plan and token information
- Quick navigation
- Account settings

### 📄 Document Generator (`/generate`)
- Multiple document types
- Form-based input
- AI-powered generation
- Download functionality

### � Pricing (`/pricing`)
- Three subscription tiers
- Feature comparison
- Payment simulation
- Plan upgrade options

## 🎨 Design System

### Color Palette
- **Primary**: `#970fff` (Purple)
- **Background**: `#0c0c0c` (Black)
- **Secondary**: `#7817ff` (Light Purple)
- **Text**: `#ffffff` (White)
- **Glass**: Rgba overlays with backdrop blur

### Typography
- **Headings**: Inter/System fonts
- **Body**: Clean, readable typography
- **Monospace**: For code elements

## 🔐 Authentication Flow

1. **User Registration**
   - Email + Password + Full Name
   - Supabase Auth creates user
   - User metadata stored (plan, tokens)

2. **User Login**
   - Email + Password authentication
   - JWT token management
   - Persistent sessions

3. **User Data Structure**
   ```typescript
   user: {
     id: string
     email: string
     user_metadata: {
       fullname: string
       plan_name: 'Free' | 'Basic' | 'Premium'
       tokens: number
     }
   }
   ```

## 💳 Subscription Plans

| Plan | Price | Documents | Features |
|------|-------|-----------|----------|
| **Free** | ₹0 | 2/month | Basic templates, Email support |
| **Basic** | ₹29 | 20/month | All templates, Priority support |
| **Premium** | ₹49 | Unlimited | AI assistance, Custom templates |

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload `dist/` folder to Netlify
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 Environment Variables

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Optional: API Keys for AI features
VITE_COHERE_API_URL=https://api.cohere.ai/v1/generate
```

## 🐛 Known Issues

- Payment integration is currently in demo mode
- AI document generation uses mock data
- Some features require Supabase project setup

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for backend infrastructure
- [Chakra UI](https://chakra-ui.com) for component library
- [Framer Motion](https://framer.com/motion) for animations
- [React Icons](https://react-icons.github.io/react-icons) for iconography

## 📞 Support

- 📧 Email: support@lawcraft.com
- 💬 Discord: [Join our community](#)
- 📖 Docs: [Documentation](#)

---

⭐ **Star this repository if you find it helpful!**

Made with ❤️ by [Your Name](https://github.com/yourusername)

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
