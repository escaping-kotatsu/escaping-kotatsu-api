'use strict';

let host = 'http://localhost:5000';

if (`${location.protocol}//${location.host}` != host) {
  host = 'https://kotatsu-api.3n38.app';
}

export const HOST = host;
