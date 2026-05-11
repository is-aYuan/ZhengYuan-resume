import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const files = [
  'index.html',
  'styles.css',
  'script.js',
  'assets/avatar.png',
  'assets/douyin-profile.png',
  'assets/oransim-interface.png',
  'assets/story-workshop-page.png',
];

test('static website files exist', () => {
  for (const file of files) {
    assert.equal(existsSync(file), true, `${file} should exist`);
  }
});

test('homepage contains the required resume sections and interactive hooks', () => {
  const html = readFileSync('index.html', 'utf8');

  for (const id of [
    'about',
    'basic-info',
    'education',
    'experience',
    'projects',
    'portfolio',
    'personal',
    'self-evaluation',
    'contact',
    'detail-panel',
  ]) {
    assert.match(html, new RegExp(`id="${id}"`), `missing #${id}`);
  }

  const expectedNavOrder = [
    'href="#basic-info">信息',
    'href="#education">教育',
    'href="#experience">实习/项目',
    'href="#personal">个人经历',
    'href="#projects">项目详情',
    'href="#portfolio">链接与作品展示',
    'href="#contact">联系',
  ];
  let previousNavPosition = -1;
  for (const marker of expectedNavOrder) {
    const navPosition = html.indexOf(marker);
    assert.notEqual(navPosition, -1, `missing nav marker: ${marker}`);
    assert.ok(navPosition > previousNavPosition, `${marker} should appear after the previous nav item`);
    previousNavPosition = navPosition;
  }

  const expectedSectionOrder = [
    'id="basic-info"',
    'id="education"',
    'id="experience"',
    'id="personal"',
    'id="projects"',
    'id="contact"',
  ];
  let previousSectionPosition = -1;
  for (const marker of expectedSectionOrder) {
    const sectionPosition = html.indexOf(marker);
    assert.notEqual(sectionPosition, -1, `missing section marker: ${marker}`);
    assert.ok(sectionPosition > previousSectionPosition, `${marker} should appear after the previous section`);
    previousSectionPosition = sectionPosition;
  }

  assert.match(html, /郑远/);
  assert.match(html, /AI 产品经理/);
  assert.match(html, /AI 产品经理 \/ AI 创业项目发起人（OPC） \/ 抖音千万流量·深度合作独家签约作者/);
  assert.match(html, /香港中文大学/);
  assert.match(html, /武汉理工大学/);
  assert.match(html, /<strong>武汉理工大学·本科<\/strong>/);
  assert.match(html, /软件工程；GPA 3\.99\/5/);
  assert.match(html, /橙果视界科技有限公司/);
  assert.match(html, /金山办公/);
  assert.match(html, /定制化音乐播放器/);
  assert.match(html, /SVG 编辑器/);
  assert.match(html, /图片相册管理工具/);
  assert.match(html, /data-detail-id="project-wps-music"/);
  assert.match(html, /data-detail-id="project-wps-svg"/);
  assert.match(html, /data-detail-id="project-wps-album"/);
  assert.match(html, /2024年 - 至今/);
  assert.match(html, /AI 老年自传项目/);
  assert.match(html, /1000w/);
  assert.ok(
    html.indexOf('data-detail-id="creator-douyin"') < html.indexOf('data-detail-id="intern-orange-vision"'),
    'creator-douyin should be the first timeline card'
  );
  assert.match(html, /邮箱：18486162501@163\.com/);
  assert.match(html, /微信：ayuan_wwhs \/ 18486162501/);
  assert.match(html, /QQ：2174628944/);
  assert.match(html, /电话：15623191229/);
  assert.match(html, /href="https:\/\/github\.com\/is-aYuan\/story-workshop\.git"/);
  assert.match(html, /href="https:\/\/github\.com\/OranAi-Ltd\/oransim"/);
  assert.match(html, /href="https:\/\/v\.douyin\.com\/HfoNdhWi0bo\/"/);
  assert.match(html, /<img src="assets\/story-workshop-page\.png" alt="AI 老年自传程序页面截图"/);
  assert.match(html, /故事坊（程序界面图展示-AI老年自传项目）/);
  assert.match(html, /class="portfolio-title-link"[\s\S]*href="https:\/\/github\.com\/is-aYuan\/story-workshop\.git"[\s\S]*故事坊（程序界面图展示-AI老年自传项目）/);
  assert.match(html, /计划2026年7月进行内部测试与灰度测试，8月小范围上线测试。/);
  assert.match(html, /<img src="assets\/oransim-interface\.png" alt="OranSim 界面截图"/);
  assert.match(html, /OranSim（AI 智能模拟系统界面图展示）/);
  assert.match(html, /class="portfolio-title-link"[\s\S]*href="https:\/\/github\.com\/OranAi-Ltd\/oransim"[\s\S]*OranSim（AI 智能模拟系统界面图展示）/);
  assert.match(html, /<img src="assets\/douyin-profile\.png" alt="抖音主页作品截图"/);
  assert.match(html, /抖音主页详情（点击查看）/);
  assert.match(html, /class="portfolio-title-link"[\s\S]*href="https:\/\/v\.douyin\.com\/HfoNdhWi0bo\/"[\s\S]*抖音主页详情（点击查看）/);
  assert.match(html, /内容策划 \+ 个人运营 \+ 品牌合作 \+ 数据驱动内容增长/);
  assert.match(html, /自媒体千万级流量运营方法论组合成可落地的 AI 产品商业化能力/);
  assert.match(html, /内容创作/);
  assert.match(html, /独立运营个人媒体账号，抖音端流量超 1000w，获赞超 100w\+/);
  assert.match(html, /建立数据驱动的选题与迭代机制/);
  assert.match(html, /品牌合作/);
  assert.match(html, /与 10\+个品牌方合作定制视频内容/);
  assert.match(html, /洞察能力/);
  assert.match(html, /具备从用户视角定义内容需求/);
  assert.match(html, /AI 赋能/);
  assert.match(html, /主动探索 AIGC 生成内容与实拍素材融合/);
  assert.match(html, /互联网\+项目团队负责人/);
  assert.match(html, /多项目工程实践/);
  assert.match(html, /独立或协作完成 Qt 客户端、物流模拟、计费系统/);
  assert.match(html, /工程背景 × 产品思维：具备前端与客户端双端开发能力/);
  assert.match(html, /AI 产品实践：主导 AI 老年数字自传平台从 0 到 1 设计落地/);
  assert.match(html, /用户增长认知：个人短视频账号累计播放量 1000 万\+/);
  assert.match(html, /0 到 1 交付经验：主导多个工具类产品从需求定义到功能上线/);
  assert.match(html, /data-detail-id=/);
  assert.match(html, /aria-modal="true"/);
  assert.match(html, /<h2 id="experience-title">实习\/项目<\/h2>/);
  assert.match(html, /<h2 id="projects-title">项目详情<\/h2>/);
  assert.match(html, /<img class="avatar-photo" src="assets\/avatar\.png" alt="郑远证件照"/);
  assert.doesNotMatch(html, /AI Product Portfolio/);
  assert.doesNotMatch(html, /AI 产品经理 \/ AI 创业项目发起人（OPC） \/ 抖音独家签约内容创作者/);
  assert.doesNotMatch(html, /深圳 \/ 香港方向，关注 AI 产品/);
  assert.doesNotMatch(html, /school-mark/);
  assert.doesNotMatch(html, /核心能力亮点/);
  assert.doesNotMatch(html, />个人<\/a>/);
  assert.doesNotMatch(html, />经历<\/a>/);
  assert.doesNotMatch(html, />项目<\/a>/);
  assert.doesNotMatch(html, /项目作品/);
  assert.doesNotMatch(html, /长期运营/);
  assert.doesNotMatch(html, /<section class="metrics/);
  assert.doesNotMatch(html, /在橙果视界负责 AIGC 达人营销协作平台 OranMed 与 AI 智能模拟系统 OranSim。/);
  assert.doesNotMatch(html, /抖音端累计流量超 1000w，获赞超 100w，具备内容策划、传播和商业交付意识。/);
  assert.doesNotMatch(html, /首页展示时间、组织、角色与成果摘要/);
  assert.doesNotMatch(html, /真实链接还没有提供/);
  assert.doesNotMatch(html, /AI 产品、AIGC 项目、内容增长，欢迎联系/);
  assert.doesNotMatch(html, /开源项目链接待补充/);
  assert.doesNotMatch(html, /AI 项目 Demo 待补充/);
  assert.doesNotMatch(html, /项目截图与作品图片待补充/);
  assert.doesNotMatch(html, /抖音主页链接待补充/);
  assert.doesNotMatch(html, /旅行内容账号作品页截图，展示高播放作品矩阵与账号内容风格。/);
  assert.doesNotMatch(html, />AI 老年自传程序页面截图<\/strong>/);
  assert.doesNotMatch(html, />抖音主页作品截图<\/strong>/);
  assert.doesNotMatch(html, /class="portfolio-list"/);
  assert.doesNotMatch(html, /class="portfolio-link"/);
});

test('styles include responsive layout and focus states', () => {
  const css = readFileSync('styles.css', 'utf8');

  assert.match(css, /@media\s*\(max-width:\s*760px\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /--accent/);
  assert.match(css, /\.avatar-photo/);
  assert.match(css, /\.portfolio-showcase/);
  assert.match(css, /\.portfolio-showcase\.is-wide/);
  assert.match(css, /\.portfolio-screenshot/);
  assert.match(css, /\.portfolio-title-link/);
  assert.match(css, /\.record-action\s*{[^}]*grid-column:\s*1\s*\/\s*-1;[^}]*justify-self:\s*center;/s);
  assert.match(css, /\.footer-links\s*{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\);/s);
  assert.doesNotMatch(css, /\.record-action\s*{[^}]*justify-self:\s*start;/s);
  assert.doesNotMatch(css, /\.portfolio-list/);
  assert.doesNotMatch(css, /\.portfolio-link/);
});

test('script defines structured resume data and detail panel behavior', () => {
  const js = readFileSync('script.js', 'utf8');

  assert.match(js, /const resumeData =/);
  assert.match(js, /OranMed/);
  assert.match(js, /OranSim/);
  assert.match(js, /图片相册管理工具/);
  assert.match(js, /本地导入\/在线检索\/歌词匹配\/专辑信息/);
  assert.match(js, /图形绘制、版本管理、多工具切换/);
  assert.match(js, /高效浏览\/筛选\/展示/);
  assert.match(js, /MP3\/WAV\/FLAC\/AAC\/OGG/);
  assert.match(js, /AIGC 适老化内容生产工作流/);
  assert.match(js, /https:\/\/github\.com\/is-aYuan\/story-workshop\.git/);
  assert.match(js, /https:\/\/github\.com\/OranAi-Ltd\/oransim\.git/);
  assert.match(js, /https:\/\/v\.douyin\.com\/HfoNdhWi0bo\//);
  assert.match(js, /function openDetail/);
  assert.match(js, /function closeDetail/);
  assert.match(js, /querySelectorAll\('\[data-detail-id\]'\)/);
  assert.doesNotMatch(js, /抖音主页待补充/);
  assert.doesNotMatch(js, /meta: '长期运营/);
  assert.doesNotMatch(js, /待补充/);
});
