function addResource() {
  const container = document.getElementById('resources-container');
  const div = document.createElement('div');
  div.className = 'resource';
  div.innerHTML = `
    <input type="text" placeholder="ID المورد" class="resource-id" />
    <input type="number" placeholder="الكمية" class="resource-amount" />
    <button onclick="this.parentNode.remove()">❌ حذف</button>
  `;
  container.appendChild(div);
}

function generateCraftingCode() {
  const itemID = document.getElementById('item-id').value;
  const resourceIDs = document.querySelectorAll('.resource-id');
  const resourceAmounts = document.querySelectorAll('.resource-amount');
  let code = `ConfigOverrideItemCraftingCosts=(ItemClassString="${itemID}",BaseCraftingResourceRequirements=(`;

  for (let i = 0; i < resourceIDs.length; i++) {
    const id = resourceIDs[i].value;
    const amount = resourceAmounts[i].value;
    if (id && amount) {
      code += `(ResourceItemTypeString="${id}",BaseResourceRequirement=${amount},bCraftingRequireExactResourceType=false)`;
      if (i < resourceIDs.length - 1) code += `,`;
    }
  }

  code += `))`;
  document.getElementById('crafting-code').value = code;
}
