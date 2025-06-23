<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app';
import { FeelGoodApi } from '@/ttcomponents/feelgood/index/index';

onShow(() => {
  setTimeout(() => {
    FeelGoodApi.triggerEvent('game-miniapp-feedback');
  }, 5000);
});
</script>

<template>
  <view :class="['home']">
    <DialogTask :has-bottom-tab="true"></DialogTask>
  </view>
</template>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background: no-repeat top / 100% 220px linear-gradient(180deg, #E5E6FE 0%, rgba(229, 239, 254, 0) 100%), var(--xt-background-color--nesting);
  transition: all 0.3s ease-in-out;
  .nav {
    display: block;
    background-color: transparent;
    transition: all 0.3s ease-in-out;
    &_white {
      background-color: #FFF;
    }
  }
  .card-item {
    display: block;
    width: 100%;
  }
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: calc(100vw - 32px);
    height: 80px;
    margin: 0 auto 12px;
    background: #FFF;
    border-radius: 8px;
  }
  .info {
    display: block;
    margin: 0 auto 8px;
    border-radius: 8px;
  }
  .filter {
    width: 100vw;
    height: 50px;
    background: #FFF;
    box-shadow: unset;
    transition: all 0.3s ease-in-out;
    &_shadow {
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
    }
  }
}
</style>
