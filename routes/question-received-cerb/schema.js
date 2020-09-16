/* istanbul ignore file */

const Schema = {
  cerb_received: {
    isIn: {
      errorMessage: 'errors.multipleChoiceGeneric',
      options: [['receiving-cerb', 'not-receiving-cerb']],
    },
  },
}

module.exports = {
  Schema,
}
