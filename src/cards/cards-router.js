const express = require("express");
const CardsService = require("./cards-service");
const jsonBodyParser = express.json();
const xss = require("xss");

const CardRouter = express.Router();

// Route to get all cards
CardRouter.route("/").get((req, res, next) => {
  CardsService.getAllCards(req.app.get("db"))
    .then((cards) => {
      res.json(cards);
    })
    .catch(next);
});

// Route to get all cards and info by list_id
CardRouter.route("/:list_id").get((req, res, next) => {
  const listId = req.params.list_id;
  CardsService.getByList(req.app.get("db"), listId)
    .then((cards) => {
      console.log(cards);
      console.log("hi");
      res.json(cards.rows);
    })
    .catch(next);
});

// Route to create new cards
CardRouter.route("/").post(jsonBodyParser, (req, res, next) => {
  console.log(1)
  if (!req.body) {
    return res.status(400).json({ Error: `Missing request body` });
  }
  console.log(2)
  // Validate that necessary values are being sent by the client
  for (let prop of ["company_name", "position_applied", "list_id"]) {
    if (req.body[prop] === undefined) {
      return res
        .status(400)
        .json({ Error: `Missing '${prop}' property on request body` });
    }
  }
  console.log(3)
  const { list_id, company_name, position_applied } = req.body;
  const newCard = {
    list_id,
    company_name: xss(company_name),
    position_applied: xss(position_applied),
  };
  console.log(4)
  CardsService.insertCard(req.app.get("db"), newCard)
    .then((dbCard) => {
      res.status(201).json(dbCard);
    })
    .catch(err => { throw new Error(err) });
  console.log(5)
});

// Route to update and delete cards
CardRouter.route("/:card_id")
  .all((req, res, next) => {
    const db = req.app.get("db");
    CardsService.getById(db, req.params.card_id)
      .then((card) => {
        if (!card) {
          return res.status(404).json({
            error: { message: `Card doesn't exist` },
          });
        }
        res.card = card; //save the article for the next middleware
        next(); //don't forget to call next so the next middleware happens!
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json({
      card_id: res.card.card_id,
      list_id: res.card.list_id,
      company_name: xss(res.card.company_name),
      position_applied: xss(res.card.position_applied),
      job_location: xss(res.card.job_location),
      job_url: xss(res.card.job_url),
      job_description: xss(res.card.job_description),
    });
  })
  .patch(jsonBodyParser, (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ Error: `Missing request body` });
    }

    /* In case one card is swapping indexes with another card, the client must
        send a 'swapee' object containing the id of the object and its new index */
    if (req.body.swapee) {
      const { swapee } = req.body;

      CardsService.updateCard(req.app.get("db"), swapee.id, {
        index: swapee.index,
      });
    }

    const {
      card_id,
      list_id,
      company_name,
      position_applied,
      job_location,
      job_url,
      job_description,
    } = req.body;

    const newValues = {
      card_id,
      list_id,
      company_name,
      position_applied,
      job_location,
      job_url,
      job_description,
    };

    CardsService.updateCard(req.app.get("db"), req.params.card_id, newValues)
      .then(() => res.status(204).end())
      .catch(next);
  })
  .delete(jsonBodyParser, (req, res, next) => {
    // const { toReIndex } = req.body;
    const db = req.app.get("db");

    // toReIndex.forEach((card) => {
    //   CardsService.updateCard(db, card.id, { index: card.index - 1 });
    // });

    CardsService.deleteCard(db, req.params.card_id)
      .then(() => res.status(204).end())
      .catch(next);
  });

module.exports = CardRouter;
