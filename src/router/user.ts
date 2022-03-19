'use strict';

import dayjs from 'dayjs';
import { Router } from 'express';

import { Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildASTSchema } from 'graphql';
import 'graphql-import-node';
import * as schemaFile from '../../schema.graphql';
import {
  Query,
  User,
  Kotatsu,
  QueryUserArgs,
  MutationUpdateKotatsuArgs,
  MutationToggleKotatsuArgs,
} from '../../@types/api';

import { UserService } from '../service/user.service';
import { KotatsuService } from '../service/kotatsu.service';

export const userRouter = Router();

let userService: UserService = null;
let kotatsuService: KotatsuService = null;

const initService = (): void => {
  if (userService) {
    return;
  }
  userService = new UserService();

  if (kotatsuService) {
    return;
  }
  kotatsuService = new KotatsuService();
};

const updateKotatsu = async (args: MutationUpdateKotatsuArgs): Promise<Kotatsu> => {
  initService();
  const updatedKotatsu = await kotatsuService.updateConfig(args.id, args.pullTime, args.pullTimer);
  if (!updatedKotatsu) {
    return;
  }
  return {
    id: updatedKotatsu.id,
    pullTime: updatedKotatsu.pullTime,
    pullTimer: updatedKotatsu.pullTimer,
    pulling: updatedKotatsu.pulling,
    using: updatedKotatsu.using,
    created: dayjs(updatedKotatsu.created).format(),
    updated: dayjs(updatedKotatsu.updated).format(),
  };
};

const toggleKotatsu = async (args: MutationToggleKotatsuArgs): Promise<Kotatsu> => {
  initService();
  const updatedKotatsu = await kotatsuService.togglePulling(args.id);
  if (!updatedKotatsu) {
    return;
  }
  return {
    id: updatedKotatsu.id,
    pullTime: updatedKotatsu.pullTime,
    pullTimer: updatedKotatsu.pullTimer,
    pulling: updatedKotatsu.pulling,
    using: updatedKotatsu.using,
    created: dayjs(updatedKotatsu.created).format(),
    updated: dayjs(updatedKotatsu.updated).format(),
  };
};

const getUser = async (args: QueryUserArgs, context: User): Promise<User> => {
  initService();
  if (!args.name && context) {
    return {
      ...context,
      created: dayjs(context.created).format(),
      updated: dayjs(context.updated).format(),
    };
  }
  if (!args.name) {
    return;
  }
  const user = await userService.getByName(args.name);
  if (!user) {
    return;
  }
  delete user.hash;
  delete user.session;
  return {
    ...user,
    created: dayjs(user.created).format(),
    updated: dayjs(user.updated).format(),
  };
};

userRouter.use(
  '/graphql',
  graphqlHTTP((req: Request, res: Response) => {
    return {
      schema: buildASTSchema(schemaFile),
      context: res.locals.user,
      graphiql: true,
      rootValue: {
        user: getUser,
        updateKotatsu,
        toggleKotatsu,
      } as Query,
    };
  })
);
