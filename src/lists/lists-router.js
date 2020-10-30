const path = require("path");
const express = require("express");
const ListsService = require("./lists-service");
const CardsService = require("../cards/cards-service");

const ListRouter = express.Router();
const jsonBodyParser = express.json();

// Route to get all the lists and the right cards
ListRouter.route("/").get((req, res, next) => {
  ListsService.getAllLists(req.app.get("db"))
    .then((lists) => {
      let finalList = [];
      for (i = 0; i < lists.length; i++) {
        const list_id = lists[i].list_id;
        CardsService.getByList(req.app.get("db"), list_id)
          .then((cards) => {
            const result = lists
              .filter((list) => list.list_id === list_id)
              .map((list) => ({ ...list, cards: cards.rows }));

            // finalList = finalList.concat(result);
            finalList = [...finalList, ...result];

            if (finalList.length === lists.length) {
              finalList.sort((a, b) => a.list_id - b.list_id)
              res.json(finalList);
            }
          })
          .catch((error) => {
            console.log("AN ERROR OCCURRED");
            console.log("error: ", error);
          });
      }
    })
    .catch(next);
});

// Route to handle updating the list
/* 
Needs to be able to handle: 
1. When a new card is inserted into a list 
2. When a card is moved to a new list 
3. When the cards in a list are reordered
*/

ListRouter.route("/:list_id").patch(jsonBodyParser, (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ Error: `Missing request body` });
  }

  const { title, index } = req.body;

  const newCard = {
    title,
    index,
  };

  ListsService.updateList(req.app.get("db"), req.params.category_id, newCard)
    .then(() => res.status(204).end())
    .catch(next);
});

module.exports = ListRouter;
