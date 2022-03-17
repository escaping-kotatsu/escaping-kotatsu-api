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
import axios from 'axios';
import dayjs from 'dayjs';

@Component({})
export default class ControlComponent extends Vue {
  private pullTime = '15:00';
  private pullTimer = 0;
  private pullMsg = '今すぐ引っ張る!';
  private stopMsg = '牽引停止';
  private toggleBtnTitle = this.pullMsg;

  private async mounted() {
    try {
      const result = await axios.get('/api/user/info');
      if ('name' in result.data) {
        console.log('already logged in!');
      }
    } catch (error) {
      location.href = '/';
    }

    const kotatsuStatus = await axios.get('/iot/kotatsu/1/status');
    this.pullTime = this.unixTimeToUIFormat(`${kotatsuStatus.data['pull_time']}`);
    this.pullTimer = parseInt(kotatsuStatus.data['pull_timer']);
    this.toggleBtnTitle = !kotatsuStatus.data['pulling'] ? this.pullMsg : this.stopMsg;
  }

  private unixTimeToUIFormat(unixTime: string): string {
    if (!unixTime) {
      return this.pullTime;
    }
    if (!unixTime.match(/[^/d]/)) {
      return '';
    }
    return dayjs.unix(parseInt(unixTime)).format('HH:mm');
  }

  private async pull() {
    const res = await axios.post('/api/user/pulling/toggle/1');
    this.toggleBtnTitle = !res.data['pulling'] ? this.pullMsg : this.stopMsg;
  }

  private async saveConfig() {
    const pullTimeHM = this.pullTime.split(':');
    const pullTime = dayjs().set('hours', parseInt(pullTimeHM[0])).set('minutes', parseInt(pullTimeHM[1])).unix();
    try {
      await axios.post(`/api/user/update/config/1/${pullTime}/${this.pullTimer}`);
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
