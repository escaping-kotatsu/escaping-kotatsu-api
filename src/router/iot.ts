'use strict';

import dayjs from 'dayjs';
import { Router } from 'express';

import { graphqlHTTP } from 'express-graphql';
import { buildASTSchema } from 'graphql';
import 'graphql-import-node';
import * as schemaFile from '../../schema.graphql';
import { Query, Kotatsu, QueryKotatsuArgs } from '../../@types/api';

import { KotatsuService } from '../service/kotatsu.service';

export const iotRouter = Router();

let kotatsuService: KotatsuService = null;

const initService = (): void => {
  if (kotatsuService) {
    return;
  }
  kotatsuService = new KotatsuService();
};

const getKotatsu = async (args: QueryKotatsuArgs): Promise<Kotatsu> => {
  initService();
  const result = await kotatsuService.getById(args.id);
  if (!result) {
    return;
  }
  return {
    ...result,
    created: dayjs(result.created).format(),
    updated: dayjs(result.updated).format(),
  };
};

iotRouter.use(
  '/kotatsu/graphql',
  graphqlHTTP({
    schema: buildASTSchema(schemaFile),
    rootValue: {
      kotatsu: getKotatsu,
    } as Query,
    graphiql: true,
  })
);
