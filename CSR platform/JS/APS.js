// 📌 Ajoute une ligne dynamique
function addActionRow() {
	const tbody = document.getElementById("aps-body");
	const row = document.createElement("tr");
	row.innerHTML = `
        <td>
        <select name="entity[]">
            <option value="" disabled selected hidden>Select a site</option>

            <!-- North Africa -->
            <option>Tunis</option>
            <option>Mdjez El Beb</option>
            <option>Kenitra</option>
            <option>Tangier</option>

            <!-- Europe -->
            <option>Guarda</option>
            <option>Guarda 2</option>
            <option>Ploiești</option>
            <option>Romania</option>
            <option>Serbia</option>

            <!-- America -->
            <option>Durango</option>
            <option>Honduras</option>
            <option>Juarez</option>
            <option>Léon</option>

            <!-- Asia -->
            <option>Tianjin</option>
            <option>Tianjin 2</option>
        </select>
        </td>

		<td>
			<select name="category[]">
				<option value="" disabled selected hidden></option>
				<option>Health</option>
				<option>Environment</option>
				<option>Social</option>
				<option>Sports</option>
				<option>Education</option>
				<option>Others</option>
			</select>
		</td>
		<td><input type="text" name="activityType[]"></td>
		<td><textarea name="activityDescription[]" rows="2"></textarea></td>
		<td>
			<select name="organization[]">
				<option value="" disabled selected hidden></option>
				<option>Partnership</option>
				<option>Internal</option>
			</select>
		</td>
		<td><input type="text" name="externalEntity[]"></td>
		<td><input type="number" name="cost[]"></td>
		<td>
			<select name="contractType[]">
				<option value="" disabled selected hidden></option>
				<option>One shot</option>
				<option>Successive performance</option>
			</select>
		</td>
		<td>
			<select name="periodicity[]">
				<option value="" disabled selected hidden></option>
				<option>N/A</option>
				<option>Every month</option>
				<option>Every 2 months</option>
				<option>Every 3 months</option>
				<option>Every 6 months</option>
				<option>Every year</option>
				<option>Every two years</option>
			</select>
		</td>
		<td><input type="number" name="volunteers[]"></td>
		<td><input type="number" name="impactValue[]"></td>
		<td>
			<select name="impactUnit[]">
				<option value="" disabled selected hidden></option>
				<option>People</option>
				<option>Children</option>
				<option>Trees</option>
				<option>m²</option>
				<option>Tonnes</option>
				<option>Litres</option>
				<option>Hours</option>
				<option>Meals</option>
				<option>Visits</option>
				<option>Workshops</option>
				<option>Others</option>
			</select>
		</td>
		<td><input type="text" name="impactDuration[]"></td>
		<td><input type="text" name="sustainability[]"></td>
		<td>
			<select name="status[]">
				<option value="" disabled selected hidden></option>
				<option>Finished</option>
				<option>Ongoing</option>
			</select>
		</td>
	`;
	tbody.appendChild(row);
}


// ✅ Sauvegarde toutes les lignes dans localStorage
function handleSubmit(event) {
	event.preventDefault();

	const form = document.getElementById("aps-form");
	const formData = new FormData(form);
    // le site sera pris dans chaque ligne comme "entity"

	const totalRows = document.querySelectorAll("#aps-body tr").length;
	const newRows = [];

	for (let i = 0; i < totalRows; i++) {
		newRows.push({
			site: formData.getAll("entity[]")[i],
			entity: formData.getAll("entity[]")[i],
			category: formData.getAll("category[]")[i],
			activityType: formData.getAll("activityType[]")[i],
			activityDesc: formData.getAll("activityDescription[]")[i],
			organization: formData.getAll("organization[]")[i],
			externalEntity: formData.getAll("externalEntity[]")[i],
			cost: formData.getAll("cost[]")[i],
			contractType: formData.getAll("contractType[]")[i],
			periodicity: formData.getAll("periodicity[]")[i],
			volunteers: formData.getAll("volunteers[]")[i],
			impactValue: formData.getAll("impactValue[]")[i],
			impactUnit: formData.getAll("impactUnit[]")[i],
			impactDuration: formData.getAll("impactDuration[]")[i],
			sustainability: formData.getAll("sustainability[]")[i],
			status: formData.getAll("status[]")[i]
		});
	}

	// 🔄 Ajoute au localStorage
	const existing = JSON.parse(localStorage.getItem("csrPlans")) || [];
	const updated = existing.concat(newRows);
	localStorage.setItem("csrPlans", JSON.stringify(updated));

	alert("CSR Plan(s) submitted!");
	form.reset();
	document.getElementById("aps-body").innerHTML = "";
	addActionRow();
}

// 🔄 Au chargement
window.onload = () => {
	addActionRow();
	document.getElementById("aps-form").addEventListener("submit", handleSubmit);
};
