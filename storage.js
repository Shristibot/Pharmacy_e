function getProducts() {
  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

  if (storedProducts.length > 0) {
    return storedProducts;
  }

  const legacyProducts =
    JSON.parse(localStorage.getItem("pharmaProducts")) || [];

  if (legacyProducts.length === 0) {
    return [];
  }

  const normalizedProducts = legacyProducts.map((product) => ({
    id: product.id || Date.now(),
    name: product.name || product.basicInformation?.medicineName || "",
    category:
      product.category ||
      product.basicInformation?.dosageForm ||
      product.basicInformation?.category ||
      "",
    quantity: Number.isFinite(product.quantity)
      ? product.quantity
      : parseInt(product.basicInformation?.packSize, 10) || 1,
    expiry: product.expiry || "",
    price: Number(product.price) || Number(product.pricing?.sellingPrice) || 0,
    createdAt: product.createdAt || new Date().toISOString(),
    details:
      product.details ||
      product.basicInformation ||
      product.pricing ||
      product.additionalInformation ||
      product.attachments ||
      {},
  }));

  saveProducts(normalizedProducts);

  return normalizedProducts;
}

function isDemoProduct(product) {
  return product && product.__demo === true;
}

function parseDateOnly(dateString) {
  if (!dateString) {
    return null;
  }

  const parts = dateString.split("-").map(Number);

  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
    return null;
  }

  const [year, month, day] = parts;

  return new Date(year, month - 1, day);
}

function saveProducts(products) {
  const realProducts = products.filter((product) => !isDemoProduct(product));
  const productsToSave = realProducts.length > 0 ? realProducts : products;

  localStorage.setItem("products", JSON.stringify(productsToSave));
}

/* ---------- Demo Data For Empty State ---------- */

if (
  !localStorage.getItem("products") &&
  !localStorage.getItem("pharmaProducts")
) {
  const sampleProducts = [
    {
      id: 1,
      name: "Paracetamol",
      category: "Tablet",
      quantity: 12,
      expiry: "2026-08-20",
      price: 50,
      __demo: true,
    },
    {
      id: 2,
      name: "Crocin",
      category: "Tablet",
      quantity: 3,
      expiry: "2026-05-18",
      price: 30,
      __demo: true,
    },
    {
      id: 3,
      name: "Vitamin C",
      category: "Supplement",
      quantity: 2,
      expiry: "2026-05-2",
      price: 120,
      __demo: true,
    },
    {
      id: 4,
      name: "Dolo 650",
      category: "Tablet",
      quantity: 20,
      expiry: "2027-01-10",
      price: 40,
      __demo: true,
    },
    {
      id: 5,
      name: "Amoxicillin",
      category: "Antibiotic",
      quantity: 5,
      expiry: "2026-05-02",
      price: 80,
      __demo: true,
    },
    {
      id: 6,
      name: "Ibuprofen",
      category: "Tablet",
      quantity: 10,
      expiry: "2026-12-15",
      price: 60,
      __demo: true,
    },
  ];

  localStorage.setItem("products", JSON.stringify(sampleProducts));
}
