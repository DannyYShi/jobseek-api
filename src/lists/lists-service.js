const ListsService = {
  getAllLists(db) {
    return db.select("*").from("lists");
  },

  getCards(db) {
    return db.raw(`
    SELECT
      c.card_id, c.company_name, c.position_applied
    FROM
      cards c
    JOIN
      lists l
    ON 
      l.list_id = c.list_id`);
  },

  updateList(db, id, newCards) {
    return db
      .from("lists")
      .where({ id })
      .update(newCards)
      .returning("*")
      .then((rows) => rows[0]);
  },
};

module.exports = ListsService;
