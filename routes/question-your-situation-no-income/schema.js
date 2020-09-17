/* istanbul ignore file */

const Schema = {
  no_income: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [[
        'lost-job','employer-closed','self-employed-closed',
        'unpaid-leave-to-care',
        'sick-or-quarantined', 'parental-recently-cant-return',
        'school-closed',
        'ei-recently-claim-ended',
        'none-of-the-above',
      ]],
    },
  },
}

module.exports = {
  Schema,
}