const { forwardTo } = require('prisma-binding');

const Query = {
  /*
  //This is another way of doing the same as forwardTo

  async questions(parent, args, ctx, info) {
    const questions = await ctx.db.query.questions();
    return questions;
  }
  */
  question: forwardTo('db'),
  questions: forwardTo('db'),
  job: forwardTo('db'),
  jobs: forwardTo('db'),
  seniority: forwardTo('db'),
  seniorities: forwardTo('db'),
  topic: forwardTo('db'),
  topics: forwardTo('db'),
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
};

module.exports = Query;
