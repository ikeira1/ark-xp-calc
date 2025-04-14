document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    const target = e.target.getAttribute('data-section');
    document.getElementById(target).classList.add('active');
  });
});

function generateLevels() {
  const count = parseInt(document.getElementById("levelCount").value);
  const result = [];
  let xp = 0;
  for (let i = 0; i <= count; i++) {
    xp += Math.floor(5 + Math.pow(i, 1.5));
    result.push(`ExperiencePointsForLevel[${i}]=${xp}`);
  }
  const final = `LevelExperienceRampOverrides=(\n${result.join(",\n")}\n)`;
  document.getElementById("levelResult").textContent = final;
}

function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const regex = /ExperiencePointsForLevel\[\d+\]=(\d+)/g;
  let match, total = 0;
  while ((match = regex.exec(input)) !== null) {
    total += parseInt(match[1]);
  }
  document.getElementById("xpResult").textContent =
    `OverrideMaxExperiencePointsPlayer=70368744177664\nOverrideMaxExperiencePointsPlayer=${total}\nOverrideMaxExperiencePointsDino=${total}`;
}

function generateEngrams() {
  const count = parseInt(document.getElementById("engramsLevel").value);
  let result = "";
  for (let i = 0; i <= count; i++) {
    result += `OverridePlayerLevelEngramPoints=${Math.floor(8 + i / 5)}\n`;
  }
  document.getElementById("engramsResult").textContent = result;
}

function copyResult(id) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text);
}

function searchCraft() {
  const name = document.getElementById("searchCraftInput").value.trim();
  if (!name) return;

  const example = {
    "fabricator": {
      id: "PrimalItemStructure_Fabricator_C",
      cost: [
        { id: "PrimalItemResource_Wood_C", amount: 35 },
        { id: "PrimalItemResource_Sparkpowder_C", amount: 20 },
        { id: "PrimalItemResource_Crystal_C", amount: 25 },
        { id: "PrimalItemResource_Oil_C", amount: 10 },
        { id: "PrimalItemResource_Electronics_C", amount: 15 }
      ]
    }
  };

  const item = example[name.toLowerCase()];
  if (!item) {
    document.getElementById("craftResults").innerHTML = `<p>❌ لم يتم العثور على العنصر المطلوب</p>`;
    return;
  }

  const output = `ConfigOverrideItemCraftingCosts=(ItemClassString="${item.id}",BaseCraftingResourceRequirements=[\n${
    item.cost.map(c => `(ResourceItemTypeString="${c.id}",BaseResourceRequirement=${c.amount})`).join(",\n")
  }\n])`;

  document.getElementById("craftResults").innerHTML = `
    <h4>✅ كود التعديل:</h4>
    <pre>${output}</pre>
    <button onclick="navigator.clipboard.writeText(\`${output}\`)">📋 نسخ الكود</button>
  `;
}
