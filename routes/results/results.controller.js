const {
  routeUtils,
  simpleRoute,
  getSessionData,
  conversionMap,
} = require('./../../utils')
require('node-fetch')
const { Schema } = require('./schema.js')
const {
  getBenefits,
  getProvincialBenefits,
  getAllBenefits,
} = require('./getBenefits')
const { convertToFlags } = require('./convertToFlags')
require('cross-fetch/polyfill')
const _ = require('lodash')
const testData = require('../../cypress/fixtures/calculate.json')

const getData = (req, res) => {
  /**
   * If there's querystring data use it,
   * otherwise get it from the session.
   */
  if (req.query === undefined || _.isEmpty(req.query)) {
    return getSessionData(req)
  }
  try {
    return JSON.parse(Buffer.from(req.query.q, 'base64').toString())
  } catch (err) {
    res.locals.log(
      `Thrown error: ${JSON.stringify(
        err,
      )} Invalid QueryString ${JSON.stringify(req.query)}`,
      )
      return {}
    }
  }
  
  const render = (req, res, name, viewData, resData) => {
    // get All Benefits (except provinces and GST)
    if (resData) {
    const benefitsFullList = _.pull(
      getAllBenefits(req.locals.featureFlags),
      'gst_credit',
    )

    const benefits = getBenefits(resData.persons.person)

    let unavailableBenefits = benefitsFullList.filter(
      (benefit) => !benefits.includes(benefit),
    )

    // We need to remove DTC if the user matches one of the variants
    if (benefits.find((ele) => ele.match(/^dtc_*/)) !== undefined) {
      unavailableBenefits = unavailableBenefits.filter(
        (ele) => ele !== 'dtc',
      )
    }

    const provincial = getProvincialBenefits(viewData)

    let title = res.__n('results_title', benefits.length)

    if (benefits.length === 0) {
      title = res.__('results_title_no_results')
    }

    res.render(
      name,
      routeUtils.getViewData(req, {
        benefits: benefits,
        unavailableBenefits: unavailableBenefits,
        provincial: provincial,
        no_results: benefits.length === 0,
        title: title,
        data: viewData,
      }),
    )
  }
}

module.exports = (app, route) => {
  const name = route.name

  route
    .draw(app)
    .get((req, res) => {
      res.locals.simpleRoute = (name, locale) => simpleRoute(name, locale)
      const data = getData(req, res)
      const dataFlags = convertToFlags(data, conversionMap)
      const requestBody = {
        persons: {
          person: dataFlags,
        },
      }

      if(process.env.NODE_ENV === 'test') {
        render(req, res, name, data, testData)
      } else {
        /* eslint-disable no-undef */
        return fetch(process.env.OPEN_FISCA_ENDPOINT + '/calculate', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((fiscaRes) => {
            if (fiscaRes.ok) {
              return fiscaRes.json()
            } else {
              console.log(fiscaRes)
              res.status(500)
              res.render('500', {
                message: 'OpenFisca returned a bad response',
              })
            }
          })
          .then((jsonData) => {
            render(req, res, name, data, jsonData)
          })
          .catch(() => {
            res.status(500)
            res.render('500', {
              message: 'OpenFisca returned a bad response',
            })
          })
      }
    })
    .post(route.applySchema(Schema), route.doRedirect())
}
