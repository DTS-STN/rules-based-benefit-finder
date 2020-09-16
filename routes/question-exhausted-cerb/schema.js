/* istanbul ignore file */

const Schema = {
  cerb_exhausted: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['exhausted-cerb', 'almost-cerb', 'not-exhausted-cerb']],
    },
  },
}

module.exports = {
  Schema,
}
