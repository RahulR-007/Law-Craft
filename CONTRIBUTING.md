# Contributing to LawCraft

Thank you for considering contributing to LawCraft! We welcome contributions from the community.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git
- Supabase account (for backend features)

### Setup Development Environment

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/lawcraft.git
   cd lawcraft
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing code formatting (Prettier/ESLint)
- Use functional components with hooks
- Write descriptive commit messages

### Component Structure
```typescript
// Example component structure
import React from 'react'
import { Box, Text } from '@chakra-ui/react'

interface ComponentProps {
  title: string
  children?: React.ReactNode
}

export const Component: React.FC<ComponentProps> = ({ title, children }) => {
  return (
    <Box>
      <Text>{title}</Text>
      {children}
    </Box>
  )
}
```

### File Naming
- Components: `PascalCase.tsx`
- Pages: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Types: `types.ts` or inline interfaces

## 🐛 Bug Reports

When filing a bug report, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/OS information

## ✨ Feature Requests

For new features:
- Describe the feature and its benefits
- Provide use cases
- Consider implementation complexity
- Check if similar features exist

## 🔄 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow coding standards
   - Add tests if applicable
   - Update documentation

3. **Test your changes**
   ```bash
   npm run lint
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing new feature"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Message Format
```
type(scope): description

feat: add new feature
fix: resolve bug
docs: update documentation
style: code formatting
refactor: code restructuring
test: add tests
chore: maintenance tasks
```

## 🏗️ Project Architecture

### Frontend Structure
```
src/
├── components/     # Reusable UI components
├── contexts/      # React contexts
├── pages/         # Page components
├── lib/           # Utilities and configurations
├── types/         # TypeScript type definitions
└── theme/         # Chakra UI theme
```

### Key Technologies
- **React 18**: Component library
- **TypeScript**: Type safety
- **Chakra UI**: UI components
- **Supabase**: Backend services
- **Vite**: Build tool

## 🧪 Testing

### Running Tests
```bash
npm test                # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

### Writing Tests
- Unit tests for utilities
- Component tests for UI
- Integration tests for features

## 📚 Documentation

When adding features:
- Update README.md if needed
- Add inline code comments
- Update TypeScript interfaces
- Include usage examples

## 🎯 Areas for Contribution

### High Priority
- AI document generation improvements
- Payment integration (Razorpay/Stripe)
- Mobile responsiveness enhancements
- Performance optimizations

### Medium Priority
- Additional document templates
- User dashboard features
- Admin panel
- Email notifications

### Low Priority
- UI/UX improvements
- Code refactoring
- Documentation updates
- Test coverage

## 🚫 What Not to Contribute

- Breaking changes without discussion
- Large refactors without approval
- Features that don't align with project goals
- Code that doesn't follow established patterns

## 📞 Getting Help

- 📧 Email: dev@lawcraft.com
- 💬 Discord: [Join our dev community](#)
- 📖 Docs: Check existing documentation
- 🐛 Issues: Search existing GitHub issues

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make LawCraft better! 🎉
