'use strict';

import humps from 'humps';
import dayjs from 'dayjs';
import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { KotatsuService } from '../service/kotatsu.service';

export const iotRouter = Router();

let kotatsuService: KotatsuService = null;

const initService = (): void => {
  if (kotatsuService) {
    return;
  }
  kotatsuService = new KotatsuService();
};

const schema = buildSchema(`
type Query {
  kotatsu(id: Int): Kotatsu
},
type Kotatsu {
  id: Int,
  pulling: Boolean,
  pull_timer: Int,
  pull_time: Int,
  using: Boolean,
  created: String!,
  updated: String!,
}
`);

const getKotatsu = async (args: { id: number }) => {
  initService();
  const result = await kotatsuService.getById(args.id);
  if (!result) {
    return;
  }
  return humps.decamelizeKeys({
    ...result,
    created: dayjs(result.created).format(),
    updated: dayjs(result.updated).format(),
  });
};

const root = {
  kotatsu: getKotatsu,
};

iotRouter.use(
  '/kotatsu/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
