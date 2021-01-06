const db = require("../models");
const Property_Type = db.property_type;

const Query = {
  property_types: async () => await Property_Type.findAll(),
  property_typeById: async (root, args, context, info) => {
    return Property_Type.findByPk(args.id);
  }
};

module.exports = { Query };
