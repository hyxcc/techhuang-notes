export const site = {
  name: '技术黄的个人空间',
  shortName: 'HYX',
  description: '记录编码生活，技术分享，面试记录，兴趣爱好',
  url: import.meta.env.PUBLIC_SITE_URL ?? 'https://huangyingxu.top',
  email: '',
  navigation: [
    { label: '首页', href: '/' },
    { label: '文章', href: '/articles/' },
    { label: '阅读', href: '/reading/' },
    { label: '项目', href: '/projects/' },
    { label: '关于我', href: '/about/' },
  ],
};

export const categories = ['全部', 'Java 后端', 'AI 实践', '面试复盘', '生活记录'];
