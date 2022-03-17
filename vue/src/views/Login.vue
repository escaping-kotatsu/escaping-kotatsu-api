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

import { HOST } from '../utils/host';

@Component({})
export default class LoginComponent extends Vue {
  private userName = '';
  private password = '';

  private async created() {
    try {
      const result = await axios.get(`${HOST}/api/user/info`);
      if ('name' in result.data) {
        location.href = `${HOST}/control`;
      }
    } catch (error) {
      console.log('need to login'); // eslint-disable-this-line no-console
    }
  }

  private async login() {
    try {
      const result = await axios.post(`${HOST}/login`, { name: this.userName, pass: this.password });
      if ('name' in result.data) {
        location.href = `${HOST}/control`;
      }
    } catch (error) {
      alert(`ログインに失敗しました。${error}`);
    }
  }
}
</script>
