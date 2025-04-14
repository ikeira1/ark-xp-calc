document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function () {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(this.dataset.section).classList.add("active");
  });
});

function copyResult(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text);
  alert("تم النسخ!");
}

function generateLevels() {
  const count = parseInt(document.getElementById("levelCount").value);
  let result = "LevelExperienceRampOverrides=(";
  for (let i = 0; i < count; i++) {
    result += `ExperiencePointsForLevel[${i}]=${(i + 1) * 5},`;
  }
  result = result.slice(0, -1) + ")";
  document.getElementById("levelResult").innerText = result;
}

function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const matches = input.match(/ExperiencePointsForLevel\[\d+\]=(\d+)/g);
  const values = matches ? matches.map(m => parseInt(m.split("=")[1])) : [];
  const total = values.reduce((a, b) => a + b, 0);
  const result = `OverrideMaxExperiencePointsPlayer=70368744177664\nOverrideMaxExperiencePointsPlayer=${total}\nOverrideMaxExperiencePointsDino=${total}`;
  document.getElementById("xpResult").innerText = result;
}

function generateEngrams() {
  const levels = parseInt(document.getElementById("engramsLevel").value);
  const points = [
    0, 8, 8, 8, 8, 8, 8, 8, 8, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
    18, 18, 18, 18, 18, 18, 18, 18, 18, 18,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    28, 28, 28, 28, 28, 28, 28, 28, 28, 28,
    36, 36, 36, 36, 36, 36, 36, 36, 36, 36,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 70, 70, 70, 70, 70, 70, 70,
    70, 80, 80, 80, 80, 80, 80, 100, 100, 100,
    100, 100, 110, 110, 110, 110, 110, 125, 125, 135,
    135, 135, 120, 120
  ];

  let result = "";
  for (let i = 0; i < levels; i++) {
    const value = points[i] !== undefined ? points[i] : 220;
    result += `OverridePlayerLevelEngramPoints=${value}\n`;
  }
  document.getElementById("engramsResult").innerText = result;
}

function searchCraft() {
  const item = document.getElementById("searchCraftInput").value.toLowerCase();
  fetch("craft-data.json")
    .then(res => res.json())
    .then(data => {
      const found = data.find(entry => entry.name.toLowerCase().includes(item));
      if (!found) return document.getElementById("craftResults").innerHTML = "لا يوجد نتيجة.";

      const container = document.createElement("div");
      container.innerHTML = `<h4>${found.name}</h4>`;
      found.resources.forEach((r, i) => {
        const row = document.createElement("div");
        row.className = "resource-row";
        row.innerHTML = `
          <input type="text" value="${r.id}" />
          <input type="number" value="${r.amount}" />
          <button onclick="this.parentElement.remove()">حذف</button>
        `;
        container.appendChild(row);
      });
      const addBtn = document.createElement("button");
      addBtn.innerText = "إضافة مورد";
      addBtn.onclick = () => {
        const row = document.createElement("div");
        row.className = "resource-row";
        row.innerHTML = `
          <input type="text" placeholder="Resource ID" />
          <input type="number" placeholder="الكمية" />
          <button onclick="this.parentElement.remove()">حذف</button>
        `;
        container.appendChild(row);
      };

      const genBtn = document.createElement("button");
      genBtn.innerText = "توليد الكود";
      genBtn.onclick = () => {
        const rows = container.querySelectorAll(".resource-row");
        const resArr = Array.from(rows).map(row => {
          const inputs = row.querySelectorAll("input");
          return `(ResourceItemTypeString="${inputs[0].value}",BaseResourceRequirement=${inputs[1].value})`;
        }).join(",");
        const code = `ConfigOverrideItemCraftingCosts=(ItemClassString="${found.id}",BaseCraftingResourceRequirements=[${resArr}])`;
        container.appendChild(document.createElement("pre")).innerText = code;
        navigator.clipboard.writeText(code);
      };

      container.appendChild(addBtn);
      container.appendChild(genBtn);
      document.getElementById("craftResults").innerHTML = "";
      document.getElementById("craftResults").appendChild(container);
    });
}
