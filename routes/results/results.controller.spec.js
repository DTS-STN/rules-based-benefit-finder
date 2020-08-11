const request = require('supertest')
const app = require('../../app.js')
const fetchMock = require('fetch-mock')

beforeEach(() => {
  process.env.OPEN_FISCA_ENDPOINT = 'http://fiscaurl.com'
})

test('Can send get request results route ', async () => {
    fetchMock.postOnce('http://fiscaurl.com/calculate', {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: {
      persons: {
        benefits_applicant: {
          cerb_eligible: {
            '2020-08-10': true,
          },
        },
      },
    },
  })

  const route = app.routes.get('results')
  const response = await request(app).get(route.path.en)
  expect(response.statusCode).toBe(200)
})
