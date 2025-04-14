const recipes = {
    Fabricator: [
        { id: "PrimalItemResource_Wood_C", quantity: 35 },
        { id: "PrimalItemResource_MetalIngot_C", quantity: 20 }
    ],
    Smithy: [
        { id: "PrimalItemResource_Stone_C", quantity: 50 },
        { id: "PrimalItemResource_Wood_C", quantity: 30 }
    ]
};

function searchItem() {
    const itemName = document.getElementById("searchInput").value.trim();
    const resources = recipes[itemName];
    const container = document.getElementById("resourcesContainer");
    container.innerHTML = "";

    if (!resources) {
        alert("العنصر غير موجود. أضف الموارد يدوياً.");
        return;
    }

    resources.forEach((res, index) => {
        const row = createResourceRow(res.id, res.quantity);
        container.appendChild(row);
    });
}

function createResourceRow(id = "", quantity = 1) {
    const row = document.createElement("div");
    row.className = "resource-row";

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.placeholder = "الكمية";
    quantityInput.value = quantity;

    const idInput = document.createElement("input");
    idInput.placeholder = "Resource ID";
    idInput.value = id;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.onclick = () => row.remove();

    row.appendChild(quantityInput);
    row.appendChild(idInput);
    row.appendChild(deleteButton);

    return row;
}

function addResource() {
    const container = document.getElementById("resourcesContainer");
    const row = createResourceRow();
    container.appendChild(row);
}

function generateCode() {
    const container = document.getElementById("resourcesContainer");
    const rows = container.querySelectorAll(".resource-row");

    const codes = [];
    rows.forEach(row => {
        const inputs = row.querySelectorAll("input");
        const quantity = inputs[0].value.trim();
        const id = inputs[1].value.trim();
        if (quantity && id) {
            codes.push(`(${id}=${quantity})`);
        }
    });

    document.getElementById("outputCode").textContent = codes.join(",");
}
