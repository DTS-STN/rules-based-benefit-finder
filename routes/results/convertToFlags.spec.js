const { convertToFlags } = require('./convertToFlags')

describe('Test the convertToFlag data converter', () => {
  let datetimeSpy
  beforeEach(() => {
    datetimeSpy = jest.spyOn(Date, 'now')
    datetimeSpy.mockImplementation(() => {
      return 1597072777042
    })
  })

  test('It converts data to flags according to the definition', () => {
    const converterMap = {
      some_question_key: {
        'some-defined-answer': {
          some: true,
          nice: true,
          flags: true,
        },
      },
      some_other_question: {
        'some-answer-not-answered': {
          not_included: true,
        },
      },
    }

    const data = {
      some_question_key: 'some-defined-answer',
      some_other_question: 'not-included',
      another_question: 'hello',
    }

    const result = convertToFlags(data, converterMap)
    expect(result).toEqual({
      some: {
        '2020-08-10': true,
      },
      nice: {
        '2020-08-10': true,
      },
      flags: {
        '2020-08-10': true,
      },
      another_question: {
        '2020-08-10': 'hello',
      },
      cerb_eligible: {
        '2020-08-10': null,
      },
      cesb_eligible: {
        '2020-08-10': null,
      },
      ei_workshare_eligible: {
        '2020-08-10': null,
      },
      mortgage_deferral_eligible: {
        '2020-08-10': null,
      },
      rent_help_eligible: {
        '2020-08-10': null,
      },
      student_loan_eligible: {
        '2020-08-10': null,
      },
      ccb_payment_eligible: {
        '2020-08-10': null,
      },
      oas_eligible: {
        '2020-08-10': null,
      },
      dtc_oas_eligible: {
        '2020-08-10': null,
      },
      dtc_individual_eligible: {
        '2020-08-10': null,
      },
      dtc_child_eligible: {
        '2020-08-10': null,
      },
      rrif_eligible: {
        '2020-08-10': null,
      },
      student_financial_aid_eligible: {
        '2020-08-10': null,
      },
    })
  })

  afterEach(() => {
    datetimeSpy.mockRestore()
  })
})
