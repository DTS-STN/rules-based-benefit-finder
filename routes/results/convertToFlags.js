// add date time for each of the options
function convertToFlags(data, flagMap) {
  const dateString = new Date(Date.now())
    .toISOString()
    .slice(0, 7)

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
        cerb__is_eligible: {
          [dateString]: null,
        },
        cesb__is_eligible: {
          [dateString]: null,
        },
        ei_workshare__is_eligible: {
          [dateString]: null,
        },
        mortgage_deferral__is_eligible: {
          [dateString]: null,
        },
        rent__is_eligible: {
          [dateString]: null,
        },
        student_loan__is_eligible: {
          [dateString]: null,
        },
        oas__is_eligible: {
          [dateString]: null,
        },
        dtc__is_eligible_for_dtc_and_oas: {
          [dateString]: null,
        },
        dtc__is_eligible: {
          [dateString]: null,
        },
        student_financial_help__is_eligible: {
          [dateString]: null,
        },
      },
    )
  }
}

module.exports = {
  convertToFlags,
}
