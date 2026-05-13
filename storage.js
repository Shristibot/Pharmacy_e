function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

/* ---------- Dummy Data For Testing ---------- */

if (!localStorage.getItem("products")) {

    const sampleProducts = [

        {
            id: 1,
            name: "Paracetamol",
            category: "Tablet",
            quantity: 12,
            expiry: "2026-08-20",
            price: 50
        },

        {
            id: 2,
            name: "Crocin",
            category: "Tablet",
            quantity: 3,
            expiry: "2026-05-18",
            price: 30
        },

        {
            id: 3,
            name: "Vitamin C",
            category: "Supplement",
            quantity: 2,
            expiry: "2026-05-25",
            price: 120
        },

        {
            id: 4,
            name: "Dolo 650",
            category: "Tablet",
            quantity: 20,
            expiry: "2027-01-10",
            price: 40
        }

    ];

    saveProducts(sampleProducts);
}