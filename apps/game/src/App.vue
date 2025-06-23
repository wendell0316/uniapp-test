<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';

import { FeelGoodApi } from '@/ttcomponents/feelgood/index/index';

onLaunch(async (opt) => {
  FeelGoodApi.setUserInfo({
    user_id: 'test',
    user_name: '测试用户',
  });
});
onShow(() => {
  // noop
});
onHide(() => {
  // noop
});
</script>
