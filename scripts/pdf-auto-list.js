// scripts/pdf-auto-list.js
const fs = require('fs');
const path = require('path');

// 新增：防重复执行标记
let isScanned = false;

// 原生JS格式化文件大小
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 注册Hexo过滤器
hexo.extend.filter.register('before_generate', function() {
  // 新增：如果已经扫描过，直接返回
  if (isScanned) return;
  
  const pdfDir = path.join(hexo.source_dir, 'pdfFile');
  const pdfDataPath = path.join(hexo.source_dir, 'pdf-data.json');
  const pdfList = [];

  // 检查PDF目录是否存在
  if (!fs.existsSync(pdfDir)) {
    const emptyData = {
      count: 0,
      html: `
        <div class="pdf-empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 7H8a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2 2 2 0 0 1-2 2Z"></path>
            <path d="M16 20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-9"></path>
            <path d="M12 13v6"></path>
            <path d="M9 16h6"></path>
            <path d="M16 3v4"></path>
            <path d="M8 3v4"></path>
          </svg>
          <p>暂无PDF文件，请将文件放入 /source/pdfFile 目录</p>
        </div>
      `,
      updateTime: new Date().toLocaleString()
    };
    fs.writeFileSync(pdfDataPath, JSON.stringify(emptyData, null, 2));
    console.log('⚠️ PDF目录不存在：', pdfDir);
    isScanned = true; // 标记为已扫描
    return;
  }

  // 读取PDF文件并收集信息
  const files = fs.readdirSync(pdfDir);
  files.forEach(file => {
    if (path.extname(file).toLowerCase() === '.pdf') {
      const filePath = path.join(pdfDir, file);
      const stats = fs.statSync(filePath);
      pdfList.push({
        name: file.replace('.pdf', ''),
        path: `/pdfFile/${file}`,
        size: formatFileSize(stats.size),
        mtime: stats.mtime.toLocaleString(),
        category: getCategory(file)
      });
    }
  });

  // 按分类分组生成HTML
  const categories = {};
  pdfList.forEach(pdf => {
    if (!categories[pdf.category]) categories[pdf.category] = [];
    categories[pdf.category].push(pdf);
  });

  let html = '';
  Object.keys(categories).forEach(cat => {
    const pdfs = categories[cat];
    html += `<h2 class="pdf-category">${cat}<span class="count">${pdfs.length} 个文件</span></h2>`;
    html += '<div class="pdf-card-grid">';
    pdfs.forEach(p => {
      html += `
        <div class="pdf-card">
          <h3 class="pdf-card-title">${p.name}</h3>
          <div class="pdf-card-meta">
            <span>📦 ${p.size}</span>
            <span>📅 ${p.mtime}</span>
          </div>
          <div class="pdf-card-actions">
            <a href="${p.path}" target="_blank" class="pdf-btn preview-btn">在线预览</a>
            <a href="${p.path}" download class="pdf-btn download-btn">下载文件</a>
          </div>
        </div>
      `;
    });
    html += '</div>';
  });

  // 生成最终JSON文件
  const finalData = {
    count: pdfList.length,
    html: html,
    updateTime: new Date().toLocaleString()
  };
  fs.writeFileSync(pdfDataPath, JSON.stringify(finalData, null, 2));

  console.log(`✅ 成功扫描到 ${pdfList.length} 个PDF文件，已生成pdf-data.json`);
  isScanned = true; // 标记为已扫描
});

// 自定义分类规则
function getCategory(filename) {
  if (/git/i.test(filename)) return 'Git相关';
  if (/hexo/i.test(filename)) return 'Hexo博客';
  if (/python/i.test(filename)) return 'Python学习';
  if (/java/i.test(filename)) return 'Java开发';
  return '其他资源';
}