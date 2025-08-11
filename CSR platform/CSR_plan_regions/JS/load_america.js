document.addEventListener("DOMContentLoaded", () => {
  const regionSites = ["Durango", "Honduras", "Juarez", "Léon"];
  const allPlans = JSON.parse(localStorage.getItem("csrPlans")) || [];

  const tbody = document.getElementById("csr-table-body");
  const siteFilter = document.getElementById("site-filters");
  const categoryFilter = document.getElementById("category-filters");
  const organizationFilter = document.getElementById("organization-filters");
  const statusFilter = document.getElementById("status-filters");

  populateFilters();
  applyFilters();

  function populateFilters() {
    renderCheckboxes(siteFilter, regionSites, "Sites");
    renderCheckboxes(categoryFilter, getUnique("category"), "Categories");
    renderCheckboxes(organizationFilter, getUnique("organization"), "Organizations");
    renderCheckboxes(statusFilter, getUnique("status"), "Status");
  }

  function getUnique(field) {
    return [...new Set(allPlans
      .filter(p => regionSites.includes(p.site))
      .map(p => p[field])
      .filter(v => v && v.trim() !== "")
    )];
  }

  function renderCheckboxes(container, items, label) {
    container.innerHTML = `
      <label><input type="checkbox" value="All" checked> <strong>All ${label}</strong></label><br>
      ${items.map(val => `<label><input type="checkbox" value="${val}" checked> ${val}</label>`).join("<br>")}
    `;
  }

  function getSelected(container) {
    const all = container.querySelector('input[value="All"]')?.checked;
    const boxes = [...container.querySelectorAll('input:not([value="All"])')];
    return all ? boxes.map(cb => cb.value) : boxes.filter(cb => cb.checked).map(cb => cb.value);
  }

  function applyFilters() {
    const selectedSites = getSelected(siteFilter);
    const selectedCategories = getSelected(categoryFilter);
    const selectedOrgs = getSelected(organizationFilter);
    const selectedStatus = getSelected(statusFilter);

    tbody.innerHTML = "";
    allPlans.forEach(plan => {
      if (
        regionSites.includes(plan.site) &&
        selectedSites.includes(plan.site) &&
        selectedCategories.includes(plan.category) &&
        selectedOrgs.includes(plan.organization) &&
        selectedStatus.includes(plan.status)
      ) {
        const row = document.createElement("tr");
        row.innerHTML = generateRow(plan);
        tbody.appendChild(row);
      }
    });
  }

  function generateRow(plan) {
    return `
      <td>${plan.site}</td>
      <td>${plan.category}</td>
      <td>${plan.activityType}</td>
      <td>${plan.activityDesc}</td>
      <td>${plan.organization}</td>
      <td>${plan.externalEntity}</td>
      <td>${plan.cost}</td>
      <td>${plan.contractType}</td>
      <td>${plan.periodicity}</td>
      <td>${plan.volunteers}</td>
      <td>${plan.impactValue}</td>
      <td>${plan.impactUnit}</td>
      <td>${plan.impactDuration}</td>
      <td>${plan.sustainability}</td>
      <td>${plan.status}</td>
    `;
  }

  [siteFilter, categoryFilter, organizationFilter, statusFilter].forEach(container =>
    container.addEventListener("change", applyFilters)
  );
});
