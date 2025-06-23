/* eslint-disable no-console */
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const handleError = (error: Error, message: string) => {
  console.error(`${message}:`, error);
  process.exit(1);
};

const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error('Usage: pnpm create-icon <component-name> <svg-string>');
  process.exit(1);
}

const componentName = args[0];
const svgString = args.slice(1).join(' ').replace(/^['"]|['"]$/g, '');
const kebabCase = componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

// 项目根目录
const projectRoot = resolve(new URL(import.meta.url).pathname, '../../');

// Icon组件目录
const componentDir = resolve(projectRoot, 'packages/icon/src', kebabCase);
try {
  if (!existsSync(componentDir)) {
    mkdirSync(componentDir, { recursive: true });
  }
} catch (error) {
  handleError(error as Error, '创建组件目录失败');
}

// 创建组件文件
const componentContent = `<script lang="ts" setup>
import XtIconCommon from '../common/index.vue';

const svg = \`${svgString}\`;

defineProps<{
  size?: string | number;
}>();

const emit = defineEmits<{
  (event: 'click'): void;
}>();

function handleClick() {
  emit('click');
}
</script>

<template>
  <XtIconCommon :svg="svg" :size="size" type="background" @click="handleClick"></XtIconCommon>
</template>
`;

try {
  writeFileSync(resolve(componentDir, 'index.vue'), componentContent);
  console.log(`Icon组件 ${componentName} 创建成功！`);
} catch (error) {
  handleError(error as Error, '写入组件文件失败');
}
