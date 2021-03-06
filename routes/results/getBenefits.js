const glob = require('glob')
const path = require('path')

// go through keys and push benefits which have a true key-value pair
const getBenefits = (data) => {
  const results = {}
  for(const entity in data){
    for (const key in data[entity]) {
      if (key.endsWith('_eligible')) {
        const benefit = key.split('__is_eligible')
        const valuesforBenefit = Object.values(data[entity][key])
        if (valuesforBenefit.length > 0 && valuesforBenefit[0] === true) {
          results[benefit[0]] = 1
        }
      }
    }
  }
  return Object.keys(results)
}

const getProvincialBenefits = (data) => {
  return data.province ? 'province-' + data.province : false
}

const getAllBenefits = (featureFlags) => {
  const benefitList = []

  let ignore
  if (featureFlags.enableDtc) {
    ignore = ['province-*', 'dtc_*.njk']
  } else {
    ignore = ['province-*', 'dtc*.njk']
  }

  // Get a list of all the benefit cards
  // Ignore provincial benefits and the dtc variants
  const files = glob.sync('**/*.njk', {
    cwd: path.join(__dirname, '../../views/benefits'),
    ignore,
  })

  // Grab the benefit name portion of the filename
  files.forEach((file) => {
    const fileParts = file.split('.')
    benefitList.push(fileParts[0])
  })

  // We just the unique items in the list
  const benefitsFullList = benefitList.filter(function (item, pos) {
    return benefitList.indexOf(item) === pos
  })

  return benefitsFullList
}

module.exports = {
  getBenefits,
  getProvincialBenefits,
  getAllBenefits,
}
