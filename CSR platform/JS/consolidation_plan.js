document.addEventListener("DOMContentLoaded", () => {
  const submittedPlans = JSON.parse(localStorage.getItem("csrPlans")) || [];

  // Liste des 14 sites attendus
  const allSites = [
    "Tunis", "Mdjez El Beb", "Kenitra", "Tangier",
    "Guarda", "Guarda 2", "Ploiești", "Romania", "Serbia",
    "Durango", "Honduras", "Juarez", "Léon",
    "Tianjin", "Tianjin 2"
  ];

  // Sites ayant soumis au moins un plan
  const submittedSiteSet = new Set(submittedPlans.map(plan => plan.site));
  const submittedCount = [...submittedSiteSet].filter(site => allSites.includes(site)).length;

  const statusText = `${submittedCount} out of ${allSites.length} sites have submitted their Annual CSR Plan.`;
  document.querySelector(".status-info").textContent = statusText;
});
