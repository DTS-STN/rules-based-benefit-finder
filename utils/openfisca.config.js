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
    retired: { // No Flag for retired
      retired: true,
      lost_supplementary_employment: true,
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
    'paid-leave': { //no flag for paid-leave
      on_paid_leave: true,
    },
    retired: { //No flag for retired
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
      mortgage_deferral__has_mortgage_payments: true,
    },
    'yes-rent': {
      rent__has_need_for_rent_help: true,
    },
  },
  ccb: {
    yes: {
      canada_child_benefit__yes_or_unsure: true,
    },
  },
}
ei_workshare
module.exports = {
  conversionMap,
}
