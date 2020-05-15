const mutations = {
  async createQuestion(parent, args, ctx, info) {
    const question = await ctx.db.mutation.createQuestion({
      data: {
        ...args
      }
    }, info);

    return question;
  }
};

module.exports = mutations;
