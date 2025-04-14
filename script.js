const sections = document.querySelectorAll('.section');
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    sections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(link.dataset.section).classList.add('active');
  });
});

function generateLevels() {
  const count = parseInt(document.getElementById('levelCount').value);
  let code = '';
  for (let i = 1; i <= count; i++) {
    code += `ExperiencePointsForLevel[${i}] = ${i * 100}\n`;
  }
  document.getElementById('levelResult').textContent = code;
}

function calculateXP() {
  const input = document.getElementById('xpInput').value;
  const lines = input.split(',').map(l => l.trim());
  const playerMax = lines[0]?.match(/(\d+)/g)?.pop() || 0;
  const dinoMax = lines[1]?.match(/(\d+)/g)?.pop() || 0;
  document.getElementById('xpResult').textContent = `
OverrideMaxExperiencePointsPlayer= ${playerMax}
OverrideMaxExperiencePointsDino= ${dinoMax}
`;
}

function generateEngrams() {
  const level = parseInt(document.getElementById('engramsLevel').value);
  let result = '';
  for (let i = 1; i <= level; i++) {
    result += `OverrideEngramLevelRequirement=${i}\n`;
  }
  document.getElementById('engramsResult').textContent = result;
}

function copyResult(id) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text);
}

function searchCraft() {
  const item = document.getElementById('searchCraftInput').value;
  if (!item) return;
  const craftResults = document.getElementById('craftResults');
  craftResults.innerHTML = `<h4>${item} 📦</h4>`;

  const rows = [
    { name: 'PrimalItemResource_Wood_C', amount: 25 },
    { name: 'PrimalItemResource_Stone_C', amount: 20 },
    { name: 'PrimalItemResource_MetalIngot_C', amount: 15 }
  ];

  rows.forEach(({ name, amount }) => addCraftRow(name, amount));

  const addBtn = document.createElement('button');
  addBtn.textContent = '➕ إضافة مورد';
  addBtn.className = 'add-btn';
  addBtn.onclick = () => addCraftRow('', '');
  craftResults.appendChild(addBtn);

  const copyBtn = document.createElement('button');
  copyBtn.textContent = '📋 نسخ الكود';
  copyBtn.onclick = () => {
    const inputs = craftResults.querySelectorAll('.craft-row');
    const config = Array.from(inputs).map(row => {
      const qty = row.querySelector('.qty').value || 1;
      const res = row.querySelector('.res').value || 'PrimalItemResource_Wood_C';
      return `(ItemClassString="${res}",BaseCraftingResourceRequirements=${qty})`;
    }).join(',');
    navigator.clipboard.writeText(`ConfigOverrideItemCraftingCosts=(ItemClassString="${item}",BaseCraftingResourceRequirements=(${config}))`);
  };
  craftResults.appendChild(copyBtn);
}

function addCraftRow(name, amount) {
  const row = document.createElement('div');
  row.className = 'craft-row';

  const qty = document.createElement('input');
  qty.type = 'number';
  qty.value = amount;
  qty.className = 'qty';

  const res = document.createElement('input');
  res.type = 'text';
  res.value = name;
  res.className = 'res';
  res.setAttribute('list', 'resourceList');

  const del = document.createElement('button');
  del.textContent = '🗑️';
  del.className = 'delete-btn';
  del.onclick = () => row.remove();

  row.appendChild(qty);
  row.appendChild(res);
  row.appendChild(del);

  document.getElementById('craftResults').appendChild(row);
}
