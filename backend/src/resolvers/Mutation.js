const mutations = {
  async createQuestion(parent, args, ctx, info) {
    const question = await ctx.db.mutation.createQuestion({
      data: {
        ...args
      }
    }, info);

    return question;
  },
  async updateQuestion(parent, args, ctx, info) {
    const data = { ...args };
    delete data.id;
    return ctx.db.mutation.updateQuestion(
      {
        data,
        where: {
          id: args.id,
        },
      },
      info
    );
  }
};

module.exports = mutations;
