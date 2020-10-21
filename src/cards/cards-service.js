const CardsService = {
  getAllCards(db) {
    return db.from("cards").select("*");
  },

  getById(db, id) {
    return db.from("cards").select("*").where("card_id", id).first();
  },

  getByList(db, list_id) {
    return db.raw(
      `
    SELECT
      c.card_id, c.company_name, c.position_applied
    FROM
      cards c
    JOIN
      lists l
    ON
      c.list_id = l.list_id
    AND
      l.list_id = ${list_id};`
    );
  },

  insertCard(db, newCard) {
    return db
      .insert(newCard)
      .into("cards")
      .returning("*")
      .then((rows) => rows[0]);
  },

  updateCard(db, card_id, newValues) {
    return db.from("cards").where({ card_id }).update(newValues);
  },

  deleteCard(db, card_id) {
    return db.from("cards").where({ card_id }).delete();
  },
};

module.exports = CardsService;
