const db = require("../models");
const Backend_Users = db.backend_user;
const Users = db.user;

const Query = {
  backend_users: async () => await Backend_Users.findAll(),
  backend_userById: async (root, args, context, info) => {
    return Backend_Users.findByPk(args.id);
  }
};

const Mutation = {
  createBackend_User: async (root, args, context, info) => {
    const { user_id, first_name, last_name, created_by } = args;

    return await Backend_Users.create({
      user_id,
      first_name,
      last_name,
      created_by
    });
  },
  updateBackend_User: async (root, args, context, info) => {
    const { id, user_id, first_name, last_name, updated_by } = args;
    const Backend_UserObj = Backend_Users.findByPk(id);
    if (!Backend_UserObj) {
      throw new Error(`Couldn’t find Backend_User with id ${id}`);
    }

    (await Backend_UserObj).update({
      user_id,
      first_name,
      last_name,
      updated_by
    });

    return Backend_UserObj;
  },
  deleteBackend_User: async (root, args, context, info) => {
    const { id } = args;
    const Backend_UserObj = Backend_Users.findByPk(id);

    if (!Backend_UserObj) {
      throw new Error(`Couldn’t find Backend_User with id ${id}`);
    }

    (await Backend_UserObj).destroy();

    return "Backend_User deleted successfully";
  }
};

const Backend_User = {
  user: backend_user => Users.findByPk(backend_user.user_id)
};

module.exports = { Query, Mutation, Backend_User };
