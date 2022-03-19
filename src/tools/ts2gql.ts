'use strict';

import fs from 'fs';
import * as queries from '../constants/graphql.query';

for (const queryName of Object.keys(queries)) {
  fs.writeFileSync(`${__dirname}/../../graphql/${queryName}.query.graphql`, queries[queryName], 'utf8');
}
