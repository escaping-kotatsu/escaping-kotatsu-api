'use strict';

import { gql } from 'graphql-request';

export const getKotatsu = gql`
  query getKotatsu($kotatsuID: Int!) {
    kotatsu(id: $kotatsuID) {
      id
      pulling
      pullTimer
      pullTime
      using
      created
      updated
    }
  }
`;

export const getUser = gql`
  query getUser($userName: String) {
    user(name: $userName) {
      id
      name
      sitting
      ble
      count
      using
      created
      updated
    }
  }
`;

export const updateKotatsu = gql`
  mutation updateKotatsu($id: Int!, $pullTime: Int!, $pullTimer: Int!) {
    updateKotatsu(id: $id, pullTime: $pullTime, pullTimer: $pullTimer) {
      ...kotatsuFields
    }
  }
  fragment kotatsuFields on Kotatsu {
    id
    pulling
    pullTime
    pullTimer
    using
    created
    updated
  }
`;

export const toggleKotatsu = gql`
  mutation toggleKotatsu($id: Int!) {
    toggleKotatsu(id: $id) {
      ...kotatsuFieldsForToggle
    }
  }
  fragment kotatsuFieldsForToggle on Kotatsu {
    id
    pulling
    pullTime
    pullTimer
    using
    created
    updated
  }
`;
