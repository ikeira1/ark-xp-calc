const statNames = [
  "Health (الصحة)",
  "Stamina (الطاقة)",
  "Torpidity (الخدر)",
  "Oxygen (الأوكسجين)",
  "Food (الأكل)",
  "Water (الماء)",
  "Temperature (الحرارة)",
  "Weight (الوزن)",
  "Melee Damage (الضرر)",
  "Movement Speed (السرعة)",
  "Fortitude (التحمل)",
  "Crafting Skill (مهارة التصنيع)"
];

function createStatInputs(containerId, prefix) {
  const container = document.getElementById(containerId);
  statNames.forEach((name, index) => {
    const input = document.createElement("input");
    input.type = "number";
    input.step = "0.01";
    input.value = "1.0";
    input.placeholder = name;
    input.dataset.stat = `${prefix}[${index}]`;
    container.appendChild(input);
  });
}

function generateStatsCode() {
  const result = [];

  document.querySelectorAll("#playerStats input").forEach((input) => {
    result.push(`PerLevelStatsMultiplier_Player[${input.dataset.stat.match(/\d+/)}]=${input.value}`);
  });
  document.querySelectorAll("#tamedStats input").forEach((input) => {
    result.push(`PerLevelStatsMultiplier_DinoTamed[${input.dataset.stat.match(/\d+/)}]=${input.value}`);
  });
  document.querySelectorAll("#wildStats input").forEach((input) => {
    result.push(`PerLevelStatsMultiplier_DinoWild[${input.dataset.stat.match(/\d+/)}]=${input.value}`);
  });

  document.getElementById("statsResult").textContent = result.join("\n");
}

function copyResult(id) {
  const content = document.getElementById(id).textContent;
  navigator.clipboard.writeText(content).then(() => {
    alert("✅ تم نسخ الكود!");
  });
}

// إنشاء الحقول عند تحميل الصفحة
window.addEventListener("DOMContentLoaded", () => {
  createStatInputs("playerStats", "PerLevelStatsMultiplier_Player");
  createStatInputs("tamedStats", "PerLevelStatsMultiplier_DinoTamed");
  createStatInputs("wildStats", "PerLevelStatsMultiplier_DinoWild");
});
