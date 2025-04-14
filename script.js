document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(this.dataset.section).classList.add('active');
  });
});

function copyResult(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text);
  alert("✅ تم نسخ الكود");
}

function generateLevels() {
  const level = parseInt(document.getElementById('levelCount').value);
  let result = '';
  for (let i = 1; i <= level; i++) {
    result += `LevelExperienceRampOverrides=(ExperiencePointsForLevel[${i}]=${(i * 1000) + 5})\n`;
  }
  document.getElementById('levelResult').innerText = result;
}

function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const xpRegex = /ExperiencePointsForLevel\[\d+\]=(\d+)/g;
  let match, totalXP = 0;
  while ((match = xpRegex.exec(input)) !== null) {
    totalXP += parseInt(match[1]);
  }
  let output = '';
  if (totalXP > 0) {
    output += `OverrideMaxExperiencePointsPlayer=70368744177664\n`;
    output += `OverrideMaxExperiencePointsPlayer=${totalXP}\n`;
    output += `OverrideMaxExperiencePointsDino=${totalXP}`;
  }
  document.getElementById("xpResult").innerText = output;
}

function generateEngrams() {
  const level = parseInt(document.getElementById("engramsLevel").value);
  let result = "";
  for (let i = 0; i < level; i++) {
    result += `OverridePlayerLevelEngramPoints=${(i < 10) ? 0 : 8 + Math.floor(i / 10) * 2}\n`;
  }
  document.getElementById("engramsResult").innerText = result;
}

const craftingData = {
  fabricator: {
    name: "Fabricator",
    resources: [
      { name: "Metal Ingot", code: "PrimalItemResource_MetalIngot_C", quantity: 35 },
      { name: "Sparkpowder", code: "PrimalItemResource_Sparkpowder_C", quantity: 20 },
      { name: "Oil", code: "PrimalItemResource_Oil_C", quantity: 25 },
      { name: "Crystal", code: "PrimalItemResource_Crystal_C", quantity: 15 },
      { name: "Electronics", code: "PrimalItemResource_Electronics_C", quantity: 20 },
    ]
  }
};

function searchCraft() {
  const query = document.getElementById("searchCraftInput").value.toLowerCase();
  const craft = craftingData[query];
  const container = document.getElementById("craftResults");
  container.innerHTML = "";

  if (!craft) {
    container.innerHTML = "❌ لم يتم العثور على العنصر.";
    return;
  }

  const title = document.createElement("h4");
  title.textContent = `📦 ${craft.name}`;
  container.appendChild(title);

  craft.resources.forEach((res, i) => {
    const row = document.createElement("div");
    row.className = "resource-row";
    row.innerHTML = `
      <input value="${res.name}" disabled />
      <input type="number" value="${res.quantity}" onchange="updateQuantity('${query}', ${i}, this.value)" />
    `;
    container.appendChild(row);
  });

  const copyBtn = document.createElement("button");
  copyBtn.textContent = "📋 نسخ الكود";
  copyBtn.onclick = () => copyCraftCode(query);
  container.appendChild(copyBtn);
}

function updateQuantity(item, index, value) {
  craftingData[item].resources[index].quantity = parseInt(value);
}

function copyCraftCode(item) {
  const res = craftingData[item].resources;
  let result = `ConfigOverrideItemCraftingCosts=(ItemClassString="${item}_C",BaseCraftingResourceRequirements=(`;
  result += res.map(r => `(ResourceItemTypeString="${r.code}",BaseResourceRequirement=${r.quantity})`).join(',');
  result += `))`;
  navigator.clipboard.writeText(result);
  alert("✅ تم نسخ كود التعديل");
}
