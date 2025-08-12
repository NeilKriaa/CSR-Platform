function toggleSubmissionStatus() {
  const box = document.getElementById("submission-status-box");
  const tableBody = document.getElementById("status-table-body");

  box.style.display = box.style.display === "none" ? "block" : "none";
  tableBody.innerHTML = ""; // reset tableau

  const allSites = [
    "Tunis", "Mdjez El Beb", "Kenitra", "Tangier",     // North Africa
    "Guarda", "Guarda 2", "Ploiești", "Romania", "Serbia", // Europe
    "Durango", "Honduras", "Juarez", "Léon",           // America
    "Tianjin", "Tianjin 2"                             // Asia
  ];

  const reports = JSON.parse(localStorage.getItem("csrReports")) || [];
  const plans = JSON.parse(localStorage.getItem("csrPlans")) || [];

  allSites.forEach(site => {
    const hasReport = reports.some(r => r.site === site);
    const hasPlan = plans.some(p => p.site === site);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${site}</td>
      <td style="color: ${hasReport ? 'green' : 'red'};">${hasReport ? "✔️ Submitted" : "❌ Missing"}</td>
      <td style="color: ${hasPlan ? 'green' : 'red'};">${hasPlan ? "✔️ Submitted" : "❌ Missing"}</td>
    `;
    tableBody.appendChild(row);
  });
}
