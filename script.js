document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function () {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(this.dataset.section).classList.add("active");
  });
});

function copyResult(id) {
  const el = document.getElementById(id);
  navigator.clipboard.writeText(el.textContent.trim());
}

function generateLevels() {
  const level = parseInt(document.getElementById("levelCount").value);
  if (isNaN(level) || level < 1) return;

  let result = "LevelExperienceRampOverrides=(";
  let xp = 5;
  for (let i = 0; i <= level; i++) {
    result += `ExperiencePointsForLevel[${i}]=${xp}${i === level ? "" : ","}`;
    xp += Math.floor(Math.sqrt(xp) * 1.5);
  }
  result += ")";
  document.getElementById("levelResult").textContent = result;
}

function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const matches = [...input.matchAll(/ExperiencePointsForLevel\[\d+\]=(\d+)/g)];
  const last = matches.at(-1)?.[1];
  const sum = matches.reduce((a, m) => a + parseInt(m[1]), 0);
  const result = `OverrideMaxExperiencePointsPlayer=${last}\nOverrideMaxExperiencePointsPlayer=${sum}\nOverrideMaxExperiencePointsDino=2147483647`;
  document.getElementById("xpResult").textContent = result;
}

function generateEngrams() {
  const level = parseInt(document.getElementById("engramsLevel").value);
  if (isNaN(level) || level < 1) return;
  let result = "";
  for (let i = 0; i <= level; i++) {
    const val = i === 0 ? 0 : Math.min(8 + Math.floor(i / 10) * 4, 260);
    result += `OverridePlayerLevelEngramPoints=${val}\n`;
  }
  document.getElementById("engramsResult").textContent = result.trim();
}

// ====== PerLevelStatsMultiplier Tool ======
const statsList = [
  { label: "(الصحة) Health", id: 0 },
  { label: "(القدرة على التحمل) Stamina", id: 1 },
  { label: "(الأوكسجين) Oxygen", id: 2 },
  { label: "(الطعام) Food", id: 3 },
  { label: "(الماء) Water", id: 4 },
  { label: "(الوزن) Weight", id: 5 },
  { label: "(الضرر الجسدي) Melee Damage", id: 6 },
  { label: "(السرعة) Movement Speed", id: 7 },
  { label: "(صناعة) Crafting Skill", id: 8 },
  { label: "(صمود) Fortitude", id: 9 },
  { label: "(الوعي) Torpidity", id: 10 },
  { label: "(غير معروف) Unknown", id: 11 }
];

function createStatsInputs(containerId, prefix) {
  const container = document.getElementById(containerId);
  statsList.forEach(stat => {
    const label = document.createElement("label");
    label.textContent = stat.label;
    const input = document.createElement("input");
    input.type = "number";
    input.step = "0.01";
    input.value = "1.0";
    input.dataset.index = stat.id;
    input.dataset.prefix = prefix;
    container.appendChild(label);
    container.appendChild(input);
  });
}

function generateStatsCode() {
  let result = "";
  document.querySelectorAll(".stats-table input").forEach(input => {
    const index = input.dataset.index;
    const prefix = input.dataset.prefix;
    const value = input.value || "1.0";
    result += `${prefix}[${index}]=${value}\n`;
  });
  document.getElementById("statsResult").textContent = result.trim();
}

createStatsInputs("playerStats", "PerLevelStatsMultiplier_Player");
createStatsInputs("tamedStats", "PerLevelStatsMultiplier_DinoTamed");
createStatsInputs("wildStats", "PerLevelStatsMultiplier_DinoWild");
