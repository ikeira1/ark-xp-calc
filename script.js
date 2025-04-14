const sections = document.querySelectorAll(".section");
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    const target = link.dataset.section;
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  });
});

function generateLevels() {
  const count = parseInt(document.getElementById("levelCount").value);
  if (!count || count < 1) return;
  let output = 'LevelExperienceRampOverrides=(ExperiencePointsForLevel[0]=5';
  let xp = 5;
  for (let i = 1; i < count; i++) {
    xp += Math.floor(5 + i * 5.5);
    output += `,ExperiencePointsForLevel[${i}]=${xp}`;
  }
  output += ')';
  document.getElementById("levelResult").innerText = output;
}

function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const regex = /ExperiencePointsForLevel\[\d+\]=(\d+)/g;
  let total = 0;
  let match;
  while ((match = regex.exec(input)) !== null) {
    total += parseInt(match[1]);
  }
  document.getElementById("xpResult").innerText =
    `OverrideMaxExperiencePointsPlayer=70368744177664\nOverrideMaxExperiencePointsPlayer=${total}\nOverrideMaxExperiencePointsDino=${total}`;
}

function generateEngrams() {
  const level = parseInt(document.getElementById("engramsLevel").value);
  if (!level || level < 1) return;
  const levels = [
    { until: 10, amount: 8 },
    { until: 20, amount: 14 },
    { until: 30, amount: 18 },
    { until: 40, amount: 24 },
    { until: 50, amount: 28 },
    { until: 60, amount: 36 },
    { until: 70, amount: 50 },
    { until: 80, amount: 70 },
    { until: 90, amount: 80 },
    { until: 100, amount: 100 },
    { until: 110, amount: 110 },
    { until: 120, amount: 125 },
    { until: 130, amount: 135 },
    { until: 140, amount: 120 },
    { until: level + 1, amount: 220 }
  ];
  let output = '';
  for (let i = 1; i <= level; i++) {
    const eng = levels.find(l => i < l.until);
    output += `OverridePlayerLevelEngramPoints=${eng.amount}\n`;
  }
  document.getElementById("engramsResult").innerText = output;
}

function copyResult(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(() => alert("تم النسخ!"));
}

function searchCraft() {
  const term = document.getElementById("searchCraftInput").value.toLowerCase();
  const resultDiv = document.getElementById("craftResults");
  resultDiv.innerHTML = "";
  const items = {
    fabricator: {
      image: "https://ark.wiki.gg/images/1/1a/Fabricator.png",
      resources: [
        ["PrimalItemResource_MetalIngot_C", 35],
        ["PrimalItemResource_CementingPaste_C", 20],
        ["PrimalItemResource_Crystal_C", 15],
        ["PrimalItemResource_Oil_C", 10],
        ["PrimalItemResource_Sparkpowder_C", 50]
      ]
    }
  };
  const item = items[term];
  if (item) {
    const code = `ConfigOverrideItemCraftingCosts=(ItemClassString="${term}_C",BaseCraftingResourceRequirements=(${item.resources.map(([res, amt]) =>
      `(ResourceItemTypeString="${res}",BaseResourceRequirement=${amt})`
    ).join(',')}))`;
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${item.image}" style="width:100px"><br>
      <code>${code}</code>
      <button onclick="navigator.clipboard.writeText(\`${code}\`)">نسخ</button>
    `;
    resultDiv.appendChild(div);
  } else {
    resultDiv.innerHTML = "لم يتم العثور على عنصر.";
  }
}

