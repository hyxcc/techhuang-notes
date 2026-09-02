# 技术黄的个人空间

HYX 的中文技术博客与个人项目空间，记录 Java 后端、AI 实践、面试经验，以及骑行、旅行和阅读。

## 本地开发

需要 Node.js 18.17 或更高版本。

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 发布文章

文章位于 `src/content/blog/`。复制一篇现有的 Markdown 文件，修改文件名、Frontmatter 和正文即可。

完整字段说明见 `WRITING.md`。

项目案例位于 `src/content/projects/`，同样使用 Markdown 编写。

阅读记录位于 `src/content/reading/`，支持最近在读、感兴趣和已读归档。读书笔记位于 `src/content/reading-notes/`，每篇笔记通过 `book` 字段绑定书籍，并记录时间、章节、页码和关联内容。

文章设为草稿时不会出现在网站或 RSS：

```yaml
draft: true
```

## 修改个人信息

编辑 `src/data/site.ts`：

- 博客名称与简介
- 显示名称
- 联系邮箱
- 导航

## 部署到 GitHub Pages

推荐创建名为 `<GitHub用户名>.github.io` 的公开仓库。

1. 将本项目推送到仓库的 `main` 分支。
2. 在仓库 `Settings > Pages` 中将 Source 设为 `GitHub Actions`。
3. 等待 `Deploy to GitHub Pages` 工作流完成。
4. 访问 `https://<GitHub用户名>.github.io`。

工作流会自动设置正式站点地址，并生成对应的 canonical、RSS、Sitemap 和 robots 配置。

## 绑定独立域名

购买域名后，在 GitHub Pages 设置中填写 Custom domain，并将工作流里的 `PUBLIC_SITE_URL` 改成完整域名，例如：

```yaml
PUBLIC_SITE_URL: https://blog.example.com
```
