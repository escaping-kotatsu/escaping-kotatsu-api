<template>
  <div class="login container mt-3">
    <h1>逃げるコタツログイン画面</h1>
    <div class="form-group">
      <label for="exampleInputEmail1">ユーザID</label>
      <input
        type="text"
        v-model="userName"
        class="form-control"
        id="inputUserId"
        aria-describedby="userIdHelp"
        placeholder="ここにユーザIDを入力"
      />
    </div>
    <div class="form-group mb-2">
      <label for="exampleInputPassword1">パスワード</label>
      <input
        v-model="password"
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        placeholder="パスワード"
      />
    </div>
    <button @click="login" class="btn btn-primary">ログイン</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { User, GetUserQueryVariables } from '../../../@types/api';
import { getUser } from '../../../src/constants/graphql.query';
import { request } from 'graphql-request';

@Component({})
export default class LoginComponent extends Vue {
  private userName = '';
  private password = '';

  private async created() {
    try {
      const userQueryVal: GetUserQueryVariables = { userName: null };
      const userStatus = await request<{ user: User }>('/api/user/graphql', getUser, userQueryVal);
      if ('name' in userStatus.user) {
        location.href = '/control';
      }
    } catch (error) {
      console.log('need to login'); // eslint-disable-this-line no-console
    }
  }

  private async login() {
    try {
      const result = await axios.post('/login', { name: this.userName, pass: this.password });
      if ('name' in result.data) {
        location.reload();
      }
    } catch (error) {
      alert(`ログインに失敗しました。${error}`);
    }
  }
}
</script>
