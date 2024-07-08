import { it, expect, describe } from 'vitest'
import { getValidationErrors } from './helpers'

describe('validation', () => {
  it('should return no validation errors for valid module data', () => {
    const mockData = {
      name: "Data Name",
      description: "Description",
      targetTemperature: 20
    }
    const errors = getValidationErrors(mockData)
    
    expect(errors).toHaveLength(0)
  })

  it('should return validation errors for invalid module data', () => {
    const mockData = {
      name: "",
      description: "",
      targetTemperature: 50
    }
    const errors = getValidationErrors(mockData)

    expect(errors).toHaveLength(3)
  })
})