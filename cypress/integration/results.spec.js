const route = (name, lang) => require('../../utils/route.helpers').simpleRoute(name, lang, true);

/* eslint-disable no-undef */
describe('Result Page Only tests', () => {
  ['en', 'fr'].forEach((lang) => {
    describe('Language: ' + lang, () => {

      beforeEach(() => {
        process.env.COOKIE_SECRET = 'result'
      })

      it('should display an error when navigating directly to results page', () => {
        cy.visit(route('results', lang), {failOnStatusCode: false})
        cy.get('.error').should('be.visible')  
        cy.reportA11y()
      })
// currently open fisca returns a bad response if you send no request
      it.skip('should display GST Benefit no matter what', () => {
        cy.visit(route('results', lang), {failOnStatusCode: false})
        cy.get('#gst_credit')
        cy.reportA11y()
      })
    })
  })
})

function provinceLookup(key, locale){
  return {
    'on': {'en': 'Ontario', 'fr': 'Ontario'},
  }[key][locale];
}
describe('Paths and Benefits', () => {
  ['en', 'fr'].forEach((lang) => {
    describe('Language: ' + lang, () => {

      beforeEach(() => {
        process.env.COOKIE_SECRET = 'paths'
        cy.visit('/' + lang)
        cy.reportA11y()
        cy.get('[data-cy=start]').click()
      })

      it('EI Sickness CERB, Mortgage, Student Loans, CCB', () => {
        cy.answerInput('#province-select',provinceLookup('on',lang))
        cy.answerRB('#lost_joblost-all-income')
        cy.answerRB('#no_incomesick-or-quarantined')
        cy.answerRB('#cerb_receivedreceiving-cerb')
        cy.answerRB('#cerb_exhaustednot-exhausted-cerb')
        cy.answerRB('#mortgage_paymentsyes-mortgage')
        cy.answerRB('#ccbyes')
        cy.answerRB('#student_debtyes')
        cy.answerRB('#plans_for_schoolno')
        cy.answerRB('#oasno')
        cy.answerRB('#dtcno')
        cy.reportA11y()
        cy.get('[data-cy=eligible-benefit-list]').children().should('have.length', '5')
        cy.get('#cerb')
        cy.get('#mortgage_deferral')
        cy.get('#student_loan')
        cy.get('#ccb_payment')
      })

      it('CERB', () => {
        cy.answerInput('#province-select',provinceLookup('on',lang))
        cy.answerRB('#lost_joblost-all-income')
        cy.answerRB('#no_incomeself-employed-closed')
        cy.answerRB('#cerb_receivedreceiving-cerb')
        cy.answerRB('#cerb_exhaustednot-exhausted-cerb')
        cy.answerRB('#mortgage_paymentsno')
        cy.answerRB('#ccbno')
        cy.answerRB('#student_debtno')
        cy.answerRB('#plans_for_schoolno')
        cy.answerRB('#oasno')
        cy.answerRB('#dtcno')
        cy.reportA11y()
        cy.get('[data-cy=eligible-benefit-list]').children().should('have.length', '2')
        cy.get('#cerb')
      })

      it('EI Regular Cerb', () => {
        cy.answerInput('#province-select',provinceLookup('on',lang))
        cy.answerRB('#lost_joblost-some-income')
        cy.answerRB('#some_incomehours-reduced')
        cy.answerRB('#reduced_income1000_or_less')
        cy.answerRB('#cerb_receivedreceiving-cerb')
        cy.answerRB('#cerb_exhaustednot-exhausted-cerb')
        cy.answerRB('#mortgage_paymentsno')
        cy.answerRB('#ccbno')
        cy.answerRB('#student_debtno')
        cy.answerRB('#plans_for_schoolno')
        cy.answerRB('#oasno')
        cy.answerRB('#dtcno')
        cy.reportA11y()
        cy.get('[data-cy=eligible-benefit-list]').children().should('have.length', '3')
        cy.get('#cerb')
      })

      it('RRIF', () => {
        cy.answerInput('#province-select',provinceLookup('on',lang))
        cy.answerRB('#lost_joblost-some-income')
        cy.answerRB('#some_incomeretired')
        cy.answerRB('#gross_income4999_or_less')
        cy.answerRB('#rrifyes')
        cy.answerRB('#cerb_receivedreceiving-cerb')
        cy.answerRB('#cerb_exhaustedexhausted-cerb')
        cy.answerRB('#mortgage_paymentsno')
        cy.answerRB('#ccbno')
        cy.answerRB('#student_debtno')
        cy.answerRB('#plans_for_schoolno')
        cy.answerRB('#oasno')
        cy.answerRB('#dtcno')
        cy.reportA11y()
        cy.get('[data-cy=eligible-benefit-list]').children().should('have.length', '1')
        cy.get('#rrif')
      })

      it('OAS', () => {
        cy.answerInput('#province-select',provinceLookup('on',lang))
        cy.answerRB('#lost_joblost-some-income')
        cy.answerRB('#some_incomeretired')
        cy.answerRB('#gross_income4999_or_less')
        cy.answerRB('#rrifno')
        cy.answerRB('#cerb_receivedreceiving-cerb')
        cy.answerRB('#cerb_exhaustedexhausted-cerb')
        cy.answerRB('#mortgage_paymentsno')
        cy.answerRB('#ccbno')
        cy.answerRB('#student_debtno')
        cy.answerRB('#plans_for_schoolno')
        cy.answerRB('#oasoas')
        cy.answerRB('#dtcno')
        cy.reportA11y()
        cy.get('[data-cy=eligible-benefit-list]').children().should('have.length', '1')
      })

      it('Rent Help, Student Financial Aid', () => {
        cy.answerInput('#province-select',provinceLookup('on',lang))
        cy.answerRB('#lost_joblost-no-income')
        cy.answerRB('#unchanged_incomestudent_2019_20')
        cy.answerRB('#mortgage_paymentsyes-rent')
        cy.answerRB('#ccbno')
        cy.answerRB('#student_debtno')
        cy.answerRB('#plans_for_schoolyes')
        cy.answerRB('#oasno')
        cy.answerRB('#dtcno')
        cy.reportA11y()
        cy.get('[data-cy=eligible-benefit-list]').children().should('have.length', '2')
        cy.get('#rent_help')
        cy.get('#cesb')
        cy.get('#student_financial_aid')
      })

      it('dtc-alone', () => {
        cy.answerInput('#province-select',provinceLookup('on',lang))
        cy.answerRB('#lost_joblost-no-income')
        cy.answerRB('#unchanged_incomenone-of-the-above')
        cy.answerRB('#mortgage_paymentsno')
        cy.answerRB('#ccbno')
        cy.answerRB('#student_debtno')
        cy.answerRB('#plans_for_schoolno')
        cy.answerRB('#oasno')
        cy.answerRB('#dtcyourself')
        cy.answerRB('#dtc_individualyes')
        cy.get('[data-cy=eligible-benefit-list]').children().should('have.length', '1')
      })

      it('dtc-child', () => {
        cy.answerInput('#province-select',provinceLookup('on',lang))
        cy.answerRB('#lost_joblost-no-income')
        cy.answerRB('#unchanged_incomenone-of-the-above')
        cy.answerRB('#mortgage_paymentsno')
        cy.answerRB('#ccbno')
        cy.answerRB('#student_debtno')
        cy.answerRB('#plans_for_schoolno')
        cy.answerRB('#oasno')
        cy.answerRB('#dtcchild')
        cy.answerRB('#dtc_childyes')
        cy.get('[data-cy=eligible-benefit-list]').children().should('have.length', '1')
      })

      it('dtc-apply-individual', () => {
        cy.answerInput('#province-select',provinceLookup('on',lang))
        cy.answerRB('#lost_joblost-no-income')
        cy.answerRB('#unchanged_incomenone-of-the-above')
        cy.answerRB('#mortgage_paymentsno')
        cy.answerRB('#ccbno')
        cy.answerRB('#student_debtno')
        cy.answerRB('#plans_for_schoolno')
        cy.answerRB('#oasno')
        cy.answerRB('#dtcyourself')
        cy.answerRB('#dtc_individualno')
        cy.get('[data-cy=eligible-benefit-list]').children().should('have.length', '1')
      })

      it('dtc-apply-child', () => {
        cy.answerInput('#province-select',provinceLookup('on',lang))
        cy.answerRB('#lost_joblost-no-income')
        cy.answerRB('#unchanged_incomenone-of-the-above')
        cy.answerRB('#mortgage_paymentsno')
        cy.answerRB('#ccbno')
        cy.answerRB('#student_debtno')
        cy.answerRB('#plans_for_schoolno')
        cy.answerRB('#oasno')
        cy.answerRB('#dtcchild')
        cy.answerRB('#dtc_childno')
        cy.get('[data-cy=eligible-benefit-list]').children().should('have.length', '1')
      })

      it('dtc-oas', () => {
        cy.answerInput('#province-select',provinceLookup('on',lang))
        cy.answerRB('#lost_joblost-no-income')
        cy.answerRB('#unchanged_incomenone-of-the-above')
        cy.answerRB('#mortgage_paymentsno')
        cy.answerRB('#ccbno')
        cy.answerRB('#student_debtno')
        cy.answerRB('#plans_for_schoolno')
        cy.answerRB('#oasoas')
        cy.answerRB('#dtcyourself')
        cy.answerRB('#dtc_individualyes')
        cy.get('[data-cy=eligible-benefit-list]').children().should('have.length', '2')
      })
    })
  })
})
