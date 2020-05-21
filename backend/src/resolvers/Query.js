const { forwardTo } = require('prisma-binding');

const Query = {
  question: forwardTo('db'),
  questions: forwardTo('db'),
  /*
  //This is another way of doing the same as forwardTo

  async questions(parent, args, ctx, info) {
    const questions = await ctx.db.query.questions();
    return questions;
  }
  */
};

module.exports = Query;
