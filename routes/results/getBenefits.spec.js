const { getProvincialBenefits } = require('./getBenefits')

describe('Test the getBenefits calculator', () => {
  test('It checks provincial benefits', () => {
    const provinces = [
      'ab',
      'bc',
      'mb',
      'nb',
      'nl',
      'ns',
      'nt',
      'nu',
      'on',
      'pe',
      'qc',
      'sk',
      'yt',
    ]

    provinces.forEach((province) => {
      const result = getProvincialBenefits({
        province: province,
      })

      expect(result).toContain('province-' + province)
    })
  })
})
