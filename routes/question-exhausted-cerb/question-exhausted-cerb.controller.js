const { routeUtils } = require('../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, {
        title: res.__('cerb_new.title'),
      }))
    })
    .post(route.applySchema(Schema), postExhaustedCerb)
}

const postExhaustedCerb = (req, res) => {
  // validator should catch if it's not 1, or 2
  // if (req.body.cerb_exhausted === 'receiving-cerb') {
  //   return res.redirect(res.locals.routePath('question-canada-child-benefit'))
  // }

  // default according to the LIVE website we are redirecting to mortgage instead of CCB
  return res.redirect(res.locals.routePath('question-mortgage-payments'))

  // default according to the new flow postCERB.
  // return res.redirect(res.locals.routePath('question-ccb'))

}
