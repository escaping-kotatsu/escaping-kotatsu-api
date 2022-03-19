<template>
  <div class="control container mt-3">
    <h1>逃げるコタツ操作画面</h1>
    <h2 class="mb-1"><i class="bi bi-alarm"></i> 時間で引っ張る</h2>
    <input v-model="pullTime" type="time" class="form-control-lg mb-2" style="text-align: center" />
    <h2 class="mb-1"><i class="bi bi-alarm"></i> タイマー（分）</h2>
    <input v-model="pullTimer" type="number" min="1" class="form-control-lg mb-2" style="text-align: center" />
    <button
      @click="saveConfig"
      type="button"
      class="btn btn-primary btn-lg mb-2"
      data-bs-toggle="tooltip"
      title="設定保存"
    >
      設定保存
    </button>
    <hr />
    <button
      @click="pull"
      type="button"
      class="btn btn-primary btn-lg mb-2"
      data-bs-toggle="tooltip"
      title="今すぐコタツを引っ張る！"
    >
      <i class="bi bi-box-arrow-down"></i>{{ toggleBtnTitle }}
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import dayjs from 'dayjs';
import {
  Kotatsu,
  User,
  GetKotatsuQueryVariables,
  GetUserQueryVariables,
  UpdateKotatsuMutationVariables,
  ToggleKotatsuMutationVariables,
} from '../../../@types/api';
import { getKotatsu, getUser, updateKotatsu, toggleKotatsu } from '../../../src/constants/graphql.query';
import { request } from 'graphql-request';

@Component({})
export default class ControlComponent extends Vue {
  private pullTime = '15:00';
  private pullTimer = 5;
  private pullMsg = '今すぐ引っ張る!';
  private stopMsg = '牽引停止';
  private toggleBtnTitle = this.pullMsg;

  private async mounted() {
    try {
      const userQueryVal: GetUserQueryVariables = { userName: null };
      const userStatus = await request<{ user: User }>('/api/user/graphql', getUser, userQueryVal);
      if ('name' in userStatus.user) {
        console.log('already logged in!');
      }
    } catch (error) {
      location.href = '/';
    }

    const kotatsuQueryVal: GetKotatsuQueryVariables = { kotatsuID: 1 };
    const kotatsuStatus = await request<{ kotatsu: Kotatsu }>('/iot/kotatsu/graphql', getKotatsu, kotatsuQueryVal);
    this.pullTime = this.unixTimeToUIFormat(kotatsuStatus.kotatsu.pullTime || 1647669647);
    this.pullTimer = kotatsuStatus.kotatsu.pullTimer || 5;
    this.toggleBtnTitle = !kotatsuStatus.kotatsu.pulling ? this.pullMsg : this.stopMsg;
  }

  private unixTimeToUIFormat(unixTime: number): string {
    if (!unixTime) {
      return this.pullTime;
    }
    if (!`${unixTime}`.match(/[^/d]/)) {
      return '';
    }
    return dayjs.unix(unixTime).format('HH:mm');
  }

  private async pull() {
    const kotatsuQueryVal: ToggleKotatsuMutationVariables = { id: 1 };
    const res = await request<{ toggleKotatsu: Kotatsu }>('/api/user/graphql', toggleKotatsu, kotatsuQueryVal);
    this.toggleBtnTitle = !res.toggleKotatsu.pulling ? this.pullMsg : this.stopMsg;
  }

  private async saveConfig() {
    const pullTimeHM = this.pullTime.split(':');
    const pullTime = dayjs().set('hours', parseInt(pullTimeHM[0])).set('minutes', parseInt(pullTimeHM[1])).unix();
    try {
      const kotatsuQueryVal: UpdateKotatsuMutationVariables = {
        id: 1,
        pullTime,
        pullTimer: parseInt(`${this.pullTimer}`),
      };
      await request<{ updateKotatsu: Kotatsu }>('/api/user/graphql', updateKotatsu, kotatsuQueryVal);
      alert('保存完了!');
    } catch (error) {
      alert(`エラーが発生しました。 ${error}`);
    }
  }
}
</script>

<style scoped>
.control {
  text-align: center;
}

input {
  width: 90%;
}
</style>
