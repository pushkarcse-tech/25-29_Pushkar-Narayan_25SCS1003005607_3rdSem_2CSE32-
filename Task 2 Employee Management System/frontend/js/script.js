const API_URL = "http://localhost:5000/api/employees";

const employeeForm = document.getElementById("employee-form");
const employeeList = document.getElementById("employee-list");
const employeeId = document.getElementById("employee-id");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const positionInput = document.getElementById("position");
const departmentInput = document.getElementById("department");

const formTitle = document.getElementById("form-title");
const cancelBtn = document.getElementById("cancel-btn");
const searchInput = document.getElementById("search");
const message = document.getElementById("message");

let employees = [];

/* =========================
   GET ALL EMPLOYEES
========================= */

async function fetchEmployees() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch employees");
        }

        employees = await response.json();

        displayEmployees(employees);

    } catch (error) {
        console.error(error);
        showMessage("Unable to load employees.", "red");
    }
}


/* =========================
   DISPLAY EMPLOYEES
========================= */

function displayEmployees(data) {

    employeeList.innerHTML = "";

    if (data.length === 0) {
        employeeList.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    No employees found
                </td>
            </tr>
        `;
        return;
    }

    data.forEach(employee => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.position}</td>
            <td>${employee.department}</td>

            <td>
                <button 
                    class="edit-btn"
                    onclick="editEmployee('${employee._id}')">
                    Edit
                </button>

                <button 
                    class="delete-btn"
                    onclick="deleteEmployee('${employee._id}')">
                    Delete
                </button>
            </td>
        `;

        employeeList.appendChild(row);
    });
}


/* =========================
   ADD / UPDATE EMPLOYEE
========================= */

employeeForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const employeeData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        position: positionInput.value.trim(),
        department: departmentInput.value.trim()
    };

    try {

        let response;

        /* UPDATE */
        if (employeeId.value) {

            response = await fetch(`${API_URL}/${employeeId.value}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employeeData)
            });

        }

        /* ADD */
        else {

            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employeeData)
            });

        }

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Something went wrong");
        }

        showMessage(
            employeeId.value
                ? "Employee updated successfully!"
                : "Employee added successfully!",
            "green"
        );

        resetForm();

        fetchEmployees();

    } catch (error) {

        console.error(error);

        showMessage(error.message, "red");
    }

});


/* =========================
   EDIT EMPLOYEE
========================= */

function editEmployee(id) {

    const employee = employees.find(emp => emp._id === id);

    if (!employee) {
        return;
    }

    employeeId.value = employee._id;

    nameInput.value = employee.name;
    emailInput.value = employee.email;
    positionInput.value = employee.position;
    departmentInput.value = employee.department;

    formTitle.textContent = "Edit Employee";

    document.querySelector(".btn-primary").textContent = "Update Employee";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   DELETE EMPLOYEE
========================= */

async function deleteEmployee(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to delete employee");
        }

        showMessage("Employee deleted successfully!", "green");

        fetchEmployees();

    } catch (error) {

        console.error(error);

        showMessage(error.message, "red");
    }
}


/* =========================
   CANCEL / RESET FORM
========================= */

cancelBtn.addEventListener("click", resetForm);

function resetForm() {

    employeeForm.reset();

    employeeId.value = "";

    formTitle.textContent = "Add Employee";

    document.querySelector(".btn-primary").textContent = "Add Employee";
}


/* =========================
   SEARCH EMPLOYEES
========================= */

searchInput.addEventListener("input", function () {

    const searchTerm = searchInput.value.toLowerCase().trim();

    const filteredEmployees = employees.filter(employee => {

        return (
            employee.name.toLowerCase().includes(searchTerm) ||
            employee.email.toLowerCase().includes(searchTerm) ||
            employee.position.toLowerCase().includes(searchTerm) ||
            employee.department.toLowerCase().includes(searchTerm)
        );

    });

    displayEmployees(filteredEmployees);
});


/* =========================
   MESSAGE
========================= */

function showMessage(text, color) {

    message.textContent = text;
    message.style.color = color;

    setTimeout(() => {
        message.textContent = "";
    }, 3000);
}


/* =========================
   INITIAL LOAD
========================= */

fetchEmployees();