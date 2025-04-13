document.getElementById("calculate").addEventListener("click", function () {
  let input = document.getElementById("xpInput").value;
  let xpRegex = /ExperiencePointsForLevel\[\d+\]=(\d+)/g;
  let match;
  let totalXP = 0;

  while ((match = xpRegex.exec(input)) !== null) {
    totalXP += parseInt(match[1]);
  }

  if (totalXP > 0) {
    document.getElementById("results").style.display = "block";
    document.getElementById("playerXpCode").innerHTML =
      `<code>OverrideMaxExperiencePointsPlayer=${totalXP}</code>`;
    document.getElementById("dinoXpCode").innerHTML =
      `<code>OverrideMaxExperiencePointsDino=${totalXP}</code>`;
  } else {
    document.getElementById("results").style.display = "none";
  }
});

document.getElementById("generate").addEventListener("click", function () {
  const maxLevel = parseInt(document.getElementById("maxLevel").value);
  if (!maxLevel || maxLevel < 1) return;

  let result = "LevelExperienceRampOverrides=(";
  let total = 0;

  for (let i = 0; i <= maxLevel; i++) {
    total += 7 + Math.floor(Math.pow(i + 1, 1.2) * 1.5);
    result += `ExperiencePointsForLevel[${i}]=${total},`;
  }

  result = result.slice(0, -1) + ")";
  document.getElementById("generatedCode").value = result;
});
