const sections = document.querySelectorAll(".section");
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = link.getAttribute("data-section");
    sections.forEach(section => section.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  });
});

function generateLevels() {
  const count = parseInt(document.getElementById("levelCount").value);
  if (!count || count < 1) return;

  let result = "LevelExperienceRampOverrides=(ExperiencePointsForLevel[0]=5";
  let xp = 5;

  for (let i = 1; i <= count; i++) {
    xp += Math.floor(5 + i * 10.5);
    result += `,ExperiencePointsForLevel[${i}]=${xp}`;
  }
  result += ")";
  document.getElementById("levelResult").textContent = result;
}

function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const xpRegex = /ExperiencePointsForLevel\[\d+\]=(\d+)/g;
  let match, total = 0;

  while ((match = xpRegex.exec(input)) !== null) {
    total += parseInt(match[1]);
  }

  if (total > 0) {
    document.getElementById("xpResult").textContent = 
      `OverrideMaxExperiencePointsPlayer=70368744177664\nOverrideMaxExperiencePointsPlayer=${total}\nOverrideMaxExperiencePointsDino=${total}`;
  }
}

function generateEngrams() {
  const level = parseInt(document.getElementById("engramsLevel").value);
  if (!level || level < 1) return;

  const points = [
    { range: [1, 9], value: 8 },
    { range: [10, 19], value: 14 },
    { range: [20, 29], value: 18 },
    { range: [30, 39], value: 24 },
    { range: [40, 49], value: 28 },
    { range: [50, 59], value: 36 },
    { range: [60, 73], value: 50 },
    { range: [74, 81], value: 70 },
    { range: [82, 87], value: 80 },
    { range: [88, 92], value: 100 },
    { range: [93, 97], value: 110 },
    { range: [98, 99], value: 125 },
    { range: [100, 101], value: 135 },
    { range: [102, 103], value: 120 },
    { range: [104, 116], value: 220 },
    { range: [117, level], value: 260 }
  ];

  let result = "";
  for (let i = 1; i <= level; i++) {
    for (const p of points) {
      if (i >= p.range[0] && i <= p.range[1]) {
        result += `OverridePlayerLevelEngramPoints=${p.value}\n`;
        break;
      }
    }
  }
  document.getElementById("engramsResult").textContent = result;
}

function copyResult(id) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text);
}

function searchCraft() {
  const name = document.getElementById("searchCraftInput").value.toLowerCase();
  const resultsDiv = document.getElementById("craftResults");

  const sampleItems = {
    fabricator: [
      { resource: "MetalIngot", amount: 35 },
      { resource: "Sparkpowder", amount: 20 },
      { resource: "Crystal", amount: 25 },
      { resource: "Oil", amount: 10 },
      { resource: "Electronics", amount: 15 }
    ],
    campfire: [
      { resource: "Stone", amount: 12 },
      { resource: "Thatch", amount: 5 },
      { resource: "Wood", amount: 3 }
    ]
  };

  const item = Object.entries(sampleItems).find(([key]) => key.includes(name));
  if (!item) {
    resultsDiv.innerHTML = "لم يتم العثور على العنصر.";
    return;
  }

  const [itemName, resources] = item;
  let html = `<h4>${itemName}</h4><ul>`;
  resources.forEach((res, index) => {
    html += `
      <li>
        <input type="text" value="${res.resource}" id="res-name-${index}" />
        <input type="number" value="${res.amount}" id="res-amount-${index}" />
      </li>`;
  });
  html += `</ul>
    <button onclick="generateCraft('${itemName}', ${resources.length})">🎯 توليد الكود</button>
    <pre id="craftCodeResult"></pre>
    <button onclick="copyResult('craftCodeResult')">📋 نسخ الكود</button>
  `;
  resultsDiv.innerHTML = html;
}

function generateCraft(name, count) {
  let code = `ConfigOverrideItemCraftingCosts=(ItemClassString="${name}_C",BaseCraftingResourceRequirements=[`;
  for (let i = 0; i < count; i++) {
    const res = document.getElementById(`res-name-${i}`).value;
    const amt = document.getElementById(`res-amount-${i}`).value;
    code += `(ResourceItemTypeString="${res}_C",BaseResourceRequirement=${amt}),`;
  }
  code = code.replace(/,$/, "") + "])";
  document.getElementById("craftCodeResult").textContent = code;
}
