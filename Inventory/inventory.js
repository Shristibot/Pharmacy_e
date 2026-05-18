// ── MEDICINE DATA ─────────────────────────────────────────
const medicines = [
  { name: "Amoxicillin 500mg",  generic: "Amoxicillin",     cat: "Antibiotic",    batch: "AMX-2024-01", mfg: "2024-01-10", exp: "2026-01-10", stock: 340, price: 120,  status: "In Stock"     },
  { name: "Paracetamol 650mg",  generic: "Acetaminophen",   cat: "Analgesic",     batch: "PCM-2023-07", mfg: "2023-07-15", exp: "2025-07-15", stock: 18,  price: 45,   status: "Low Stock"    },
  { name: "Omeprazole 20mg",    generic: "Omeprazole",      cat: "Antacid",       batch: "OMP-2022-12", mfg: "2022-12-01", exp: "2024-12-01", stock: 0,   price: 85,   status: "Expired"      },
  { name: "Vitamin C 500mg",    generic: "Ascorbic Acid",   cat: "Vitamin",       batch: "VTC-2024-03", mfg: "2024-03-20", exp: "2027-03-20", stock: 500, price: 60,   status: "In Stock"     },
  { name: "Azithromycin 250mg", generic: "Azithromycin",    cat: "Antibiotic",    batch: "AZI-2023-11", mfg: "2023-11-05", exp: "2025-11-05", stock: 22,  price: 210,  status: "Low Stock"    },
  { name: "Cetirizine 10mg",    generic: "Cetirizine HCl",  cat: "Antihistamine", batch: "CET-2024-02", mfg: "2024-02-01", exp: "2026-02-01", stock: 180, price: 55,   status: "In Stock"     },
  { name: "Metformin 500mg",    generic: "Metformin HCl",   cat: "Antidiabetic",  batch: "MET-2023-09", mfg: "2023-09-12", exp: "2025-09-12", stock: 95,  price: 75,   status: "In Stock"     },
  { name: "Oseltamivir 75mg",   generic: "Oseltamivir",     cat: "Antiviral",     batch: "OST-2022-06", mfg: "2022-06-01", exp: "2024-06-01", stock: 0,   price: 650,  status: "Expired"      },
  { name: "Ibuprofen 400mg",    generic: "Ibuprofen",       cat: "Analgesic",     batch: "IBU-2024-04", mfg: "2024-04-10", exp: "2027-04-10", stock: 260, price: 90,   status: "In Stock"     },
  { name: "Doxycycline 100mg",  generic: "Doxycycline",     cat: "Antibiotic",    batch: "DOX-2024-01", mfg: "2024-01-22", exp: "2026-01-22", stock: 0,   price: 180,  status: "Out of Stock" },
  { name: "Povidone Iodine",    generic: "Povidone",        cat: "Antiseptic",    batch: "PVD-2024-05", mfg: "2024-05-01", exp: "2027-05-01", stock: 400, price: 110,  status: "In Stock"     },
  { name: "Vitamin D3 60K",     generic: "Cholecalciferol", cat: "Vitamin",       batch: "VTD-2023-10", mfg: "2023-10-01", exp: "2025-10-01", stock: 10,  price: 135,  status: "Low Stock"    },
];

const MAX_STOCK = 500;
let sortDir = {};

// ── HELPERS ───────────────────────────────────────────────
function statusClass(s) {
  if (s === "In Stock")     return "badge-ok";
  if (s === "Low Stock")    return "badge-warn";
  if (s === "Expired")      return "badge-danger";
  if (s === "Out of Stock") return "badge-out";
  return "";
}

function stockFillClass(stock) {
  const pct = (stock / MAX_STOCK) * 100;
  if (pct === 0)  return "fill-danger";
  if (pct <= 10)  return "fill-warn";
  return "fill-ok";
}

function stockColor(fillClass) {
  if (fillClass === "fill-danger") return "var(--danger)";
  if (fillClass === "fill-warn")   return "var(--warn)";
  return "var(--green)";
}

// ── RENDER TABLE ROWS ─────────────────────────────────────
function renderRows(data) {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:2rem;color:var(--muted)">No medicines found.</td></tr>`;
    return;
  }

  data.forEach(m => {
    const pct  = Math.min(100, Math.round((m.stock / MAX_STOCK) * 100));
    const fill = stockFillClass(m.stock);
    const row  = document.createElement("tr");
    row.dataset.status = m.status;
    row.dataset.cat    = m.cat;

    row.innerHTML = `
      <td>
        <div class="med-name">${m.name}</div>
        <div class="med-generic">${m.generic}</div>
      </td>
      <td>${m.cat}</td>
      <td style="font-family:'Space Mono',monospace;font-size:.78rem;">${m.batch}</td>
      <td>${m.mfg}</td>
      <td>${m.exp}</td>
      <td class="stock-cell">
        <div class="stock-row">
          <div class="stock-bar">
            <div class="stock-fill ${fill}" style="width:${pct}%"></div>
          </div>
          <span class="stock-num" style="color:${stockColor(fill)}">${m.stock}</span>
        </div>
      </td>
      <td>₹${m.price}</td>
      <td><span class="badge ${statusClass(m.status)}">${m.status}</span></td>
      <td>
        <button class="act-btn" title="Edit">✏</button>
        <button class="act-btn" title="Delete">🗑</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// ── FILTER ────────────────────────────────────────────────
function filterTable() {
  const q      = document.getElementById("searchInput").value.toLowerCase();
  const status = document.getElementById("filterStatus").value;
  const cat    = document.getElementById("filterCat").value;

  const result = medicines.filter(m => {
    const matchQ = m.name.toLowerCase().includes(q)
                || m.generic.toLowerCase().includes(q)
                || m.cat.toLowerCase().includes(q);
    const matchS = !status || m.status === status;
    const matchC = !cat    || m.cat    === cat;
    return matchQ && matchS && matchC;
  });

  renderRows(result);
}

// ── SORT ──────────────────────────────────────────────────
function sortTable(col) {
  sortDir[col] = !sortDir[col];
  const keys = ["name", "cat", "batch", "mfg", "exp", "stock", "price", "status"];

  medicines.sort((a, b) => {
    const va = a[keys[col]];
    const vb = b[keys[col]];
    if (typeof va === "number") return sortDir[col] ? va - vb : vb - va;
    return sortDir[col]
      ? String(va).localeCompare(String(vb))
      : String(vb).localeCompare(String(va));
  });

  filterTable();
}

// ── TICKER ────────────────────────────────────────────────
function buildTicker() {
  const track = document.getElementById("ticker");

  const items = medicines.map(m => {
    const cls = m.status === "In Stock"  ? "t-ok"
              : m.status === "Low Stock" ? "t-warn"
              : "t-exp";
    return `<span class="ticker-item ${cls}">
      <span class="dot"></span>
      ${m.name}
      <span class="t-status">[${m.status} · ${m.stock} units]</span>
    </span>`;
  }).join("");

  track.innerHTML = items + items; // duplicate for seamless loop
}

// ── INIT ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderRows(medicines);
  buildTicker();
});
