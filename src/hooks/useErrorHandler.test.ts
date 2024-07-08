import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useErrorHandler } from './useErrorHandler'

describe('useErrorHandler', () => {
  it('should initialize with null error', () => {
    const { result } = renderHook(() => useErrorHandler())
    expect(result.current.error).toBeNull()
  })

  it('should handle string error', () => {
    const { result } = renderHook(() => useErrorHandler())
    act(() => {
      result.current.handleError('Test error')
    })
    expect(result.current.error).toBe('"Test error"')
  })

  it('should handle Error object', () => {
    const { result } = renderHook(() => useErrorHandler())
    act(() => {
      result.current.handleError(new Error('Test error'))
    })
    expect(result.current.error).toBe('Test error')
  })

  it('should handle object with message', () => {
    const { result } = renderHook(() => useErrorHandler())
    act(() => {
      result.current.handleError({ message: 'Test error' })
    })
    expect(result.current.error).toBe('Test error')
  })

  it('should handle non-error object', () => {
    const { result } = renderHook(() => useErrorHandler())
    act(() => {
      result.current.handleError({ foo: 'bar' })
    })
    expect(result.current.error).toBe('{"foo":"bar"}')
  })

  it('should clear error', () => {
    const { result } = renderHook(() => useErrorHandler())
    act(() => {
      result.current.handleError('Test error')
    })
    expect(result.current.error).toBe('"Test error"')
    act(() => {
      result.current.clearError()
    })
    expect(result.current.error).toBeNull()
  })

  it('should handle errors thrown in fetch functions', async () => {
    const { result } = renderHook(() => useErrorHandler())
    const mockFetch = vi.fn().mockRejectedValue(new Error('Fetch error'))

    await act(async () => {
      try {
        await mockFetch()
      } catch (error) {
        result.current.handleError(error)
      }
    })

    expect(result.current.error).toBe('Fetch error')
  })
})