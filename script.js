document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function () {
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    const section = this.getAttribute("data-section");
    document.getElementById(section).classList.add("active");
  });
});

function copyResult(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text);
}

function generateLevels() {
  const count = parseInt(document.getElementById("levelCount").value);
  const base = 5;
  let xp = base, result = "LevelExperienceRampOverrides=(";
  for (let i = 0; i <= count; i++) {
    result += `ExperiencePointsForLevel[${i}]=${xp}` + (i < count ? "," : "");
    xp += Math.floor(base + i * 1.1);
  }
  result += ")";
  document.getElementById("levelResult").innerText = result;
}

function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const matches = input.match(/ExperiencePointsForLevel\[\d+\]=\d+/g);
  let total = 0;
  if (matches) {
    matches.forEach(m => {
      const val = parseInt(m.split("=")[1]);
      total += val;
    });
  }
  const result = `OverrideMaxExperiencePointsPlayer=70368744177664\nOverrideMaxExperiencePointsPlayer=${total}\nOverrideMaxExperiencePointsDino=2147483647`;
  document.getElementById("xpResult").innerText = result;
}

function generateEngrams() {
  const lvl = parseInt(document.getElementById("engramsLevel").value);
  const arr = [];
  for (let i = 0; i <= lvl; i++) {
    const pts = i < 10 ? 0 : i < 20 ? 8 : i < 30 ? 14 : i < 40 ? 18 : i < 50 ? 24 : 28;
    arr.push(`OverridePlayerLevelEngramPoints=${pts}`);
  }
  document.getElementById("engramsResult").innerText = arr.join("\n");
}

function generateStats() {
  const sections = ["Player", "DinoTamed", "DinoWild"];
  let result = "";
  sections.forEach(type => {
    for (let i = 0; i < 12; i++) {
      const val = document.getElementById(`${type}_${i}`).value || "1.0";
      result += `PerLevelStatsMultiplier_${type}[${i}]=${val}\n`;
    }
  });
  document.getElementById("statsResult").innerText = result;
}

window.onload = () => {
  const statsContainer = document.getElementById("statsContainer");
  const stats = [
    "الصحة (Health)", "الطاقة (Stamina)", "الأكسجين (Oxygen)", "الطعام (Food)",
    "الماء (Water)", "الوزن (Weight)", "الضرر الجسدي (Melee Damage)", "السرعة (Movement Speed)",
    "القدرة على التحمل (Fortitude)", "الحرفية (Crafting Skill)", "السرعة البديلة (Alt Speed)", "الترويض (Torpidity)"
  ];
  ["Player", "DinoTamed", "DinoWild"].forEach(type => {
    const title = type === "Player" ? "اللاعب" : type === "DinoTamed" ? "الحيوانات المروضة" : "الحيوانات البرية";
    const box = document.createElement("div");
    box.innerHTML = `<h4>${title}</h4>`;
    stats.forEach((stat, i) => {
      const input = document.createElement("input");
      input.type = "number";
      input.step = "0.01";
      input.id = `${type}_${i}`;
      input.placeholder = stat;
      input.style.margin = "4px";
      input.style.width = "120px";
      box.appendChild(input);
    });
    statsContainer.appendChild(box);
  });
};