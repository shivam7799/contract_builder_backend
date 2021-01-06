const db = require("../models");
const States = db.states;
const Countries = db.countries;

const Query = {
  states: async () => await States.findAll(),
  stateById: async (root, args, context, info) => {
    return States.findByPk(args.id);
  }
};

const State = {
  country: state => Countries.findByPk(state.country_id)
};

module.exports = { Query, State };
