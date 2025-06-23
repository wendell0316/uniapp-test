/* eslint-disable no-console */
import * as fs from 'fs';
import * as path from 'path';

interface PageConfig {
  path: string;
  style?: Record<string, any>;
  // Add other potential properties if known
}

interface PagesJson {
  pages: PageConfig[];
  globalStyle?: Record<string, any>;
  // Add other potential top-level properties if known
}

const detailPath = 'pages/detail/index';

const gameAppRoot = path.join(__dirname, '..');
const basePagesPath = path.join(gameAppRoot, 'pages.json');
const targetPagesPath = path.join(gameAppRoot, 'src/pages.json'); // Output path is inside src

const command = process.env.npm_lifecycle_event || '';

console.log(`[configure-pages] Running command: ${command}`);

let baseConfig: PagesJson = { pages: [] }; // Initialize with default structure
try {
  const baseContent = fs.readFileSync(basePagesPath, 'utf-8');
  baseConfig = JSON.parse(baseContent) as PagesJson;
  console.log('[configure-pages] Successfully read base pages.json.');
} catch (error) {
  console.error(`[configure-pages] Error reading base pages.json at ${basePagesPath}:`, error);
  process.exit(1); // Exit if base config cannot be read
}

// Ensure baseConfig.pages is an array (already typed, but good practice)
if (!Array.isArray(baseConfig.pages)) {
  console.warn('[configure-pages] baseConfig.pages is not an array. Initializing as empty array.');
  baseConfig.pages = [];
}

// 根据命令处理配置
if (command === 'dev') {
  console.log(`[configure-pages] Running in 'dev' mode. Filtering out detail pages and removing usingComponents.`);
  // 过滤掉包含 'detail' 的页面
  baseConfig.pages = baseConfig.pages.filter(page => page.path !== detailPath);

  // 删除 globalStyle 中的 usingComponents
  if (baseConfig.globalStyle?.usingComponents) {
    delete baseConfig.globalStyle.usingComponents;
    console.log('[configure-pages] Removed usingComponents from globalStyle.');
  }
}

if (command === 'dev:with-detail') {
  console.log(`[configure-pages] Running in 'dev:with-detail' mode. Using base config directly.`);
}

try {
  fs.writeFileSync(targetPagesPath, JSON.stringify(baseConfig, null, 2), 'utf-8');
  console.log(`[configure-pages] Successfully wrote updated configuration to ${targetPagesPath}`);
} catch (error) {
  console.error(`[configure-pages] Error writing updated pages.json to ${targetPagesPath}:`, error);
  process.exit(1);
}
