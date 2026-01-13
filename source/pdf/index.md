---
title: PDF 资源库
date: 2026-01-09 17:48:50
layout: page
---

<!-- 自定义样式，适配Chic主题风格 -->
<style>
  /* 整体容器样式 */
  .pdf-library {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px 0;
  }

  /* 分类标题 */
  .pdf-category {
    font-size: 1.5rem;
    margin: 30px 0 15px 0;
    color: #333;
    border-left: 4px solid #666;
    padding-left: 10px;
  }

  /* PDF卡片容器 */
  .pdf-card-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  /* PDF卡片样式 */
  .pdf-card {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 15px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  /* 鼠标悬浮效果 */
  .pdf-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    border-color: #ccc;
  }

  /* PDF标题 */
  .pdf-title {
    font-size: 1rem;
    margin: 0 0 10px 0;
    color: #222;
  }

  /* 按钮组 */
  .pdf-actions {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }

  /* 预览/下载按钮 */
  .pdf-btn {
    flex: 1;
    text-align: center;
    padding: 8px 0;
    border-radius: 4px;
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.2s ease;
  }

  .preview-btn {
    background: #0078e7;
    color: white;
  }

  .download-btn {
    background: #666;
    color: white;
  }

  .pdf-btn:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }

  /* 说明文字 */
  .pdf-desc {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 10px 0 0 0;
  }

  /* 移动端适配 */
  @media (max-width: 768px) {
    .pdf-card-list {
      grid-template-columns: 1fr;
    }
  }
</style>

<div class="pdf-library">
  <!-- 页面头部说明 -->
  <h1 style="text-align: center; margin: 20px 0; color: #333;">📚 PDF 资源库</h1>
  <p style="text-align: center; color: #666; margin-bottom: 40px;">整理的技术学习、工具使用类PDF，可在线预览或下载</p>

  <!-- 第一类：Git相关 -->
  <h2 class="pdf-category">Git 相关</h2>
  <div class="pdf-card-list">
    <!-- Git的原理与应用 -->
    <div class="pdf-card">
      <h3 class="pdf-title">Git的原理与应用</h3>
      <p class="pdf-desc">详解Git底层原理、常用命令及实战应用，适合入门到进阶学习</p>
      <div class="pdf-actions">
        <a href="/pdfFile/Git的原理与应用.pdf" target="_blank" class="pdf-btn preview-btn">在线预览</a>
        <a href="/pdfFile/Git的原理与应用.pdf" download class="pdf-btn download-btn">下载文件</a>
      </div>
    </div>

    <!-- 可复制上面的pdf-card块添加更多Git相关PDF -->
    <!--
    <div class="pdf-card">
      <h3 class="pdf-title">Git进阶实战</h3>
      <p class="pdf-desc">Git分支管理、冲突解决、团队协作高级技巧</p>
      <div class="pdf-actions">
        <a href="/pdfFile/Git进阶实战.pdf" target="_blank" class="pdf-btn preview-btn">在线预览</a>
        <a href="/pdfFile/Git进阶实战.pdf" download class="pdf-btn download-btn">下载文件</a>
      </div>
    </div>
    -->
  </div>

  <!-- 第二类：Hexo相关（可根据你的PDF分类修改） -->
  <h2 class="pdf-category">Hexo 博客搭建</h2>
  <div class="pdf-card-list">
    <!-- 示例：Hexo从入门到精通 -->
    <div class="pdf-card">
      <h3 class="pdf-title">Hexo从入门到精通</h3>
      <p class="pdf-desc">Hexo安装、主题配置、插件使用、部署上线全流程教程</p>
      <div class="pdf-actions">
        <a href="/pdfFile/Hexo从入门到精通.pdf" target="_blank" class="pdf-btn preview-btn">在线预览</a>
        <a href="/pdfFile/Hexo从入门到精通.pdf" download class="pdf-btn download-btn">下载文件</a>
      </div>
    </div>
  </div>

  <!-- 第三类：其他资源（可自定义分类） -->
  <h2 class="pdf-category">其他技术资源</h2>
  <div class="pdf-card-list">
    <!-- 可继续添加更多PDF卡片 -->
  </div>

  <!-- 底部说明 -->
  <div style="text-align: center; margin-top: 60px; color: #999; font-size: 0.8rem;">
    <p>📌 所有PDF仅用于学习交流，请勿用于商业用途</p>
    <p>🗂️ 资源持续更新中，欢迎收藏本页面</p>
  </div>
</div>