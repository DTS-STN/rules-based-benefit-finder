const conversionMap = {
  entities:{
    // entities with the fields to calculate (i.e. those that are set to null)
    person: [
      "cerb__is_eligible",
      "cesb__is_eligible",
      "ei_workshare__is_eligible",
      "mortgage_deferral__is_eligible",
      "rent__is_eligible",
      "student_loan__is_eligible",
      "oas__is_eligible",
      "dtc__is_eligible_for_dtc_and_oas",
      "dtc__is_eligible",
      "student_financial_help__is_eligible",
      "riff__is_eligible",
    ],
    child: [
      "dtc__is_eligible",
    ],
  },
  families: {
    // how entities are combined
    "f1": {
      entities: ["person", "child"],
      data: {
        "parents": ["person"],
        "children": ["child"],
      },
    },
  },
  flags: {
    // flags conversion for entities
    lost_job: {
      person: {
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
    },
    no_income: {
      person: {
        lost_job: {
          income_status_reason__has_lost_job: true,
        },
        employer_closed: {
          income_status_reason__has_employer_closed: true,
        },
        'self-employed-closed': {
          income_status_reason__is_self_employed: true,
        },
        'unpaid-leave-to-care': {
          income_status_reason__has_unpaid_leave_to_care_for_child_or_sick: true,
        },
        "sick-or-quarantied": {
          income_status_reason__is_quarantined: true,
        },
        "parental-recently-cant-return": {
          income_status_reason__has_parental_recently_cant_return_to_work: true,
        },
        student_2019_20:{
          cesb__is_student_2019_2020: true,
        },
        "ei-recently-claim-ended": {
          income_status_reason__has_ei_recent_claim_ended: true,
        },
      },
    },
    some_income: {
      person: {
        'hours-reduced': {
          income_status_reason__has_hours_reduced: true,
        },
        'employed-lost-a-job': {
          income_status_reason__employed_lost_a_job: true,
        },
        quarantine: {
          income_status_reason__is_quarantined: true,
        },
      },
    },
    unchanged_income: {
      person:{
        student_2019_20: {
          cesb__is_student_2019_2020: true,
        },
        high_school_grad: {
          cesb__is_student_2020_2021: true,
        },
      },
    },
    reduced_income: {
      person: {
        "1000_or_less": {
          income_status_reason__has_1000_or_less: true,
        },
        "1001_or_more": {
          income_status_reason__has_1001_or_more: true,
        },
      },
    },
    mortgage_payments: {
      person: {
        'yes-mortgage': {
          mortgage_deferral__has_mortgage_payments: true,
        },
        'yes-rent': {
          rent__has_need_for_rent_help: true,
        },
      },
    },
    gross_income: {
      person: {
        'over_5k': {
          income_status_reason__is_gross_income_over_5k: true,
        },
      },
    },
    student_debt: {
      person:{
        yes: {
          student_loan__has_student_debt: true,
        },
      },
    },
    plans_for_school: {
      person: {
        yes: {
          student_financial_help__has_plan_for_school: true,
        },
      },
    },
    oas: {
      person: {
        oas: {
          has_oas: true,
        },
        allowance: {
          has_allowance: true,
        },
        survivor: {
          has_allowance_for_survivor: true,
        },
      },
    },
    dtc_individual: {
      person:{
        yes: {
          dtc__has_documented_disability: true,
        },
      },
    },
    dtc_child: {
      child: {
        yes: {
          dtc__has_documented_disability: true,
        },
      },
    },
    rrif: {
      person: {
        yes: {
          riff__has_riff: true,
        },
      },
    },
    ccb: {
      person: {
        yes: {
          canada_child_benefit__yes_or_unsure: true,
        },
      },
    },
  },

}
module.exports = {
  conversionMap,
}
