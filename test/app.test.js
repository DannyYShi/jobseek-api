const app = require("../src/server");
const { expect } = require('chai')
const supertest = require('supertest')
const knex = require('knex')
const { DATABASE_URL } = require("../src/config");
const CardsService = require('../src/cards/cards-service')
const ListsService = require('../src/lists/lists-service')


before(() => {
  db = knex({
    client: "pg",
    connection: DATABASE_URL,
  });
})

describe("App", () => {
  it('GET / responds with 200 and welcome message', () => {
    return supertest(app).get("/").expect(200, "You've reached the jobseek API");
  });
});

describe("Lists", () => {
  describe('Lists', () => {
    it('GET /api/lists responds with 200', () => {
      return supertest(app).get('/api/lists').expect(200).expect('Content-Type', /json/)
    })

  })
  describe(`getAllLists()`, () => {
    it('GET /api/lists responds with all the lists', () => {
      return ListsService.getAllLists(db).then((lists) => {
        expect(lists).to.be.a("array")
      })
    })
  })
})

describe("Cards", () => {
  describe('Cards', () => {
    it('GET /api/cards responds with 200', () => {
      return supertest(app).get('/api/cards').expect(200).expect('Content-Type', /json/)
    })
    describe(`getAllCards()`, () => {
      it('GET /api/cards responds with all the cards', () => {
        return CardsService.getAllCards(db).then((cards) => {
          expect(cards).to.be.a("array")
        })
      })
    })
    describe(`insertCard()`, () => {
      it('POST / responds with 201 and creates a card', () => {
        const newCard = {
          'list_id': 2,
          'company_name': 'test',
          'position_applied': 'test'
        }
        return CardsService.insertCard(db, newCard).then((card) => {
          expect(card).to.be.a("object")
        })
      })
    })
    describe(`updateCard()`, () => {
      it('PATCH /api/cards/:card_id updates a card', () => {
        const newValues = {
          'job_location': 'somewhere',
          'job_url': "www.test.com/careers",
          'job_description': 'I love this job'
        }
        return CardsService.updateCard(db, 2, newValues).then(() => {
          expect(204)
        })
      })
    })
    describe(`deleteCard()`, () => {
      it('DELETE /api/cards/:card_id deletes a card', () => {
        return CardsService.deleteCard(db, 1).then(() => {
          expect(200)
        })
      })
    })
  })
})