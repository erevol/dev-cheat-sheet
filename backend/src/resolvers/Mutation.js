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
  },
  async createJob(parent, args, ctx, info) {
    const job = await ctx.db.mutation.createJob({
      data: {
        ...args
      }
    }, info);

    return job;
  },
  async updateJob(parent, args, ctx, info) {
    const data = { ...args };
    delete data.id;
    return ctx.db.mutation.updateJob(
      {
        data,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async createTopic(parent, args, ctx, info) {
    const topic = await ctx.db.mutation.createTopic({
      data: {
        ...args
      }
    }, info);

    return topic;
  },
  async updateTopic(parent, args, ctx, info) {
    const data = { ...args };
    delete data.id;
    return ctx.db.mutation.updateTopic(
      {
        data,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async createSeniority(parent, args, ctx, info) {
    const seniority = await ctx.db.mutation.createSeniority({
      data: {
        ...args
      }
    }, info);

    return seniority;
  },
  async updateSeniority(parent, args, ctx, info) {
    const data = { ...args };
    delete data.id;
    return ctx.db.mutation.updateSeniority(
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
