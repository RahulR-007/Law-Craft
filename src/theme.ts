import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: "'Montserrat', sans-serif",
    body: "'Montserrat', sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: 'linear-gradient(135deg, #0c0c0c 0%, #1a0a2e 50%, #16213e 100%)',
        color: 'white',
        fontFamily: "'Montserrat', sans-serif",
        minHeight: '100vh',
        backgroundAttachment: 'fixed',
      },
    },
  },
  colors: {
    brand: {
      50: '#f5e6ff',
      100: '#e1b3ff',
      200: '#cc80ff',
      300: '#b84dff',
      400: '#a31aff',
      500: '#970fff',
      600: '#7817ff',
      700: '#5a0bd9',
      800: '#3d08a3',
      900: '#1f046d',
    },
    glass: {
      light: 'rgba(255, 255, 255, 0.1)',
      medium: 'rgba(255, 255, 255, 0.15)',
      dark: 'rgba(0, 0, 0, 0.2)',
      purple: 'rgba(151, 15, 255, 0.15)',
      purpleBorder: 'rgba(151, 15, 255, 0.3)',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '700',
        borderRadius: 'xl',
        backdropFilter: 'blur(10px)',
        border: '1px solid',
        transition: 'all 0.3s ease',
      },
      variants: {
        solid: {
          bg: 'rgba(151, 15, 255, 0.8)',
          color: 'white',
          borderColor: 'rgba(151, 15, 255, 0.3)',
          boxShadow: '0 8px 20px rgba(151, 15, 255, 0.3)',
          _hover: {
            bg: 'rgba(151, 15, 255, 0.9)',
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 30px rgba(151, 15, 255, 0.4)',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
        outline: {
          bg: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)',
          _hover: {
            bg: 'rgba(255, 255, 255, 0.2)',
            borderColor: 'rgba(151, 15, 255, 0.5)',
          },
        },
        ghost: {
          bg: 'transparent',
          color: 'white',
          _hover: {
            bg: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 'xl',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          bg: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 'xl',
        },
        overlay: {
          bg: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            bg: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 'lg',
            color: 'white',
            _placeholder: {
              color: 'rgba(255, 255, 255, 0.6)',
            },
            _focus: {
              bg: 'rgba(255, 255, 255, 0.15)',
              borderColor: 'rgba(151, 15, 255, 0.8)',
              boxShadow: '0 0 0 2px rgba(151, 15, 255, 0.3)',
            },
            _hover: {
              bg: 'rgba(255, 255, 255, 0.15)',
            },
          },
        },
      },
      defaultProps: {
        variant: 'outline',
      },
    },
    Textarea: {
      variants: {
        outline: {
          bg: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 'lg',
          color: 'white',
          _placeholder: {
            color: 'rgba(255, 255, 255, 0.6)',
          },
          _focus: {
            bg: 'rgba(255, 255, 255, 0.15)',
            borderColor: 'rgba(151, 15, 255, 0.8)',
            boxShadow: '0 0 0 2px rgba(151, 15, 255, 0.3)',
          },
        },
      },
      defaultProps: {
        variant: 'outline',
      },
    },
  },
})

export default theme
