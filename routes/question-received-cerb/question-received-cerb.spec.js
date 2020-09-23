const request = require('supertest')
const app = require('../../app.js')

test('Can send get request received-cerb route ', async () => {
  const route = app.routes.get('question-received-cerb')
  const response = await request(app).get(route.path.en)
  expect(response.statusCode).toBe(200)
})

test('Can send post request received-cerb route ', async () => {
  const route = app.routes.get('question-received-cerb')
  const response = await request(app).post(route.path.en)
  expect(response.statusCode).toBe(302)
})

describe('Test redirects for received-cerb ', () => {
  const route = app.routes.get('question-received-cerb')

  const redirects = [
    {
      dest: 'question-exhausted-cerb',
      values: [
        'receiving-cerb', 
       // 'not-receiving-cerb',
      ],
    },
  ]

  redirects.map((redirect) => {
    redirect.values.map((value) => {
      test(`Redirects to ${redirect.dest} with a post value of ${value} `, async () => {
        const dest = app.routes.get(redirect.dest)

        await request(app)
          .post(route.path.en)
          .send({
            cerb_received : value,
          })
          .expect(302)
          .then((response) => {
            expect(response.headers.location).toBe(dest.path.en)
          })
      })
    })
  })
})
