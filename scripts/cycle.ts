import { spawn } from 'child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { confirm, select } from '@inquirer/prompts';

const appsDir = path.resolve(import.meta.dirname, '../apps');


const cycleConfig = {
  game: {
    // https://cloud.bytedance.net/scm/detail/456342
    scm: 'ad/star/star_uniapp_game',
    appId: 'tt977ee1c308541d59',
    appSecret: '-2nx-wvBOHtcH1PFQl86gF3T7N90huFj',
  },
};

async function main() {
  const entries = (await fs.readdir(appsDir)).filter((entry) => !entry.startsWith('.'));

  const args = {
    microapp: await select({
      message: '请选择要发布的子应用',
      choices: entries.map((entry) => ({ name: entry, value: entry })),
    }),
    isPreview: await confirm({
      message: '是否发布 preview 版本？（preview 版本不占用测试通道，有效期一天，选 N 则为测试通道版本）',
      default: false,
    }),

  };
  const config = cycleConfig[args.microapp];
  if (!config) {
    // eslint-disable-next-line no-console
    console.error('未找到对应配置');
    return;
  }


  if (!args.isPreview) {
    const channel = await select({
      message: `选择发布通道，https://developer.open-douyin.com/microapp/${config.appId}/publish?tab=versioninfo`,
      choices: ['1', '2', '3', '4'].map((item) => ({ name: `通道${item}`, value: item })),
    });

    spawn('pnpm', [
      'twinkle',
      'cycle',
      `-p.channel=${channel}`,
      `-p.appId=${config.appId}`,
      `-p.appSecret=${config.appSecret}`,
      `-p.scm=${config.scm}`,
      'ppe_uniapp',
    ], {
      stdio: 'inherit',
    });
  } else {
    spawn('pnpm', [
      'twinkle',
      'cycle',
      `--templateId=618644572674`,
      `-p.appId=${config.appId}`,
      `-p.appSecret=${config.appSecret}`,
      `-p.scm=${config.scm}`,
      'ppe_uniapp',
    ], {
      stdio: 'inherit',
    });
  }
}


main();
