document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const section = e.target.dataset.section;
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(section).classList.add("active");
  });
});

function copyResult(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text);
}

function generateLevels() {
  const count = parseInt(document.getElementById("levelCount").value);
  if (!count || count < 1) return;

  let xp = 5;
  let result = "LevelExperienceRampOverrides=(";
  for (let i = 0; i <= count; i++) {
    result += `ExperiencePointsForLevel[${i}]=${xp}`;
    if (i < count) result += ",";
    xp += Math.floor(i * 1.2) + 1;
  }
  result += ")";
  document.getElementById("levelResult").innerText = result;
}

function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const regex = /ExperiencePointsForLevel\[\d+\]=(\d+)/g;
  let match;
  let total = 0;
  while ((match = regex.exec(input)) !== null) {
    total += parseInt(match[1]);
  }
  const result = `OverrideMaxExperiencePointsPlayer=${total}\nOverrideMaxExperiencePointsPlayer=${total}\nOverrideMaxExperiencePointsDino=2147483647`;
  document.getElementById("xpResult").innerText = result;
}

function generateEngrams() {
  const level = parseInt(document.getElementById("engramsLevel").value);
  if (!level || level < 1) return;

  let result = "";
  const ranges = [
    { max: 9, val: 8 }, { max: 19, val: 14 },
    { max: 29, val: 18 }, { max: 39, val: 24 },
    { max: 49, val: 28 }, { max: 59, val: 36 },
    { max: 72, val: 50 }, { max: 80, val: 70 },
    { max: 86, val: 80 }, { max: 90, val: 100 },
    { max: 95, val: 110 }, { max: 97, val: 125 },
    { max: 99, val: 135 }, { max: 1000, val: 220 }
  ];

  for (let i = 0; i <= level; i++) {
    const r = ranges.find(r => i <= r.max);
    result += `OverridePlayerLevelEngramPoints=${i === 0 ? 0 : r.val}\n`;
  }

  document.getElementById("engramsResult").innerText = result.trim();
}

// =============== STATS =================

const stats = [
  ["Health", "الصحة"], ["Stamina", "القدرة على التحمل"], ["Torpidity", "الخدر"],
  ["Oxygen", "الأوكسجين"], ["Food", "الطعام"], ["Water", "الماء"],
  ["Temperature", "درجة الحرارة"], ["Weight", "الوزن"], ["MeleeDamage", "الضرر"],
  ["Speed", "السرعة"], ["TemperatureFort", "التحمل الحراري"], ["Crafting", "الاحتراف"]
];

["Player", "DinoTamed", "DinoWild"].forEach(type => {
  const container = document.querySelector(`.stats-${type.toLowerCase()}`);
  stats.forEach((s, i) => {
    const label = document.createElement("label");
    label.innerText = `${s[0]} (${s[1]})`;
    const input = document.createElement("input");
    input.type = "number";
    input.step = "0.01";
    input.value = "1.0";
    input.dataset.index = i;
    container.appendChild(label);
    container.appendChild(input);
  });
});

function generateStats() {
  let result = "";
  ["Player", "DinoTamed", "DinoWild"].forEach(type => {
    const inputs = document.querySelectorAll(`.stats-${type.toLowerCase()} input`);
    inputs.forEach(input => {
      const i = input.dataset.index;
      result += `PerLevelStatsMultiplier_${type}[${i}]=${input.value}\n`;
    });
  });
  document.getElementById("statsResult").innerText = result.trim();
}
