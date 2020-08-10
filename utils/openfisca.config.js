// first level is the key, second is the value of the key and third are the boolean flags to set
const conversionMap = {
  lost_job: {
    'lost-all-income': {
      no_income: true,
    },
    'lost-some-income': {
      reduced_income: true,
    },
    'lost-no-income': {
      no_income_lost: true,
    },
  },
  no_income: {
    lost_job: {
      lost_all_employment: true,
    },
    employer_closed: {
      lost_all_employment: true,
    },
    'self-employed-closed': {
      self_employed: true,
    },
    'unpaid-leave-to-care': {
      on_familial_unpaid_leave: true,
    },
  },
  some_income: {
    'hours-reduced': {
      employment_hours_reduced: true,
    },
    'selfemployed-some-income': {
      self_employed: true,
    },
    'employed-lost-a-job': {
      lost_supplementary_employment: true,
    },
    retired: {
      retired: true,
      lost_supplementary_employment: true,
    },
    quarantine: {
      covid_quarantine: true,
      on_non_voluntary_unpaid_leave: true,
    },
  },
  unchanged_income: {
    wfh: {
      working_from_home: true,
    },
    'paid-leave': {
      on_paid_leave: true,
    },
    retired: {
      retired: true,
    },
    student_2019_20: {
      student_2019_2020: true,
    },
    high_school_grad: {
      high_school_grad: true,
    },
  },
  mortgage_payments: {
    'yes-mortgage': {
      home_owner: true,
      mortgage_payment_at_risk: true,
    },
    'yes-rent': {
      home_owner: false,
      rent_payment_at_risk: true,
    },
  },
  ccb: {
    yes: {
      child_benefit_recipient: true,
    },
  },
}

module.exports = {
  conversionMap,
}
