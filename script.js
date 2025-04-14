function generateLevels() {
  const count = parseInt(document.getElementById("levelCount").value);
  if (isNaN(count) || count < 1) return;

  const lines = [];
  for (let i = 0; i <= count; i++) {
    const xp = i === 0 ? 5 : Math.floor((i ** 1.2) + 5);
    lines.push(`ExperiencePointsForLevel[${i}]=${xp}`);
  }

  const result = `LevelExperienceRampOverrides=(${lines.join(",")})`;
  document.getElementById("levelResult").textContent = result;
}

function copyResult(id) {
  const text = document.getElementById(id).textContent;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    alert("✅ تم النسخ!");
  });
}

function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const matches = [...input.matchAll(/ExperiencePointsForLevel\[\d+\]=(\d+)/g)];
  const totalXP = matches.reduce((sum, m) => sum + parseInt(m[1]), 0);
  const lastXP = matches.length ? parseInt(matches[matches.length - 1][1]) : 0;

  const result = [
    `OverrideMaxExperiencePointsPlayer=70368744177664`,
    `OverrideMaxExperiencePointsPlayer=${lastXP}`,
    `OverrideMaxExperiencePointsDino=2147483647`
  ].join("\n");

  document.getElementById("xpResult").textContent = result;
}

function generateEngrams() {
  const level = parseInt(document.getElementById("engramsLevel").value);
  if (isNaN(level) || level < 1) return;

  const points = [];
  for (let i = 0; i <= level; i++) {
    let value = 0;
    if (i <= 10) value = 8;
    else if (i <= 20) value = 14;
    else if (i <= 30) value = 18;
    else if (i <= 40) value = 24;
    else if (i <= 50) value = 28;
    else if (i <= 60) value = 36;
    else if (i <= 70) value = 50;
    else if (i <= 80) value = 70;
    else if (i <= 90) value = 80;
    else if (i <= 100) value = 100;
    else if (i <= 110) value = 110;
    else if (i <= 120) value = 120;
    else if (i <= 130) value = 125;
    else if (i <= 140) value = 135;
    else if (i <= 150) value = 220;
    else value = 260;
    points.push(`OverridePlayerLevelEngramPoints=${value}`);
  }

  document.getElementById("engramsResult").textContent = points.join("\n");
}
