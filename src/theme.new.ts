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
        bg: '#0c0c0c',
        color: 'white',
        fontFamily: "'Montserrat', sans-serif",
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
      500: '#970fff', // Primary purple
      600: '#7817ff',
      700: '#5a0bd9',
      800: '#3d08a3',
      900: '#1f046d',
    },
    black: {
      50: '#f7f7f7',
      100: '#e3e3e3',
      200: '#c8c8c8',
      300: '#a4a4a4',
      400: '#818181',
      500: '#666666',
      600: '#515151',
      700: '#434343',
      800: '#383838',
      900: '#0c0c0c', // Primary black
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '700',
        textTransform: 'uppercase',
        borderRadius: '0',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.500',
            color: 'white',
          },
        },
      },
    },
  },
})

export default theme
