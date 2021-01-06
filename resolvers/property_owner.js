const db = require("../models");
const Property_Owners = db.property_owner;
const Users = db.user;

const Query = {
  property_owners: async () => await Property_Owners.findAll(),
  property_ownerById: async (root, { id }) => {
    return Property_Owners.findByPk(id);
  }
};

const Mutation = {
  createPropertyOwner: async (root, args, context, info) => {
    const { user_id, first_name, last_name, mobile, created_by } = args;

    return await Property_Owners.create({
      user_id,
      first_name,
      last_name,
      mobile,
      created_by
    });
  },
  updatePropertyOwner: async (root, args, context, info) => {
    const { id, user_id, first_name, last_name, mobile, updated_by } = args;
    const PropertyOwnerObj = Property_Owners.findByPk(id);
    if (!PropertyOwnerObj) {
      throw new Error(`Couldn’t find PropertyOwner with id ${id}`);
    }

    (await PropertyOwnerObj).update({
      user_id,
      first_name,
      last_name,
      mobile,
      updated_by
    });

    return PropertyOwnerObj;
  },
  deletePropertyOwner: async (root, args, context, info) => {
    const { id } = args;
    const PropertyOwnerObj = Property_Owners.findByPk(id);

    if (!PropertyOwnerObj) {
      throw new Error(`Couldn’t find PropertyOwner with id ${id}`);
    }

    (await PropertyOwnerObj).destroy();

    return "PropertyOwner deleted successfully";
  }
};

const Property_Owner = {
  user: property_owner => Users.findByPk(property_owner.user_id)
};

module.exports = { Query, Mutation, Property_Owner };
