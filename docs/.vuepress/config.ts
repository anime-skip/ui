import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';
import { path } from '@vuepress/utils';
import fs from 'fs';

function getAllFiles(rootPath: string): string[] {
  const paths = [];
  const queue = [rootPath];
  while (queue.length > 0) {
    const currentFile = queue.shift();
    const stat = fs.lstatSync(currentFile);
    if (stat.isDirectory()) {
      fs.readdirSync(currentFile)
        .map(filename => path.resolve(currentFile, filename))
        .sort()
        .forEach(filePath => queue.push(filePath));
    } else if (stat.isFile()) {
      paths.push(currentFile);
    } else {
      console.log('Unknown file type:', currentFile);
    }
  }

  return paths;
}

function generateComponentMap(baseDir: string) {
  const files = getAllFiles(baseDir).filter(
    file => !file.endsWith('index.ts') && !file.endsWith('types.ts')
  );

  const components = files.reduce((map, file) => {
    const componentName = path.basename(file).replace('.vue', '');
    map[componentName] = file;
    return map;
  }, {} as Record<string, string>);

  // console.log(components);
  return components;
}

export default defineUserConfig<DefaultThemeOptions>({
  // site config
  lang: 'en-US',
  title: 'Anime Skip UI',
  description: 'UI component library for Anime Skip',

  head: [
    ['link', { rel: 'stylesheet', href: path.resolve(process.cwd(), 'src/lib/styles/index.scss') }],
  ],

  // Plugins
  // plugins: [
  //   [
  //     '@vuepress/register-components',
  //     {
  //       components: generateComponentMap('./src/lib/components'),
  //     },
  //   ],
  // ],

  // theme and its config
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: 'https://assets.aws.anime-skip.com/images/transparent-logo.png',
    darkMode: true,
    sidebar: [
      { text: 'Guide', target: '/', link: '/', activeMatch: '/' },
      {
        text: 'Text',
        collapsible: true,
        children: [
          '/text/Heading1',
          '/text/Heading2',
          '/text/Heading3',
          '/text/Heading4',
          '/text/Heading5',
          '/text/Heading6',
          '/text/Subtitle1',
          '/text/Subtitle2',
          '/text/Body1',
          '/text/Body2',
          '/text/ButtonText',
          '/text/Caption',
          '/text/Overline',
        ],
      },
      {
        text: 'Components',
        children: ['/components/Surface'],
      },
    ],
  },
});
