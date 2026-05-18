
const medicineName = document.getElementById("medicineName");
const category = document.getElementById("category");
const strength = document.getElementById("strength");
const strengthUnit = document.getElementById("strengthUnit");
const dosageForm = document.getElementById("dosageForm");
const packSize = document.getElementById("packSize");

const purchasePrice = document.getElementById("purchasePrice");
const sellingPrice = document.getElementById("sellingPrice");
const taxRate = document.getElementById("taxRate");

const profitMargin = document.getElementById("profitMargin");

function updateSummary() {

  document.getElementById("summaryMedicine").textContent =
    medicineName.value || "—";

  document.getElementById("summaryCategory").textContent =
    category.value || "—";

  document.getElementById("summaryStrength").textContent =
    strength.value
      ? `${strength.value}${strengthUnit.value}`
      : "—";

  document.getElementById("summaryDosage").textContent =
    dosageForm.value || "—";

  document.getElementById("summaryPack").textContent =
    packSize.value || "—";

  document.getElementById("summaryPrice").textContent =
    sellingPrice.value
      ? `₹${sellingPrice.value}`
      : "—";
  
  const purchase = parseFloat(purchasePrice.value) || 0;

  const selling = parseFloat(sellingPrice.value) || 0;

  const tax = parseFloat(taxRate.value) || 0;

  const gstAmount = (selling * tax) / 100;

  const profit = selling - gstAmount - purchase;

  let margin = 0;

  if (purchase > 0) {
    margin = (profit / purchase) * 100;
  }

  const finalMargin = `${margin.toFixed(1)}%`;

  profitMargin.textContent = finalMargin;

  const summaryProfit =
    document.getElementById("summaryProfit");

  summaryProfit.textContent = finalMargin;

  // Profit Color
  if (margin < 0) {

    profitMargin.style.background = "#fee2e2";
    profitMargin.style.color = "#dc2626";

    summaryProfit.style.color = "#dc2626";

  } else {

    profitMargin.style.background =
      "var(--primary-light)";

    profitMargin.style.color =
      "var(--primary)";

    summaryProfit.style.color =
      "var(--text-main)";
  }
}

const fields = [
  medicineName,
  category,
  strength,
  strengthUnit,
  dosageForm,
  packSize,
  purchasePrice,
  sellingPrice,
  taxRate
];

fields.forEach(field => {

  field.addEventListener("input", updateSummary);

  field.addEventListener("change", updateSummary);
});

updateSummary();

// ======================================
// IMAGE HANDLING
// ======================================

const imageInput =
  document.getElementById("productImageInput");

const productPreview =
  document.getElementById("productPreview");

const uploadContent =
  document.getElementById("uploadContent");

const previewBtn =
  document.getElementById("previewBtn");

const removeImageBtn =
  document.getElementById("removeImageBtn");

let productImageData = "";

function showImage(imageData) {

  productPreview.src = imageData;

  productPreview.style.display = "block";

  uploadContent.style.display = "none";

  previewBtn.style.display = "inline-flex";

  removeImageBtn.style.display = "block";
}

// Upload Image
imageInput.addEventListener("change", function () {

  const file = this.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {

    productImageData = e.target.result;

    showImage(productImageData);
  };

  reader.readAsDataURL(file);
});

// Preview Image
previewBtn.addEventListener("click", () => {

  if (!productImageData) return;

  const previewWindow = window.open("");

  previewWindow.document.write(`
    <html>
      <head>
        <title>Image Preview</title>

        <style>
          body{
            margin:0;
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            background:#111;
          }

          img{
            max-width:95%;
            max-height:95%;
            object-fit:contain;
          }
        </style>
      </head>

      <body>
        <img src="${productImageData}" />
      </body>
    </html>
  `);
});

// Remove Image
removeImageBtn.addEventListener("click", () => {

  productImageData = "";

  productPreview.src = "";

  productPreview.style.display = "none";

  uploadContent.style.display = "block";

  previewBtn.style.display = "none";

  removeImageBtn.style.display = "none";

  imageInput.value = "";
});


let uploadedDocuments = {

  drugLicense: null,

  productInfo: null,

  otherDocument: null
};

function setupDocumentUpload(
  inputId,
  fileNameId,
  removeBtnId,
  storageField
) {

  const input =
    document.getElementById(inputId);

  const fileName =
    document.getElementById(fileNameId);

  const removeBtn =
    document.getElementById(removeBtnId);

  // Upload File
  input.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    fileName.textContent = file.name;

    uploadedDocuments[storageField] = {

      fileName: file.name,

      fileType: file.type,

      fileSize: file.size
    };
  });

  // Remove File
  removeBtn.addEventListener("click", () => {

    input.value = "";

    fileName.textContent = "";

    uploadedDocuments[storageField] = null;
  });
}

// Initialize Uploads
setupDocumentUpload(
  "drugLicenseInput",
  "drugLicenseName",
  "removeDrugLicense",
  "drugLicense"
);

setupDocumentUpload(
  "productInfoInput",
  "productInfoName",
  "removeProductInfo",
  "productInfo"
);

setupDocumentUpload(
  "otherDocInput",
  "otherDocName",
  "removeOtherDoc",
  "otherDocument"
);

// ======================================
// SAVE PRODUCT
// ======================================

const saveBtn =
  document.querySelector(".btn-primary");

saveBtn.addEventListener("click", function (e) {

  e.preventDefault();


// ======================================
// VALIDATION
// ======================================

const requiredFields = [

  {
    input: medicineName,
    message: "Medicine name is required."
  },

  {
    input: category,
    message: "Category is required."
  },

  {
    input: strength,
    message: "Strength is required."
  },

  {
    input: dosageForm,
    message: "Dosage form is required."
  },

  {
    input: purchasePrice,
    message: "Purchase price is required."
  },

  {
    input: sellingPrice,
    message: "Selling price is required."
  },

  {
    input: taxRate,
    message: "Tax rate is required."
  }
];

let isValid = true;

// Remove old error styles
document
  .querySelectorAll(".input-error")
  .forEach(field => {

    field.classList.remove("input-error");
  });

for (const field of requiredFields) {

  if (!field.input.value.trim()) {

    field.input.classList.add("input-error");

    showCustomAlert(
      "Required Field",
      field.message
    );

    field.input.focus();

    isValid = false;

    break;
  }
}

// Stop form submit
if (!isValid) return;
  const productData = {

    id: Date.now(),

    basicInformation: {

      medicineName: medicineName.value,

      genericName:
        document.getElementById("genericName").value,

      category: category.value,

      manufacturer:
        document.getElementById("manufacturer").value,

      strength: strength.value,

      strengthUnit: strengthUnit.value,

      dosageForm: dosageForm.value,

      packSize: packSize.value,

      sku:
        document.getElementById("sku").value,

      barcode:
        document.getElementById("barcode").value
    },

    pricing: {

      purchasePrice: purchasePrice.value,

      sellingPrice: sellingPrice.value,

      mrpPrice:
        document.getElementById("mrpPrice").value,

      taxRate: taxRate.value,

      profitMargin:
        profitMargin.textContent
    },

    additionalInformation: {

      description:
        document.querySelectorAll(".form-textarea")[0].value,

      indications:
        document.querySelectorAll(".form-textarea")[1].value,

      dosageInstructions:
        document.querySelectorAll(".form-textarea")[2].value,

      sideEffects:
        document.querySelectorAll(".form-textarea")[3].value,

      contraindications:
        document.querySelectorAll(".form-textarea")[4].value
    },

    attachments: {

      productImage:
        imageInput.files[0]
          ? imageInput.files[0].name
          : "",

      documents: uploadedDocuments
    },

    createdAt:
      new Date().toISOString()
  };

  // Existing Products
  let allProducts =
    JSON.parse(
      localStorage.getItem("pharmaProducts")
    ) || [];

  // Add Product
  allProducts.push(productData);

  // Save
  localStorage.setItem(
    "pharmaProducts",
    JSON.stringify(allProducts)
  );

  // Success Alert
  showCustomAlert(
    "Success!",
    "Product saved successfully."
  );

  console.log(productData);

  // Reload After Alert
  setTimeout(() => {

    location.reload();

  }, 4500);
});



function showCustomAlert(
  title,
  message,
  type = "success"
) {

  const oldAlert =
    document.querySelector(".custom-alert");

  if (oldAlert) {
    oldAlert.remove();
  }

  const alertBox =
    document.createElement("div");

  alertBox.className =
    `custom-alert ${type}`;

  const icon =
    type === "error"
      ? "fa-circle-exclamation"
      : "fa-check";

  alertBox.innerHTML = `

    <div class="custom-alert-icon">
      <i class="fa-solid ${icon}"></i>
    </div>

    <div class="custom-alert-content">

      <div class="custom-alert-title">
        ${title}
      </div>

      <div class="custom-alert-message">
        ${message}
      </div>

    </div>

    <div class="custom-alert-close">
      <i class="fa-solid fa-xmark"></i>
    </div>
  `;

  document.body.appendChild(alertBox);

  // Close button
  alertBox
    .querySelector(".custom-alert-close")
    .addEventListener("click", () => {

      dismissAlert(alertBox);
    });

  // Auto close
  alertBox.timer = setTimeout(() => {

    dismissAlert(alertBox);

  }, 4000);
}



function dismissAlert(alertBox) {

  clearTimeout(alertBox.timer);

  alertBox.classList.add("hide");

  setTimeout(() => {

    if (alertBox.parentNode) {
      alertBox.remove();
    }

  }, 300);
}



// ======================================
// RESET FORM
// ======================================

setTimeout(() => {

  // Reset all inputs
  document
    .querySelectorAll("input, textarea")
    .forEach(field => {

      field.value = "";
    });

  // Reset selects
  document
    .querySelectorAll("select")
    .forEach(select => {

      select.selectedIndex = 0;
    });

  // Reset uploaded document names
  document.getElementById(
    "drugLicenseName"
  ).textContent = "";

  document.getElementById(
    "productInfoName"
  ).textContent = "";

  document.getElementById(
    "otherDocName"
  ).textContent = "";

  // Reset image
  productImageData = "";

  productPreview.src = "";

  productPreview.style.display = "none";

  uploadContent.style.display = "block";

  previewBtn.style.display = "none";

  removeImageBtn.style.display = "none";

  imageInput.value = "";

  // Reset uploaded docs object
  uploadedDocuments = {

    drugLicense: null,

    productInfo: null,

    otherDocument: null
  };

  // Reset summary
  updateSummary();

}, 10);

