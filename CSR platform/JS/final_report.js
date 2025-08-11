document.addEventListener("DOMContentLoaded", function () {
  const data = JSON.parse(localStorage.getItem("csrReports")) || [];
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const totalEmployees = Number(userInfo.employees) || 1;

  const tableBody = document.getElementById("csr-table-body");

  const siteFilterContainer = document.getElementById("site-filters");
  const regionFilterContainer = document.getElementById("region-filters");
  const countryFilterContainer = document.getElementById("country-filters");
  const categoryFilterContainer = document.getElementById("category-filters");

  function getRegionAndCountry(site) {
    const map = {
      "Tunis": ["North Africa", "Tunisia"],
      "Mdjez El Beb": ["North Africa", "Tunisia"],
      "Kenitra": ["North Africa", "Morocco"],
      "Tangier": ["North Africa", "Morocco"],
      "Guarda": ["Europe", "Portugal"],
      "Guarda 2": ["Europe", "Portugal"],
      "Ploiești": ["Europe", "Romania"],
      "Romania": ["Europe", "Romania"],
      "Serbia": ["Europe", "Serbia"],
      "Durango": ["America", "Mexico"],
      "Honduras": ["America", "Honduras"],
      "Juarez": ["America", "Mexico"],
      "Léon": ["America", "Mexico"],
      "Tianjin": ["Asia", "China"],
      "Tianjin 2": ["Asia", "China"]
    };
    return map[site] || ["Unknown", "Unknown"];
  }

  function renderTable(filteredData) {
    tableBody.innerHTML = "";

    let totalParticipants = 0;
    let totalEstimatedBudget = 0;
    let totalActualBudget = 0;
    let totalExternalPartners = 0;
    let categoryCounts = {
      Education: 0,
      Social: 0,
      Environment: 0,
      Sport: 0,
      Other: 0
    };

    filteredData.forEach(report => {
      const [region, country] = getRegionAndCountry(report.site);
      const participantRaw = report.participants?.number;
      const participantNumber = isNaN(Number(participantRaw)) ? 0 : Number(participantRaw);
      const percent = (participantNumber && totalEmployees)
        ? ((participantNumber / totalEmployees) * 100).toFixed(1) + "%"
        : "-";

      const estimated = Number(report.estimatedBudget) || 0;
      const actual = Number(report.actualBudget) || 0;
      const externalPartners = Number(report.externalPartnerCount) || 0;

      totalParticipants += participantNumber;
      totalEstimatedBudget += estimated;
      totalActualBudget += actual;
      totalExternalPartners += externalPartners;

      if (categoryCounts.hasOwnProperty(report.category)) {
        categoryCounts[report.category]++;
      }

      const row = document.createElement("tr");
        row.innerHTML = `
          <td>${region}</td>
          <td>${country}</td>
          <td>${report.site}</td>
          <td>${report.title}</td>
          <td>${report.category || ""}</td>
          <td>${report.organizer || ""}</td>
          <td>${report.ongoing?.year || ""}</td>
          <td>${report.ongoing?.edition || ""}</td>
          <td>${participantNumber}</td>
          <td>${percent}</td>
          <td>${report.estimatedBudget || ""}</td>
          <td>${report.actualBudget || ""}</td>
          <td>${report.impactNumber || ""}</td>
          <td>${report.impactUnit || ""}</td>
          <td>${report.organizer || ""}</td>
          <td>${report.externalPartner || ""}</td>
          <td>${report.externalPartnerCount || ""}</td>
          <td>
            <button class="toggle-details" onclick="toggleComment(this)">+</button>
            <div class="comment-details" style="display:none; text-align:left; font-size: 0.85em; margin-top:5px;">
              ${report.participants?.comment ? `<strong>Participants:</strong> ${report.participants.comment}<br>` : ""}
              ${report.firstTime?.comment ? `<strong>First Time:</strong> ${report.firstTime.comment}<br>` : ""}
              ${report.appreciated?.comment ? `<strong>Appreciated:</strong> ${report.appreciated.comment}<br>` : ""}
              ${report.image?.comment ? `<strong>Corporate Image:</strong> ${report.image.comment}<br>` : ""}
              ${report.ongoing?.comment ? `<strong>Ongoing:</strong> ${report.ongoing.comment}<br>` : ""}
            </div>
          </td>
        `;
      tableBody.appendChild(row);
      const toggleButton = row.querySelector(".toggle-details");
      const detailsDiv = row.querySelector(".details-content");

      toggleButton.addEventListener("click", () => {
        if (detailsDiv.style.display === "none") {
          detailsDiv.style.display = "block";
          toggleButton.textContent = "–";
        } else {
          detailsDiv.style.display = "none";
          toggleButton.textContent = "+";
        }
      });
    });

    const totalRow = document.createElement("tr");
    totalRow.style.backgroundColor = "#eef6ff";
    const totalActions = filteredData.length;
    const categorySummary = Object.entries(categoryCounts)
      .map(([cat, count]) => {
        const pct = totalActions ? ((count / totalActions) * 100).toFixed(1) : 0;
        return `• ${cat}: ${pct}%`;
      })
      .join("<br>");

    totalRow.innerHTML = `
      <td colspan="4"><strong>Total</strong></td>
      <td>${categorySummary}</td>
      <td></td><td></td><td></td>
      <td><strong>${totalParticipants}</strong></td>
      <td></td>
      <td><strong>${totalEstimatedBudget.toFixed(2)}</strong></td>
      <td><strong>${totalActualBudget.toFixed(2)}</strong></td>
      <td></td><td></td><td></td><td></td>
      <td><strong>${totalExternalPartners}</strong></td>
      <td></td>
    `;
    tableBody.appendChild(totalRow);
  }

  function populateFilters() {
    const regions = new Set();
    const countries = new Set();
    const sites = new Set();
    const categories = new Set();

    data.forEach(d => {
      const [region, country] = getRegionAndCountry(d.site);
      regions.add(region);
      countries.add(country);
      sites.add(d.site);
      categories.add(d.category);
    });

    function renderCheckboxes(container, items, name) {
      container.innerHTML = `
        <label><input type="checkbox" value="All" checked> <strong>All ${name}</strong></label><br>
        ${Array.from(items).map(item =>
          `<label><input type="checkbox" value="${item}" checked> ${item}</label>`
        ).join("<br>")}
      `;
    }

    renderCheckboxes(regionFilterContainer, regions, "Regions");
    renderCheckboxes(countryFilterContainer, countries, "Countries");
    renderCheckboxes(siteFilterContainer, sites, "Sites");
    renderCheckboxes(categoryFilterContainer, categories, "Categories");
  }

  function getSelectedValues(container) {
    const allSelected = container.querySelector('input[value="All"]')?.checked;
    const checkboxes = Array.from(container.querySelectorAll('input:not([value="All"])'));
    if (allSelected) return checkboxes.map(cb => cb.value);
    return checkboxes.filter(cb => cb.checked).map(cb => cb.value);
  }

  function applyFilters() {
    const selectedRegions = getSelectedValues(regionFilterContainer);
    const selectedCountries = getSelectedValues(countryFilterContainer);
    const selectedSites = getSelectedValues(siteFilterContainer);
    const selectedCategories = getSelectedValues(categoryFilterContainer);

    const filteredData = data.filter(report => {
      const [region, country] = getRegionAndCountry(report.site);
      return (
        selectedRegions.includes(region) &&
        selectedCountries.includes(country) &&
        selectedSites.includes(report.site) &&
        selectedCategories.includes(report.category)
      );
    });

    renderTable(filteredData);
  }

  function attachListeners() {
    const containers = [regionFilterContainer, countryFilterContainer, siteFilterContainer, categoryFilterContainer];
    containers.forEach(container => container.addEventListener("change", applyFilters));
  }

  populateFilters();
  applyFilters();
  attachListeners();

document.getElementById("export-excel").addEventListener("click", async () => {
  const data = JSON.parse(localStorage.getItem("csrReports")) || [];
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const totalEmployees = Number(userInfo.employees) || 1;

  const selectedRegions = getSelectedValues(regionFilterContainer);
  const selectedCountries = getSelectedValues(countryFilterContainer);
  const selectedSites = getSelectedValues(siteFilterContainer);
  const selectedCategories = getSelectedValues(categoryFilterContainer);

  const filteredData = data.filter(report => {
    const [region, country] = getRegionAndCountry(report.site);
    return (
      selectedRegions.includes(region) &&
      selectedCountries.includes(country) &&
      selectedSites.includes(report.site) &&
      selectedCategories.includes(report.category)
    );
  });

  if (filteredData.length === 0) {
    alert("No data to export.");
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("CSR Reports");

  const columns = [
    { header: "Region", key: "region" },
    { header: "Country", key: "country" },
    { header: "COFICAB Site", key: "site" },
    { header: "Activity Title", key: "title" },
    { header: "Category", key: "category" },
    { header: "Nature of Collaboration", key: "collaboration" },
    { header: "Start Year", key: "startYear" },
    { header: "Edition", key: "edition" },
    { header: "Internal Participants", key: "participants" },
    { header: "% of Employees", key: "percent" },
    { header: "Estimated Budget (€)", key: "estimatedBudget" },
    { header: "Actual Budget (€)", key: "actualBudget" },
    { header: "Action Impact Number", key: "impactNumber" },
    { header: "Impact Unit", key: "impactUnit" },
    { header: "Organizer", key: "organizer" },
    { header: "External Partner", key: "externalPartner" },
    { header: "Number of External Partners", key: "externalPartnerCount" }
  ];

  worksheet.columns = columns.map(col => ({
    ...col,
    width: col.header.length + 5,
    style: {
      alignment: { wrapText: true, vertical: "middle" }
    }
  }));

  // Appliquer style sur la 1re ligne (titres)
  worksheet.getRow(1).eachCell(cell => {
    cell.font = { bold: true };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "8EA9DB" } // RGB 142,169,219
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };
    cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  });

  worksheet.getRow(1).height = 45;

  // Ajouter les lignes de données
  filteredData.forEach(report => {
    const [region, country] = getRegionAndCountry(report.site);
    const participantNumber = Number(report.participants?.number) || 0;
    const percent = (participantNumber && totalEmployees)
      ? ((participantNumber / totalEmployees) * 100).toFixed(1) + "%"
      : "-";

    worksheet.addRow({
      region,
      country,
      site: report.site,
      title: report.title,
      category: report.category,
      collaboration: report.organizer,
      startYear: report.ongoing?.year || "",
      edition: report.ongoing?.edition || "",
      participants: participantNumber,
      percent,
      estimatedBudget: report.estimatedBudget || "",
      actualBudget: report.actualBudget || "",
      impactNumber: report.impactNumber || "",
      impactUnit: report.impactUnit || "",
      organizer: report.organizer || "",
      externalPartner: report.externalPartner || "",
      externalPartnerCount: report.externalPartnerCount || ""
    });
  });

  // Appliquer styles sur toutes les lignes (lignes 2 à fin)
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber >= 2) {
      row.height = 40;
    }
    row.eachCell(cell => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
      cell.alignment = { wrapText: true, vertical: "middle" };
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "CSR_Reports_Consolidated.xlsx";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});
});

function toggleComment(button) {
  const commentDiv = button.nextElementSibling;
  commentDiv.style.display = commentDiv.style.display === "none" ? "block" : "none";
}
