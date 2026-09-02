# 写作指南

文章保存在 `src/content/blog/` 目录，每篇文章都是一个 Markdown 文件。

发布新文章时，复制一篇现有的 `.md` 文件并修改：

- 文件名：文章网址，只使用小写字母、数字和连字符
- `title`：文章标题
- `description`：列表页摘要
- `date`：发布日期，格式为 `YYYY-MM-DD`
- `updatedDate`：可选，文章修订日期
- `category`：文章分类
- `readingTime`：预计阅读时间
- `tags`：标签
- `series`：可选，文章所属专题系列
- `seriesOrder`：可选，文章在系列中的阅读顺序
- Frontmatter 下方：使用 Markdown 编写正文

可用文章分类：

- `Java 后端`
- `AI 实践`
- `面试复盘`
- `生活记录`

## 发布项目案例

项目案例保存在 `src/content/projects/` 目录。字段包括：

- `title`：项目名称
- `description`：项目摘要
- `date`：记录日期
- `status`：`规划中`、`迭代中` 或 `已完成`
- `tech`：技术栈
- `featured`：是否在首页展示
- `draft`：是否隐藏
- `repository`：可选的代码仓库地址
- `website`：可选的项目地址

## 发布阅读记录

阅读记录保存在 `src/content/reading/` 目录。字段包括：

- `title`：书名
- `author`：作者
- `description`：阅读摘要
- `status`：`reading`、`interested` 或 `finished`
- `category`：`技术`、`思维`、`文学`、`生活`、`个人成长` 或 `其他`
- `addedDate`：加入阅读清单的日期
- `startedDate`：开始阅读日期
- `finishedDate`：完成阅读日期
- `progress`：`reading` 状态下的百分比
- `tags`：阅读主题标签
- `externalUrl`：可选的书籍信息地址
- `draft`：是否隐藏

## 发布读书笔记

读书笔记保存在 `src/content/reading-notes/` 目录。一条笔记对应一次阅读后的总结，通过 `book` 绑定到 `src/content/reading/` 中同名文件的文件名（不含 `.md`）。字段包括：

- `title`：本次笔记标题
- `book`：关联书籍的文件名，例如 `隐性逻辑`
- `recordedAt`：记录时间，建议写完整日期和时间，例如 `2026-09-01T21:30:00+08:00`
- `chapter`：关联章节
- `pages`：页码或页码范围，例如 `120–128`
- `relatedContent`：可选，关联的原文或内容摘要
- `tags`：本次笔记的主题标签
- `draft`：是否为草稿

Frontmatter 下方的 Markdown 正文用于写本次阅读总结。可以复制 `src/content/reading-notes/example.md` 作为模板。

个人信息和邮箱在 `src/data/site.ts` 顶部的 `site` 对象中修改。站点地址通过 `PUBLIC_SITE_URL` 环境变量设置。

GitHub Pages 自动部署已经在 `.github/workflows/deploy.yml` 中配置。

本地启动：

```bash
npm run dev
```

生成上线文件：

```bash
npm run build
```
