const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, {
        title: res.__('some_income.title'),
      }))
    })
    .post(route.applySchema(Schema), postSomeIncome)
}

const postSomeIncome = (req, res) => {

  if (['hours-reduced', 'selfemployed-lost-a-job', 'employed-part-time'].includes(req.body.some_income)) {
    return res.redirect(res.locals.routePath('question-reduced-income'))
  }

  if (req.body.some_income === 'quarantine') {
    return res.redirect(res.locals.routePath('question-mortgage-payments'))
  }

  if (req.body.some_income === 'retired') {
    return res.redirect(res.locals.routePath('question-gross-income'))
  }

}