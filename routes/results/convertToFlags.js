// add date time for each of the options
function convertToFlags(data, flagMap) {
  const dateString = new Date(Date.now())
    .toISOString()
    .split('T')[0]

  if (data && typeof data === 'object') {
    return Object.keys(data).reduce(
      (obj, item) => {
        if (flagMap[item]) {
          const flagMapSection = flagMap[item]
          // value map is defined
          if (flagMapSection[data[item]]) {
            const flags = {}

            for (const i in flagMapSection[data[item]]) {
              flags[i] = {
                [dateString]: flagMapSection[data[item]][i],
              }
            }

            return {
              ...obj,
              ...flags,
            }
          }
        }
        // not present in flag map just put in object
        else {
          return {
            ...obj,
            [item]: {
              [dateString]: data[item],
            },
          }
        }

        return obj
      },
      {
        cerb_eligible: {
          [dateString]: null,
        },
        cesb_eligible: {
          [dateString]: null,
        },
        ei_workshare_eligible: {
          [dateString]: null,
        },
        mortgage_deferral_eligible: {
          [dateString]: null,
        },
        rent_help_eligible: {
          [dateString]: null,
        },
        student_loan_eligible: {
          [dateString]: null,
        },
        ccb_payment_eligible: {
          [dateString]: null,
        },
        oas_eligible: {
          [dateString]: null,
        },
        dtc_oas_eligible: {
          [dateString]: null,
        },
        dtc_individual_eligible: {
          [dateString]: null,
        },
        dtc_child_eligible: {
          [dateString]: null,
        },
        rrif_eligible: {
          [dateString]: null,
        },
        student_financial_aid_eligible: {
          [dateString]: null,
        },
      },
    )
  }
}

module.exports = {
  convertToFlags,
}
