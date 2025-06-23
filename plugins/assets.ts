import path from 'node:path';
import type { PluginOption } from 'vite';

function isAssets(url: string, assetsRoot: string): boolean {
  const ext = url.split('.').pop() || '';
  // 判断是否是 assets 目录下的资源
  if (url.includes(assetsRoot)) return true;
  // 判断是否是静态资源
  return [
    'png',
    'jpg',
    'jpeg',
    'gif',
    'svg',
    'ico',
    'webp',
    'mp4',
    'webm',
    'ogg',
    'mp3',
    'wav',
    'flac',
    'aac',
    'woff',
    'woff2',
    'eot',
    'ttf',
    'otf',
  ].includes(ext);
}

export function configureAssetsCdnPlugin(cdnUrl: string): PluginOption {
  let assetsRoot: string;
  return {
    name: 'configure-assets-cdn',
    apply: 'build',
    configResolved(config) {
      assetsRoot = path.join(config.root, 'src/assets');
    },
    transform(code, id) {
      const ASSET_REGEX = /__VITE_ASSET__\w+__/g;
      let transformedCode = code;
      if (isAssets(id, assetsRoot)) {
        const fileInfo = id.split('/').pop()?.split('.');
        const [name, ext] = fileInfo ?? [];
        transformedCode = code.replace(ASSET_REGEX, (match) => {
          // 获取资源的实际路径
          const assetPath = match.replace(/__VITE_ASSET__|__/g, '');
          return `${cdnUrl}/assets/${name}.${assetPath}.${ext}`;
        });
      }
      return {
        code: transformedCode,
        map: null,
      };
    },
  };
}
