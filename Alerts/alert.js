// LOCAL STORAGE FUNCTIONS

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





// SAMPLE DATA

let products = getProducts();

if (products.length === 0) {

  products = [

    {
      id: Date.now(),
      name: "Paracetamol",
      category: "Tablet",
      quantity: 5,
      expiry: "2026-05-08"
    },

    {
      id: Date.now() + 1,
      name: "Vitamin C",
      category: "Supplement",
      quantity: 15,
      expiry: "2026-05-20"
    },

    {
      id: Date.now() + 2,
      name: "Cough Syrup",
      category: "Syrup",
      quantity: 3,
      expiry: "2026-05-10"
    }

  ];

  saveProducts(products);

}





// ELEMENTS

const tableBody =
  document.getElementById(
    "table-body"
  );

const searchInput =
  document.getElementById(
    "search"
  );

const sortSelect =
  document.getElementById(
    "sort"
  );

const emptyState =
  document.getElementById(
    "empty-state"
  );

const toast =
  document.getElementById(
    "toast"
  );





// COUNTS

const expiredCount =
  document.getElementById(
    "expired-count"
  );

const expiringCount =
  document.getElementById(
    "expiring-count"
  );

const lowstockCount =
  document.getElementById(
    "lowstock-count"
  );

const totalCount =
  document.getElementById(
    "total-count"
  );





// DATE

const today = new Date();

today.setHours(0,0,0,0);





// STATUS FUNCTION

function getStatus(product) {

  const expiry =
    new Date(product.expiry);

  const days =
    (expiry - today)
    / (1000 * 60 * 60 * 24);

  if (expiry < today) {

    return "expired";

  }

  if (days <= 7) {

    return "expiring";

  }

  if (product.quantity < 10) {

    return "lowstock";

  }

  return "safe";

}





// SHOW COUNTS

function updateCounts() {

  expiredCount.textContent =
    products.filter(
      p => getStatus(p) === "expired"
    ).length;

  expiringCount.textContent =
    products.filter(
      p => getStatus(p) === "expiring"
    ).length;

  lowstockCount.textContent =
    products.filter(
      p => getStatus(p) === "lowstock"
    ).length;

  totalCount.textContent =
    products.length;

}





// RENDER TABLE

function renderTable(data) {

  tableBody.innerHTML = "";

  if (data.length === 0) {

    emptyState.style.display =
      "block";

    return;

  }

  emptyState.style.display =
    "none";





  data.forEach(product => {

    const status =
      getStatus(product);

    const row = `

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

          <span
            class="badge ${status}"
          >

            ${status}

          </span>

        </td>

      </tr>

    `;

    tableBody.innerHTML += row;

  });

}





// FILTER FUNCTION

function filterAlerts(type) {

  let filtered = [...products];

  if (type !== "all") {

    filtered = filtered.filter(
      product =>
        getStatus(product) === type
    );

  }

  renderTable(filtered);

}





// SEARCH

searchInput.addEventListener(
  "input",
  function() {

    const value =
      this.value.toLowerCase();

    const filtered =
      products.filter(product => {

        return (

          product.name
            .toLowerCase()
            .includes(value)

          ||

          product.category
            .toLowerCase()
            .includes(value)

          ||

          product.expiry
            .includes(value)

          ||

          product.quantity
            .toString()
            .includes(value)

        );

      });

    renderTable(filtered);

  }
);





// SORT

sortSelect.addEventListener(
  "change",
  function() {

    const value = this.value;

    let sorted = [...products];

    if (value === "name") {

      sorted.sort((a,b) =>
        a.name.localeCompare(b.name)
      );

    }

    if (value === "quantity") {

      sorted.sort((a,b) =>
        a.quantity - b.quantity
      );

    }

    if (value === "expiry") {

      sorted.sort((a,b) =>
        new Date(a.expiry)
        - new Date(b.expiry)
      );

    }

    renderTable(sorted);

  }
);





// EXPORT

document.getElementById(
  "export-btn"
).addEventListener(
  "click",
  function() {

    const data =
      JSON.stringify(
        products,
        null,
        2
      );

    const blob =
      new Blob([data], {
        type: "application/json"
      });

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download =
      "alerts-report.json";

    a.click();

  }
);





// TOAST

function showToast() {

  const expired =
    products.some(
      p => getStatus(p) === "expired"
    );

  if (expired) {

    toast.style.display =
      "block";

    setTimeout(() => {

      toast.style.display =
        "none";

    }, 3000);

  }

}





// INITIAL LOAD

updateCounts();

renderTable(products);

showToast();
