/// <reference types="vite/client" />

declare global {
  namespace tt {
    // 可以加入自己所需的额外类型定义
    const myMethod: () => number;
  }
}
