const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, {
        title: res.__('cerb_new.title'),
      }))
    })
    .post(route.applySchema(Schema), postReceivedCerb)
}

const postReceivedCerb = (req, res) => {
  // validator should catch if it's not 1,2, or 3
  if (req.body.cerb_received === 'receiving-cerb') {
    return res.redirect(res.locals.routePath('question-exhausted-cerb'))
  }

  // default 
  // if (req.body.cerb_received === 'not-receiving-cerb') {
    return res.redirect(res.locals.routePath('question-mortgage-payments'))
  // }

}
