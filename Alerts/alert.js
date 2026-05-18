// =========================================
// LOCAL STORAGE FUNCTIONS
// =========================================

function getProducts() {

  return JSON.parse(
    localStorage.getItem("products")
  ) || [];

}

function saveProducts(products) {

  localStorage.setItem(
    "products",
    JSON.stringify(products)
  );

}


// =========================================
// SAMPLE DATA
// =========================================

let products = getProducts();

if (products.length === 0) {

  products = [

    {
      id: Date.now(),
      name: "Paracetamol",
      category: "Tablet",
      quantity: 4,
      expiry: "2026-05-20"
    },

    {
      id: Date.now() + 1,
      name: "Vitamin C",
      category: "Supplement",
      quantity: 15,
      expiry: "2026-05-28"
    },

    {
      id: Date.now() + 2,
      name: "Dolo 650",
      category: "Tablet",
      quantity: 2,
      expiry: "2026-05-15"
    }

  ];

  saveProducts(products);

}


// =========================================
// DATE
// =========================================

const today = new Date();

today.setHours(0,0,0,0);


// =========================================
// ELEMENTS
// =========================================

const tableBody =
  document.getElementById("table-body");

const searchInput =
  document.getElementById("search");

const sortSelect =
  document.getElementById("sort");

const filterButtons =
  document.querySelectorAll(".filter-btn");

const expiredCount =
  document.getElementById("expired-count");

const expiringCount =
  document.getElementById("expiring-count");

const lowstockCount =
  document.getElementById("lowstock-count");


// =========================================
// GET DAYS LEFT
// =========================================

function getDaysLeft(expiryDate) {

  const expiry =
    new Date(expiryDate);

  return Math.ceil(
    (expiry - today) /
    (1000 * 60 * 60 * 24)
  );

}
// =========================================
// STATUS FUNCTION
// =========================================

function getStatus(product) {

  const daysLeft =
    getDaysLeft(product.expiry);

  if (daysLeft < 0) {

    return {
      text: "Expired",
      class: "expired"
    };

  }

  if (daysLeft <= 7) {

    return {
      text: "Expiring Soon",
      class: "expiring"
    };

  }

  if (product.quantity < 10) {

    return {
      text: "Low Stock",
      class: "lowstock"
    };

  }

  return {
    text: "Safe",
    class: "safe"
  };

}
// =========================================
// UPDATE COUNTS
// =========================================

function updateCounts() {

  const expired =
    products.filter(
      p => getDaysLeft(p.expiry) < 0
    );

  const expiring =
    products.filter(
      p => {
        const days =
          getDaysLeft(p.expiry);

        return days >= 0 && days <= 7;
      }
    );

  const lowstock =
    products.filter(
      p => p.quantity < 10
    );

  expiredCount.textContent =
    expired.length;

  expiringCount.textContent =
    expiring.length;

  lowstockCount.textContent =
    lowstock.length;

}
// =========================================
// RENDER TABLE
// =========================================

function renderTable(data) {

  if (data.length === 0) {

    tableBody.innerHTML = `

      <tr>

        <td
          colspan="5"
          class="empty-state"
        >
          ✅ No products found
        </td>

      </tr>

    `;

    return;

  }

  tableBody.innerHTML =
    data.map(product => {

      const status =
        getStatus(product);

      return `

        <tr>

          <td>
            ${product.name}
          </td>

          <td>
            ${product.category}
          </td>

          <td>
            ${product.quantity}
          </td>

          <td>
            ${product.expiry}
          </td>

          <td>

            <span class="
              badge
              ${status.class}
            ">

              ${status.text}

            </span>

          </td>

        </tr>

      `;

    }).join("");

}
// =========================================
// FILTER PRODUCTS
// =========================================

let currentFilter = "all";

function filterProducts() {

  let filtered =
    [...products];

  const searchValue =
    searchInput.value.toLowerCase();

  filtered = filtered.filter(product => {

    return (
      product.name
        .toLowerCase()
        .includes(searchValue)

      ||

      product.category
        .toLowerCase()
        .includes(searchValue)
    );
  });
  if (currentFilter === "expired") {

    filtered =
      filtered.filter(
        p => getDaysLeft(p.expiry) < 0
      );
  }
  if (currentFilter === "expiring") {
    filtered =
      filtered.filter(
        p => {
          const days =
            getDaysLeft(p.expiry);
          return days >= 0 && days <= 7;
        }
      );
  }
  if (currentFilter === "lowstock") {
    filtered =
      filtered.filter(
        p => p.quantity < 10
      );
  }
  const sortValue =
    sortSelect.value;
  if (sortValue === "name") {
    filtered.sort(
      (a,b) =>
      a.name.localeCompare(b.name)
    );
  }
  if (sortValue === "quantity") {
    filtered.sort(
      (a,b) =>
      a.quantity - b.quantity
    );
  }
  if (sortValue === "expiry") {
    filtered.sort(
      (a,b) =>
      new Date(a.expiry)
      -
      new Date(b.expiry)
    );
  }
  renderTable(filtered);
}
// =========================================
// EVENTS
// =========================================
searchInput.addEventListener(
  "input",
  filterProducts
);
sortSelect.addEventListener(
  "change",
  filterProducts
);
filterButtons.forEach(button => {
  button.addEventListener(
    "click",
    () => {
      filterButtons.forEach(btn => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
      currentFilter =
        button.dataset.filter;
      filterProducts();
    }
  );
});
// =========================================
// INITIAL LOAD
// =========================================
updateCounts();
filterProducts();
// =========================================
// FETCH API
// =========================================
async function fetchMedicineData() {
  try {
    const response =
      await fetch(
        "https://dummyjson.com/products"
      );
    const data =
      await response.json();
    console.log(
      "Fetched API Data:",
      data
    );
  }
  catch(error) {
    console.log(
      "Fetch Error:",
      error
    );
  }
}
fetchMedicineData();
