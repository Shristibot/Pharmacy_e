// const medicines = [
//   {
//     name: "Paracetamol 500mg",
//     sku: "PARA500-10",
//     category: "Pain Relief",
//     pack: "10 Tablets",
//     stock: 128,
//     level: "In Stock",
//     expiry: "25 Jun 2025",
//     expired: false,
//     status: "Active",
//   },
//   {
//     name: "Amoxicillin 250mg",
//     sku: "AMOX250-10",
//     category: "Antibiotics",
//     pack: "10 Capsules",
//     stock: 2,
//     level: "Low Stock",
//     expiry: "15 May 2025",
//     expired: true,
//     status: "Active",
//   },
//   {
//     name: "Cetirizine 10mg",
//     sku: "CET10-10",
//     category: "Antihistamine",
//     pack: "10 Tablets",
//     stock: 6,
//     level: "Low Stock",
//     expiry: "14 May 2025",
//     expired: true,
//     status: "Active",
//   },
//   {
//     name: "Ibuprofen 400mg",
//     sku: "IBU400-10",
//     category: "Pain Relief",
//     pack: "10 Tablets",
//     stock: 3,
//     level: "Low Stock",
//     expiry: "03 Jun 2025",
//     expired: false,
//     status: "Active",
//   },
//   {
//     name: "Dolo 650mg",
//     sku: "DOLO650-10",
//     category: "Pain Relief",
//     pack: "10 Tablets",
//     stock: 0,
//     level: "Out of Stock",
//     expiry: "15 May 2025",
//     expired: true,
//     status: "Inactive",
//   },
//   {
//     name: "Azithromycin 500mg",
//     sku: "AZI500-03",
//     category: "Antibiotics",
//     pack: "3 Tablets",
//     stock: 14,
//     level: "In Stock",
//     expiry: "19 Aug 2025",
//     expired: false,
//     status: "Active",
//   },
//   {
//     name: "Vitamin C 500mg",
//     sku: "VITC500-30",
//     category: "Vitamins",
//     pack: "30 Tablets",
//     stock: 24,
//     level: "In Stock",
//     expiry: "07 Oct 2025",
//     expired: false,
//     status: "Active",
//   },
// ];

// const inventoryBody = document.querySelector("#inventoryBody");
// const emptyState = document.querySelector("#emptyState");
// const searchInput = document.querySelector("#medicineSearch");
// const globalSearch = document.querySelector("#globalSearch");
// const categoryFilter = document.querySelector("#categoryFilter");
// const statusFilter = document.querySelector("#statusFilter");
// const levelFilter = document.querySelector("#levelFilter");
// const themeToggle = document.querySelector("#themeToggle");
// const counters = document.querySelectorAll(".count-up");
// const quickTrack = document.querySelector(".quick-track");

// function categoryClass(category) {
//   return `category-${category.toLowerCase().replace(/\s+/g, "-").replace("pain-relief", "pain")}`;
// }

// function levelClass(level) {
//   if (level === "In Stock") return "level-stock";
//   if (level === "Low Stock") return "level-low";
//   return "level-out";
// }

// function statusClass(status) {
//   return status === "Active" ? "status-active" : "status-inactive";
// }

// function renderRows(items) {
//   inventoryBody.innerHTML = items
//     .map(
//       (item) => `
//       <tr>
//         <td>
//           <div class="medicine-cell">
//             <span class="medicine-icon"><span class="capsule"></span></span>
//             <span>
//               <span class="medicine-name">${item.name}</span>
//               <span class="sku">${item.sku}</span>
//             </span>
//           </div>
//         </td>
//         <td><span class="badge ${categoryClass(item.category)}">${item.category}</span></td>
//         <td>${item.pack}</td>
//         <td><span class="stock-count">${item.stock} Units</span></td>
//         <td><span class="level ${levelClass(item.level)}">${item.level}</span></td>
//         <td class="${item.expired ? "expiry-danger" : "expiry-normal"}">${item.expiry}</td>
//         <td><span class="status ${statusClass(item.status)}">${item.status}</span></td>
//         <td><button class="dots" type="button">...</button></td>
//       </tr>
//     `
//     )
//     .join("");

//   emptyState.style.display = items.length ? "none" : "block";
// }

// function applyFilters() {
//   const query = searchInput.value.trim().toLowerCase();
//   const globalQuery = globalSearch.value.trim().toLowerCase();
//   const category = categoryFilter.value;
//   const status = statusFilter.value;
//   const level = levelFilter.value;

//   const filtered = medicines.filter((item) => {
//     const searchText = `${item.name} ${item.sku} ${item.category}`.toLowerCase();

//     return (
//       searchText.includes(query) &&
//       searchText.includes(globalQuery) &&
//       (category === "all" || item.category === category) &&
//       (status === "all" || item.status === status) &&
//       (level === "all" || item.level === level)
//     );
//   });

//   renderRows(filtered);
// }

// function animateCounters() {
//   counters.forEach((counter) => {
//     const target = Number(counter.dataset.target);
//     const duration = 1200;
//     const startTime = performance.now();

//     function updateCounter(currentTime) {
//       const progress = Math.min((currentTime - startTime) / duration, 1);
//       const easedProgress = 1 - Math.pow(1 - progress, 3);

//       counter.textContent = Math.round(target * easedProgress);

//       if (progress < 1) {
//         requestAnimationFrame(updateCounter);
//       } else {
//         counter.textContent = target;
//       }
//     }

//     requestAnimationFrame(updateCounter);
//   });
// }

// function updateThemeButton() {
//   const isDark = document.body.classList.contains("dark-mode");
//   const label = themeToggle.querySelector(".theme-label");

//   label.textContent = isDark ? "Light Mode" : "Dark Mode";
// }

// function duplicateQuickTabs() {
//   const tabs = [...quickTrack.children];

//   tabs.forEach((tab) => {
//     const clone = tab.cloneNode(true);
//     clone.setAttribute("aria-hidden", "true");
//     clone.tabIndex = -1;
//     quickTrack.appendChild(clone);
//   });
// }

// [searchInput, globalSearch, categoryFilter, statusFilter, levelFilter].forEach((control) => {
//   control.addEventListener("input", applyFilters);
// });

// themeToggle.addEventListener("click", () => {
//   document.body.classList.toggle("dark-mode");
//   updateThemeButton();
// });

// renderRows(medicines);
// updateThemeButton();
// duplicateQuickTabs();
// animateCounters();


const medicines = [
  {
    name: "Paracetamol 500mg",
    sku: "PARA500-10",
    category: "Pain Relief",
    pack: "10 Tablets",
    stock: 128,
    level: "In Stock",
    expiry: "25 Jun 2025",
    expired: false,
    status: "Active",
  },
  {
    name: "Amoxicillin 250mg",
    sku: "AMOX250-10",
    category: "Antibiotics",
    pack: "10 Capsules",
    stock: 2,
    level: "Low Stock",
    expiry: "15 May 2025",
    expired: true,
    status: "Active",
  },
  {
    name: "Cetirizine 10mg",
    sku: "CET10-10",
    category: "Antihistamine",
    pack: "10 Tablets",
    stock: 6,
    level: "Low Stock",
    expiry: "14 May 2025",
    expired: true,
    status: "Active",
  },
  {
    name: "Ibuprofen 400mg",
    sku: "IBU400-10",
    category: "Pain Relief",
    pack: "10 Tablets",
    stock: 3,
    level: "Low Stock",
    expiry: "03 Jun 2025",
    expired: false,
    status: "Active",
  },
  {
    name: "Dolo 650mg",
    sku: "DOLO650-10",
    category: "Pain Relief",
    pack: "10 Tablets",
    stock: 0,
    level: "Out of Stock",
    expiry: "15 May 2025",
    expired: true,
    status: "Inactive",
  },
  {
    name: "Azithromycin 500mg",
    sku: "AZI500-03",
    category: "Antibiotics",
    pack: "3 Tablets",
    stock: 14,
    level: "In Stock",
    expiry: "19 Aug 2025",
    expired: false,
    status: "Active",
  },
  {
    name: "Vitamin C 500mg",
    sku: "VITC500-30",
    category: "Vitamins",
    pack: "30 Tablets",
    stock: 24,
    level: "In Stock",
    expiry: "07 Oct 2025",
    expired: false,
    status: "Active",
  },
];

const inventoryBody = document.querySelector("#inventoryBody");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#medicineSearch");
const globalSearch = document.querySelector("#globalSearch");
const categoryFilter = document.querySelector("#categoryFilter");
const statusFilter = document.querySelector("#statusFilter");
const levelFilter = document.querySelector("#levelFilter");
const themeToggle = document.querySelector("#themeToggle");
const counters = document.querySelectorAll(".count-up");
const quickTrack = document.querySelector(".quick-track");

function categoryClass(category) {
  if (category === "Pain Relief") return "category-pain";
  if (category === "Antibiotics") return "category-antibiotics";
  if (category === "Antihistamine") return "category-antihistamine";
  return "category-vitamins";
}

function levelClass(level) {
  if (level === "In Stock") return "level-stock";
  if (level === "Low Stock") return "level-low";
  return "level-out";
}

function statusClass(status) {
  return status === "Active" ? "status-active" : "status-inactive";
}

function renderRows(items) {
  inventoryBody.innerHTML = items
    .map(
      (item) => `
        <tr>
          <td>
            <div class="medicine-cell">
              <span class="medicine-icon"><span class="pill-shape"></span></span>
              <span>
                <span class="medicine-name">${item.name}</span>
                <span class="sku">${item.sku}</span>
              </span>
            </div>
          </td>
          <td><span class="badge ${categoryClass(item.category)}">${item.category}</span></td>
          <td>${item.pack}</td>
          <td><span class="stock-count">${item.stock} Units</span></td>
          <td><span class="level ${levelClass(item.level)}">${item.level}</span></td>
          <td class="${item.expired ? "expiry-danger" : "expiry-normal"}">${item.expiry}</td>
          <td><span class="status ${statusClass(item.status)}">${item.status}</span></td>
          <td><button class="dots" type="button">...</button></td>
        </tr>
      `
    )
    .join("");

  emptyState.style.display = items.length ? "none" : "block";
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const globalQuery = globalSearch.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const status = statusFilter.value;
  const level = levelFilter.value;

  const filtered = medicines.filter((item) => {
    const searchText = `${item.name} ${item.sku} ${item.category}`.toLowerCase();

    return (
      searchText.includes(query) &&
      searchText.includes(globalQuery) &&
      (category === "all" || item.category === category) &&
      (status === "all" || item.status === status) &&
      (level === "all" || item.level === level)
    );
  });

  renderRows(filtered);
}

function animateCounters() {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const duration = 1200;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      counter.textContent = Math.round(target * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

function updateThemeButton() {
  const isDark = document.body.classList.contains("dark-mode");
  const label = themeToggle.querySelector(".theme-label");

  label.textContent = isDark ? "Light Mode" : "Dark Mode";
}

function duplicateQuickTabs() {
  const tabs = [...quickTrack.children];

  tabs.forEach((tab) => {
    const clone = tab.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.tabIndex = -1;
    quickTrack.appendChild(clone);
  });
}

[searchInput, globalSearch, categoryFilter, statusFilter, levelFilter].forEach((control) => {
  control.addEventListener("input", applyFilters);
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  updateThemeButton();
});

renderRows(medicines);
updateThemeButton();
duplicateQuickTabs();
animateCounters();