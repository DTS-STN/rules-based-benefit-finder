const { routeUtils } = require('../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, {
        title: res.__('cerb-new.title'),
      }))
    })
    .post(route.applySchema(Schema), postExhaustedCerb)
}

const postExhaustedCerb = (req, res) => {
  // validator should catch if it's not 1, or 2
  // if (req.body.cerb_exhausted === 'receiving-cerb') {
  //   return res.redirect(res.locals.routePath('question-canada-child-benefit'))
  // }

  // default no matter the answer 
  return res.redirect(res.locals.routePath('question-ccb'))

}
