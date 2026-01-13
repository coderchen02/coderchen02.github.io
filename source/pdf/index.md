---
title: PDF 资源库
date: 2026-01-09 17:48:50
layout: page
---

<!-- 纯静态HTML+CSS+前端JS，无任何Hexo模板标签 -->
<style>
  .pdf-library {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 15px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  .pdf-header {
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  .pdf-header h1 {
    color: #2d3748;
    font-size: 2rem;
    margin-bottom: 10px;
    position: relative;
    display: inline-block;
  }
  .pdf-header h1::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 10%;
    width: 80%;
    height: 3px;
    background: #4299e1;
    border-radius: 3px;
  }
  .pdf-category {
    color: #2d3748;
    font-size: 1.4rem;
    margin: 40px 0 20px 0;
    padding-left: 12px;
    border-left: 4px solid #4299e1;
    display: flex;
    align-items: center;
  }
  .pdf-category .count {
    background: #e8f4f8;
    color: #4299e1;
    font-size: 0.8rem;
    padding: 2px 8px;
    border-radius: 10px;
    margin-left: 10px;
  }
  .pdf-card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  .pdf-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
    padding: 20px;
    transition: all 0.3s ease;
    border: 1px solid #f7fafc;
    position: relative;
  }
  .pdf-card::before {
    content: "📄";
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 1.5rem;
    opacity: 0.1;
  }
  .pdf-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    border-color: #e8f4f8;
  }
  .pdf-card-title {
    color: #2d3748;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 12px;
  }
  .pdf-card-meta {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    font-size: 0.85rem;
    color: #718096;
  }
  .pdf-card-actions {
    display: flex;
    gap: 10px;
  }
  .pdf-btn {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    border-radius: 8px;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    color: white;
  }
  .preview-btn {
    background: #4299e1;
  }
  .preview-btn:hover {
    background: #3182ce;
  }
  .download-btn {
    background: #38b2ac;
  }
  .download-btn:hover {
    background: #319795;
  }
  .pdf-empty {
    text-align: center;
    padding: 80px 20px;
    color: #718096;
  }
  .pdf-footer {
    text-align: center;
    margin-top: 80px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    color: #a0aec0;
    font-size: 0.9rem;
  }
  @media (max-width: 768px) {
    .pdf-card-grid {
      grid-template-columns: 1fr;
    }
    .pdf-header h1 {
      font-size: 1.6rem;
    }
  }
</style>

<div class="pdf-library">
  <div class="pdf-header">
    <h1>📚 PDF 资源库</h1>
    <p>自动整理的学习资料 | 共 <span id="pdf-count" style="color: #4299e1; font-weight: 600;">0</span> 个文件</p>
  </div>

  <!-- PDF列表容器 -->
  <div id="pdf-list-container"></div>

  <div class="pdf-footer">
    <p id="update-time">🔄 最后更新：加载中...</p>
    <p style="margin-top: 8px;">仅限学习交流使用 | 资源自动同步更新</p>
  </div>
</div>

<!-- 前端JS读取JSON数据 -->
<script>
// 读取PDF数据JSON文件
fetch('/pdf-data.json')
  .then(response => {
    if (!response.ok) throw new Error('数据加载失败');
    return response.json();
  })
  .then(data => {
    // 更新文件数量
    document.getElementById('pdf-count').textContent = data.count;
    // 更新PDF列表
    document.getElementById('pdf-list-container').innerHTML = data.html;
    // 更新最后更新时间
    document.getElementById('update-time').textContent = `🔄 最后更新：${data.updateTime}`;
  })
  .catch(error => {
    console.error('加载PDF数据失败：', error);
    document.getElementById('pdf-list-container').innerHTML = `
      <div class="pdf-empty">
        <p>数据加载失败，请检查PDF文件目录</p>
      </div>
    `;
  });
</script>