async function searchMedicine() {

    const medicine =
        document.getElementById("medicine-input").value;

    const resultContainer =
        document.getElementById("result-container");


    resultContainer.innerHTML = "<p>Loading...</p>";

    try {

        const response = await fetch(
            `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${medicine}&limit=1`
        );

        const data = await response.json();

        console.log(data);

        const medicineData = data.results[0];

        resultContainer.innerHTML = `

            <div class="result-card">

                <h3>
                    ${medicineData.openfda.brand_name?.[0] || "N/A"}
                </h3>

                <p>
                    <strong>Manufacturer:</strong>

                    ${medicineData.openfda.manufacturer_name?.[0] || "N/A"}
                </p>

                <p>
                    <strong>Purpose:</strong>

                    ${
                        medicineData.purpose?.[0]
                        || "No purpose available"
                    }
                </p>

                <p>
                    <strong>Warnings:</strong>

                    ${
                        medicineData.warnings?.[0]
                        || "No warnings available"
                    }
                </p>

            </div>
        `;

    }

    catch (error) {

        console.log(error);

        resultContainer.innerHTML = `

            <div class="result-card">

                <h3>No Medicine Found</h3>

                <p>
                    Try another medicine name.
                </p>

            </div>
        `;
    }
}