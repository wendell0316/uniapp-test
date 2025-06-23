#!/usr/bin/env node
/* eslint-disable no-console */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const handleError = (error: Error, message: string) => {
  console.error(`${message}:`, error);
  process.exit(1);
};

const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error('Usage: pnpm create-component <component-name> <chinese-name>');
  process.exit(1);
}

const [componentName, chineseName] = args;
const kebabCase = componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

// 项目根目录
const projectRoot = resolve(new URL(import.meta.url).pathname, '../../');

// UI组件目录
const componentDir = resolve(projectRoot, 'packages/ui/src', kebabCase);
try {
  if (!existsSync(componentDir)) {
    mkdirSync(componentDir, { recursive: true });
  }
} catch (error) {
  handleError(error as Error, '创建组件目录失败');
}
// 示例页面目录
const exampleDir = resolve(projectRoot, 'apps/ui-example/src/pages', kebabCase);
if (!existsSync(exampleDir)) {
  mkdirSync(exampleDir, { recursive: true });
}

// 创建组件文件
const componentContent = `<script lang="ts" setup>
defineOptions({
  name: 'Xt${componentName}',
});
</script>

<template>
  <view class="${kebabCase}">
    <!-- 组件内容 -->
  </view>
</template>

<style lang="scss" scoped>
.${kebabCase} {
  // 样式内容
}
</style>
`;

writeFileSync(resolve(componentDir, 'index.vue'), componentContent);

// 创建示例页面
const exampleContent = `<script lang="ts" setup>
// ${componentName} 示例
</script>

<template>
  <view class="container">
    <uni-section title="基础用法" type="line" padding>
      <!-- 示例内容 -->
    </uni-section>
  </view>
</template>

<style lang="scss" scoped>
.container {
  padding: 0 0 20px;
  background-color: var(--xt-background-color--white);
}
</style>
`;

writeFileSync(resolve(exampleDir, 'index.vue'), exampleContent);

// 更新pages.json
const pagesJsonPath = resolve(projectRoot, 'apps/ui-example/src/pages.json');
const pagesJson = JSON.parse(readFileSync(pagesJsonPath, 'utf-8'));

// 添加新组件的路由配置
pagesJson.pages.push({
  path: `pages/${kebabCase}/index`,
  style: {
    navigationBarTitleText: `${componentName} ${chineseName}`,
  },
});

// 写入更新后的pages.json
writeFileSync(pagesJsonPath, JSON.stringify(pagesJson, null, 2));

console.log(`✨ 组件 ${componentName} 创建成功！`);
console.log(`📦 组件目录: ${componentDir}`);
console.log(`📝 示例目录: ${exampleDir}`);
