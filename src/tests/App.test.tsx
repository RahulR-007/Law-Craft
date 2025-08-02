import { describe, it, expect } from 'vitest'

describe('Application Tests', () => {
    it('should run basic math test', () => {
        expect(1 + 1).toBe(2)
    })

    it('should verify testing setup works', () => {
        const mockFunction = () => 'test'
        expect(mockFunction()).toBe('test')
    })
})

describe('Environment Tests', () => {
    it('should have access to global objects', () => {
        expect(typeof window).toBe('object')
        expect(typeof document).toBe('object')
    })

    it('should mock ResizeObserver', () => {
        expect(global.ResizeObserver).toBeDefined()
        const observer = new ResizeObserver(() => { })
        expect(observer).toBeDefined()
    })
})
