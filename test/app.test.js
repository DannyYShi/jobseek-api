const app = require("../src/server");
const { expect } = require('chai')
const supertest = require('supertest')
require('dotenv').config()
const express = require('express')
const knex = require('knex')
const { DATABASE_URL } = require("../src/config");
const CardsService = require('../src/cards/cards-service')
const ListsService = require('../src/lists/lists-service')

let db

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
  describe(`getAllLists()`, () => {
    it('GET /api/lists responds with all the lists', () => {
      return ListsService.getAllLists(db).then((lists) => {
        expect(lists).to.be.a("array")
      })
    })
  })
})

describe('Cards', () => {
  it('GET /api/cards responds with all the cards', () => {
    return supertest(app).get('/api/cards').expect(200).expect('Content-Type', /json/)
  })
})
