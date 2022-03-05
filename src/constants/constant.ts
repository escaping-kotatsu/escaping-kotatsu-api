'use strict';

export const PORT = parseInt(process.env.PORT || '5000');
export const DOMAIN = process.env.DOMAIN || 'localhost:5000';
export const DATABASE_URL_DEV = 'postgresql://postgres:password@localhost:5432/postgres_db';
export const DATABASE_URL = process.env.DATABASE_URL || DATABASE_URL_DEV;
export const SESSION_SECRET = process.env.SESSION_SECRET || 'secret';
export const HASH_SECRET = process.env.HASH_SECRET || 'secret';
export const SESSION_AGE = parseInt(process.env.PORT || `${1000 * 60 * 60 * 24 * 7}`); // one week
export const STATIC_VUE_SERVER = process.env.STATIC_VUE_SERVER || 'front_vue:8080';
export const FIRST_USER_NAME = process.env.FIRST_USER_NAME || 'firstUserName';
export const FIRST_USER_PASS= process.env.FIRST_USER_PASS || 'firstUserPass';
export const COOKIE_OPTIONS: {
  domain: string;
  httpOnly: boolean;
  secure: boolean;
  sameSite: boolean | 'strict' | 'lax' | 'none';
  maxAge: number;
} = {
  domain: DOMAIN,
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: SESSION_AGE,
};
