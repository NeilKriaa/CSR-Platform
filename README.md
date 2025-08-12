# CSR Platform – Coficab Stage Project

This repository contains the **CSR (Corporate Social Responsibility) Platform** developed during my internship at Coficab.  
The platform is designed to simplify and centralize the submission, consolidation, and visualization of CSR Plans and CSR Reports for all Coficab sites worldwide.

## 🚀 Features
- **Login system** – User authentication to access the platform.
- **Annual Plan Submission** (`APS.html`) – Form to submit yearly CSR activity plans.
- **CSR Report Submission** (`CSR_report.html`) – Form to submit detailed CSR reports for completed activities.
- **Regional Pages** (`CSR_plan_regions/`) – Regional dashboards displaying submitted plans and reports by site.
- **Consolidation Pages** (`consolidation_plan.html`) – Consolidated tables for all regions with filters and automatic totals.
- **Benchmarking** (`benchmarking.html`) – Overview of submission status by site.
- **Final Views** (`final_report.html`) – Global summary pages including totals, category breakdowns, and filters.
- **Debug Tools** (`debug_localstorage.html`) – For testing and inspecting stored data.

## 📂 Project Structure

CSR-Platform/
│
├── APS.html # Annual Plan submission form
├── CSR_report.html # CSR Report submission form
├── benchmarking.html # Submission status dashboard
├── consolidation_plan.html # Consolidated CSR Plans
├── final_report.html # Global CSR Reports summary
├── debug_localstorage.html # LocalStorage debugging page
│
├── CSR_plan_regions/ # Regional CSR Plans dashboards
├── CSS/ # Stylesheets
├── JS/ # JavaScript files
├── Images/ # Images and logos
│
└── README.md # Project description (this file)


## 💾 Data Handling
- All data submitted through the forms is stored in **localStorage** in JSON format.
- Automatic updates propagate submissions to regional and global dashboards without manual input.

## 🌐 Deployment
The platform can be hosted using **GitHub Pages** or any static web server.  
To run locally, simply open `login.html` (or `index.html`) in a browser.

## 🛠 Technologies
- HTML5, CSS3, JavaScript (Vanilla)
- GitHub Pages (for hosting)
- LocalStorage (for client-side persistence)

---

