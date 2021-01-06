const db = require("../models");
const Contractors = db.contractor;
const Users = db.user;

const Query = {
  contractors: async () => await Contractors.findAll(),
  contractorById: async (root, args, context, info) => {
    return Contractors.findByPk(args.id);
  }
};

const Mutation = {
  createContractor: async (root, args, context, info) => {
    const {
      user_id,
      first_name,
      last_name,
      mobile,
      company_name,
      created_by
    } = args;

    return await Contractors.create({
      user_id,
      first_name,
      last_name,
      mobile,
      company_name,
      created_by
    });
  },
  updateContractor: async (root, args, context, info) => {
    const {
      id,
      user_id,
      first_name,
      last_name,
      mobile,
      company_name,
      updated_by
    } = args;
    const ContractorObj = Contractors.findByPk(id);
    if (!ContractorObj) {
      throw new Error(`Couldn’t find Contractor with id ${id}`);
    }

    (await ContractorObj).update({
      user_id,
      first_name,
      last_name,
      mobile,
      company_name,
      updated_by
    });

    return ContractorObj;
  },
  deleteContractor: async (root, args, context, info) => {
    const { id } = args;
    const ContractorObj = Contractors.findByPk(id);

    if (!ContractorObj) {
      throw new Error(`Couldn’t find Contractor with id ${id}`);
    }

    (await ContractorObj).destroy();

    return "Contractor deleted successfully";
  }
};

const Contractor = {
  user: contractor => Users.findByPk(contractor.user_id)
};

module.exports = { Query, Mutation, Contractor };
