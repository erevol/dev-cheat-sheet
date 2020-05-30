const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../mail');

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
  },
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info
    );
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('_dev_cheat_sheet_token_', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 10, // 10 min cookie
    });

    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Password!');
    }
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('_dev_cheat_sheet_token_', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 10, // 10 min cookie
    });

    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('_dev_cheat_sheet_token_');
    return { message: 'Goodbye!' };
  },
  async requestReset(parent, args, ctx, info) {
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`No such user found for email ${args.email}`);
    }
    const randomBytesPromiseified = promisify(randomBytes);
    const resetToken = (await randomBytesPromiseified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + (1000 * 60 * 10); //10 min from now
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry },
    });
    const mailRes = await transport.sendMail({
      from: 'support@devcheatsheet.com',
      to: user.email,
      subject: 'Your Password Reset Token',
      html: makeANiceEmail(`👋 Your Password Reset Token is here!
      \n\n
      <a href="${process.env
        .FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to Reset</a>`),
    });

    return { message: 'Thanks!' };
  },
  async resetPassword(parent, args, ctx, info) {
    if (args.password !== args.confirmPassword) {
      throw new Error("The Passwords don't match!");
    }
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - (1000 * 60 * 10),
      },
    });
    if (!user) {
      throw new Error('This token is either invalid or expired!');
    }
    const password = await bcrypt.hash(args.password, 10);
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    ctx.response.cookie('_dev_cheat_sheet_token_', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    return updatedUser;
  },
};

module.exports = mutations;
