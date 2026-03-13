// Responsive utility constants and helpers
export const breakpoints = {
  base: '0em',    // 0px
  sm: '30em',     // 480px
  md: '48em',     // 768px
  lg: '62em',     // 992px
  xl: '80em',     // 1280px
  '2xl': '96em',  // 1536px
}

export const spacing = {
  mobile: {
    padding: { base: 4, md: 8 },
    margin: { base: 4, md: 8 },
    gap: { base: 4, md: 6 },
  },
  container: {
    padding: { base: '60px', md: '80px' },
    maxWidth: { base: '95%', md: '90%', lg: '80%' },
  },
  navigation: {
    height: { base: '60px', md: '80px' },
    spacing: { base: 2, md: 4 },
  }
}

export const typography = {
  heading: {
    hero: { base: '2xl', md: '4xl', lg: '6xl' },
    section: { base: 'xl', md: '2xl', lg: '3xl' },
    card: { base: 'md', md: 'lg', lg: 'xl' },
  },
  text: {
    body: { base: 'sm', md: 'md', lg: 'lg' },
    caption: { base: 'xs', md: 'sm' },
  },
  button: {
    size: { base: 'md', md: 'lg' },
    padding: { base: 4, md: 6, lg: 8 },
  }
}

export const layout = {
  grid: {
    columns: {
      cards: { base: 1, md: 2, lg: 3 },
      features: { base: 1, md: 2, xl: 3 },
      pricing: { base: 1, lg: 3 },
    }
  },
  flex: {
    direction: {
      stack: { base: 'column', md: 'row' },
      reverse: { base: 'column-reverse', md: 'row' },
    }
  }
}

// Mobile-first media queries for CSS-in-JS
export const mediaQueries = {
  mobile: '@media (max-width: 767px)',
  tablet: '@media (min-width: 768px) and (max-width: 1023px)',
  desktop: '@media (min-width: 1024px)',
  touch: '@media (hover: none) and (pointer: coarse)',
}
