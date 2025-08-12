let csrCount = 1;

function addCSRBlock() {
	const container = document.getElementById("csr-entries");

	const block = document.createElement("div");
	block.className = "csr-block";
	block.innerHTML = `
		<h3>CSR ${csrCount}</h3>

		<label>Period:</label>
		<input type="month" name="startMonth[]" required> to 
		<input type="month" name="endMonth[]" required>

		<label>COFICAB Site and Number of Employees:</label>
		<div style="display: flex; gap: 10px;">
			<select name="site[]" class="short" required>
				<option value="" disabled selected hidden>Select a site</option>
				<option>Tunis</option><option>Mdjez El Beb</option><option>Kenitra</option><option>Tangier</option>
				<option>Guarda</option><option>Guarda 2</option><option>Ploiești</option><option>Romania</option><option>Serbia</option>
				<option>Durango</option><option>Honduras</option><option>Juarez</option><option>Léon</option>
				<option>Tianjin</option><option>Tianjin 2</option>
			</select>
		</div>

		<label>Title of CSR:</label>
		<input type="text" name="title[]" required>

		<label>Description:</label>
		<textarea name="description[]" rows="3" required></textarea>

		<label>Category:</label>
		<select name="category[]" class="medium" required>
		<option value="" disabled selected hidden>Select a category</option>
		<option>Education</option>
		<option>Social</option>
		<option>Environment</option>
		<option>Sport</option>
		<option>Other</option>
		</select>

		<label>Budget (€):</label>
		<div style="display: flex; gap: 10px;">
			<input type="number" name="actualBudget[]" placeholder="Actual Budget (€)" class="medium" required>
			<input type="number" name="estimatedBudget[]" placeholder="Estimated Budget (€)" class="medium" required>
		</div>

		<label>Action Impact:</label>
		<div style="display: flex; gap: 10px;">
			<input type="number" name="impactNumber[]" placeholder="Impact Number" class="medium" required>
			<select name="impactUnit[]" class="medium" required>
				<option value="" disabled selected hidden>Impact Unit</option>
				<option>People</option>
				<option>Children</option>
				<option>Trees</option>
				<option>Hours</option>
				<option>Kg</option>
				<option>m²</option>
				<option>Liters</option>
				<option>Others</option>
			</select>

		</div>

		<label>Organizer:</label>
		<select name="organizer[]" class="medium" required>
			<option value="" disabled selected hidden>Select organizer type</option>
			<option>Internal</option>
			<option>Partnership</option>
		</select>

		<label>External Partner:</label>
		<input type="text" name="externalPartner[]" placeholder="Name of External Partner" required>
		<input type="number" name="externalPartnerCount[]" placeholder="Number of External Partners" required>

		<label>Many employees participated to volunteer?</label>
		<select name="participation[]" onchange="toggleEmployeeFields(this)" class="short" required>
			<option value="" disabled selected hidden></option>
			<option>No</option>
			<option>Yes</option>
		</select>
		<div class="conditional employee">
			<input type="number" name="participants[]" placeholder="Number of participants" required>
			<input type="text" name="comment1[]" placeholder="Comment">
		</div>

		<label>Is this activity a first in region/country/Genuity?</label>
		<select name="firstTime[]" onchange="toggleNext(this)" class="short" required>
			<option value="" disabled selected hidden></option>
			<option>No</option>
			<option>Yes</option>
		</select>
		<div class="conditional"><input name="comment2[]" type="text" placeholder="Comment"></div>

		<label>Activity appreciated by the community?</label>
		<select name="appreciated[]" onchange="toggleNext(this)" class="short" required>
			<option value="" disabled selected hidden></option>
			<option>No</option>
			<option>Yes</option>
		</select>
		<div class="conditional">
			<input name="external[]" type="number" placeholder="Number of external participants" required>
			<input name="comment3[]" type="text" placeholder="Comment">
		</div>

		<label>Activity contributed to improving corporate image?</label>
		<select name="image[]" onchange="toggleNext(this)" class="short" required>
			<option value="" disabled selected hidden></option>
			<option>No</option>
			<option>Yes</option>
		</select>
		<div class="conditional"><input name="comment4[]" type="text" placeholder="Comment"></div>

		<label>Is this an ongoing activity?</label>
		<select name="ongoing[]" onchange="toggleOngoingFields(this)" class="short" required>
			<option value="" disabled selected hidden></option>
			<option>No</option>
			<option>Yes</option>
		</select>
		<div class="conditional ongoing">
			<select name="year[]" required>
				<option value="" disabled selected hidden>Year of start</option>
				${generateYearsOptions(2010, 2025)}
			</select>
			<input name="edition[]" type="number" placeholder="Edition number" required>
			<input name="sponsor[]" type="text" placeholder="Internal sponsor" required>
			<input name="comment5[]" type="text" placeholder="Comment">
		</div>
	`;

	container.appendChild(block);
	csrCount++;
}

function toggleNext(select) {
	const next = select.nextElementSibling;
	if (select.value === "Yes") {
		next.style.display = "block";
		[...next.querySelectorAll("input, select, textarea")].forEach(el => {
			if (!el.name.startsWith("comment")) {
				el.required = true;
			} else {
				el.required = false;
			}
		});
	} else {
		next.style.display = "none";
		[...next.querySelectorAll("input, select, textarea")].forEach(el => el.required = false);
	}
}

function toggleEmployeeFields(select) {
	const group = select.parentElement.querySelector(".employee");
	if (select.value === "Yes") {
		group.style.display = "block";
		[...group.querySelectorAll("input")].forEach(el => {
			if (!el.name.startsWith("comment")) {
				el.required = true;
			} else {
				el.required = false;
			}
		});
	} else {
		group.style.display = "none";
		[...group.querySelectorAll("input")].forEach(el => el.required = false);
	}
}

function toggleOngoingFields(select) {
	const block = select.parentElement.querySelector(".ongoing");
	if (select.value === "Yes") {
		block.style.display = "block";
		[...block.querySelectorAll("input, select")].forEach(el => {
			if (!el.name.startsWith("comment")) {
				el.required = true;
			} else {
				el.required = false;
			}
		});
	} else {
		block.style.display = "none";
		[...block.querySelectorAll("input, select")].forEach(el => el.required = false);
	}
}

function generateYearsOptions(start, end) {
	let options = "";
	for (let y = start; y <= end; y++) {
		options += `<option>${y}</option>`;
	}
	return options;
}

window.onload = () => {
	addCSRBlock();

	document.getElementById("csr-report-form").addEventListener("submit", function (e) {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);
		const totalBlocks = document.querySelectorAll(".csr-block").length;
		const reports = [];

		for (let i = 0; i < totalBlocks; i++) {
			reports.push({
				site: formData.getAll("site[]")[i],
				title: formData.getAll("title[]")[i],
				description: formData.getAll("description[]")[i],
				category: formData.getAll("category[]")[i],
				actualBudget: formData.getAll("actualBudget[]")[i],
				estimatedBudget: formData.getAll("estimatedBudget[]")[i],
				impactNumber: formData.getAll("impactNumber[]")[i],
				impactUnit: formData.getAll("impactUnit[]")[i],
				organizer: formData.getAll("organizer[]")[i],
				externalPartner: formData.getAll("externalPartner[]")[i],
				externalPartnerCount: formData.getAll("externalPartnerCount[]")[i],
				period: {
					start: formData.getAll("startMonth[]")[i],
					end: formData.getAll("endMonth[]")[i]
				},
				participants: {
					number: formData.getAll("participants[]")[i],
					comment: formData.getAll("comment1[]")[i]
				},
				firstTime: {
					value: formData.getAll("firstTime[]")[i],
					comment: formData.getAll("comment2[]")[i]
				},
				appreciated: {
					value: formData.getAll("appreciated[]")[i],
					external: formData.getAll("external[]")[i],
					comment: formData.getAll("comment3[]")[i]
				},
				image: {
					value: formData.getAll("image[]")[i],
					comment: formData.getAll("comment4[]")[i]
				},
				ongoing: {
				value: formData.getAll("ongoing[]")[i],
				year: formData.getAll("year[]")[i],
				edition: formData.getAll("edition[]")[i],
				sponsor: formData.getAll("sponsor[]")[i],
				comment: formData.getAll("comment5[]")[i]
				}
			});
		}

		const existing = JSON.parse(localStorage.getItem("csrReports")) || [];
		localStorage.setItem("csrReports", JSON.stringify(existing.concat(reports)));
		alert("✅ CSR Reports submitted!");
		form.reset();
		document.getElementById("csr-entries").innerHTML = "";
		addCSRBlock();
	});
};

function deleteAllReports() {
	if (confirm("Are you sure you want to delete all saved CSR reports?")) {
		localStorage.removeItem("csrReports");
		alert("All CSR reports have been deleted.");
		location.reload();
	}
}
