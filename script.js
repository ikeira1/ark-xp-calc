
function showTool(toolId) {
  const tools = document.querySelectorAll('.tool-section');
  tools.forEach(tool => tool.style.display = 'none');
  document.getElementById(toolId).style.display = 'block';
}

// تحميل الأدوات من ملفات خارجية
window.onload = () => {
  const sections = ['levels', 'xpcalc', 'engrams', 'crafting'];
  sections.forEach(section => {
    fetch(`tools/${section}.html`)
      .then(res => res.text())
      .then(data => {
        document.getElementById(section).innerHTML = data;
      });
  });
};
