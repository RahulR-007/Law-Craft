import React from 'react'
import { Box, Container, ContainerProps } from '@chakra-ui/react'
import { spacing } from '../utils/responsive'

type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'

interface ResponsiveContainerProps extends ContainerProps {
  children: React.ReactNode
  variant?: 'page' | 'section' | 'card'
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  variant = 'page',
  ...props
}) => {
  const getContainerProps = () => {
    switch (variant) {
      case 'section':
        return {
          maxW: { base: '95%', md: '90%', lg: '85%' },
          px: spacing.mobile.padding,
          py: spacing.mobile.margin,
        }
      case 'card':
        return {
          maxW: { base: '100%', md: '2xl', lg: '4xl' },
          px: spacing.mobile.padding,
          py: { base: 4, md: 6 },
        }
      default: // page
        return {
          maxW: { base: '95%', md: '90%', lg: '80%', xl: '6xl' },
          px: spacing.mobile.padding,
          pt: spacing.container.padding,
          pb: { base: 8, md: 12 },
        }
    }
  }

  return (
    <Container {...getContainerProps()} {...props}>
      {children}
    </Container>
  )
}

interface ResponsiveStackProps {
  children: React.ReactNode
  direction?: 'column' | 'row' | 'stack' | 'reverse'
  stackSpacing?: any
  align?: any
  justify?: any
  wrap?: boolean
  [key: string]: any
}

export const ResponsiveStack: React.FC<ResponsiveStackProps> = ({
  children,
  direction = 'stack',
  stackSpacing = spacing.mobile.gap,
  ...props
}) => {
  const getDirection = (): FlexDirection | { base: FlexDirection; md: FlexDirection } => {
    switch (direction) {
      case 'stack':
        return { base: 'column', md: 'row' }
      case 'reverse':
        return { base: 'column-reverse', md: 'row-reverse' }
      default:
        return direction as FlexDirection
    }
  }

  return (
    <Box
      display="flex"
      flexDirection={getDirection()}
      gap={stackSpacing}
      {...props}
    >
      {children}
    </Box>
  )
}

export default ResponsiveContainer
