const db = require("../models");
const Property_Sub_Types = db.property_sub_type;
const Property_Types = db.property_type;

const Query = {
  property_sub_types: async () => await Property_Sub_Types.findAll(),
  property_sub_typeById: async (root, args, context, info) => {
    return Property_Sub_Types.findByPk(args.id);
  }
};

const Property_Sub_Type = {
  property_type: property_sub_type =>
    Property_Types.findByPk(property_sub_type.property_type_id)
};

module.exports = { Query, Property_Sub_Type };
