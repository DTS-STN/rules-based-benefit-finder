// first level is the key, second is the value of the key and third are the boolean flags to set
const conversionMap = {
  lost_job: {
    'lost-all-income': {
      income_status__has_lost_all_income: true,
    },
    'lost-some-income': {
      income_status__has_lost_some_income: true,
    },
    'lost-no-income': {
      income_status__has_lost_no_income: true,
    },
  },
  no_income: {
    lost_job: {
      income_status_reason__has_lost_job: true,
    },
    employer_closed: {
      income_status_reason__has_employer_closed: true,
    },
    'self-employed-closed': {
      income_status_reason__has_self_employee_with_no_income: true,
    },
    'unpaid-leave-to-care': {
      income_status_reason__has_unpaid_leave_to_care_for_child_or_sick: true,
    },
  },
  some_income: {
    'hours-reduced': {
      income_status_reason__has_hours_reduced: true,
    },
    'selfemployed-some-income': {
      income_status_reason__is_self_employed_some_income: true,
    },
    'employed-lost-a-job': {
      income_status_reason__employed_lost_a_job: true,
    },
    quarantine: {
      income_status_reason__is_quarantined: true,
      income_status_reason__has_unpaid_leave_to_care_for_child_or_sick: true,
    },
  },
  unchanged_income: {
    wfh: {
      working_from_home: true, // not flag for working from home
    },
    'paid-leave': { 
      // no flag for paid-leave
      on_paid_leave: true,
    },
    student_2019_2020: {
      is_student_2019_2020: true,
    },
    high_school_grad: {
      is_high_school_grad: true,
    },
  },
  mortgage_payments: {
    'yes-mortgage': {
      mortgage_deferral__has_mortgage_payments: true,
    },
    'yes-rent': {
      rent__has_need_for_rent_help: true,
    },
  },
  gross_income: {
    'over_5k': {
      income_status_reason__is_gross_income_over_5k: true,
    },
    '4999_or_less': {
      income_status_reason__is_gross_income_over_5k: false,
    },
  },
  student_debt: {
    yes: {
      student_loan__has_student_debt: true,
    },
  },
  plans_for_school: {
    yes: {
      student_financial_help__has_plan_for_school: true,
    },
  },
  oas: {
    yes: {
      has_oas: true,
    },
  },
  rrif: {
    yes: {
      riff__has_riff: true,
    },
  },
  ccb: {
    yes: {
      canada_child_benefit__yes_or_unsure: true,
    },
  },
  ei_workshare: {
    income_status__has_lost_some_income: true,
  },
}
module.exports = {
  conversionMap,
}
