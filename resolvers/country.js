const db = require("../models");
const Country = db.countries;

const Query = {
  countries: async () => await Country.findAll(),
  countryById: async (root, args, context, info) => {
    return Country.findByPk(args.id);
  }
};

module.exports = { Query };
