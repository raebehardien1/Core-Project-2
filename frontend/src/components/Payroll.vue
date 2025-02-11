<template>
  <h1><img id="icon" src="../../public/img/favicon_io (1)/favicon-32x32.png">Payroll</h1>
  <div class="payroll-container">
    <button @click="openModal"> +Add payroll</button>

    <!-- Modal -->
    <div v-if="isModalVisible" class="modal">
  <div class="modal-content">
    <span class="close" @click="closeModal">&times;</span>
    <!-- Form starts here -->
    <form @submit.prevent="addPayroll">
      <h3>{{ isEditing ? 'Edit Payroll' : 'Add New Payroll' }}</h3>
      <div>
        <label for="payrollId">Payroll ID:</label>
        <input type="text" v-model="newPayroll.payroll_id" required />
      </div>
      <div>
        <label for="employeeId">Employee ID:</label>
        <input type="text" v-model="newPayroll.employee_id" required />
      </div>
      <div>
        <label for="hoursWorked">Hours Worked:</label>
        <input type="text" v-model="newPayroll.hours_worked" required />
      </div>
      <div>
        <label for="leaveDeductions">Leave Deductions:</label>
        <input type="number" v-model="newPayroll.leave_deductions" />
      </div>
      <div>
        <label for="payrollAmount">Salary:</label>
        <input type="number" v-model="newPayroll.salary_paid" />
      </div>

      <div>
        <label for="payrollDate">Payroll Date:</label>
        <input type="text" v-model="newPayroll.payroll_date" />
      </div>
      <button type="submit">{{ isEditing ? 'Save changes' : '+Add' }}</button>
    </form>
  </div>
</div>


    <!-- Payroll Table -->
     <div class="table container"> 
    <table border="1">
      <thead>
        <tr>
          <th>Payroll ID</th>
          <th>Employee ID</th>
          <th>Hours Worked</th>
          <th>Leave Deductions </th>
          <th>Salary</th>
          <th>Payroll Date</th>
          <th>Action</th>
          <th>Download</th>
        
            <!-- Button to generate payslip -->
           
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="(payroll, index) in $store.state.payroll" :key="payroll.payrollId">
          <td>{{ payroll.payroll_id }}</td>
          <td>{{ payroll.employee_id }}</td>
          <td>{{ payroll.hours_worked}}</td>
          <td>{{ payroll.leave_deductions }}</td>
          <td>{{ payroll.salary_paid}}</td>
          <td>{{ payroll.payroll_date}}</td>
          <td class="action-buttons">
            <button @click="editPayroll(index)" class="editbutton">Edit</button>
            <button @click="deletePayroll(payroll.payroll_id)" class="deletebutton">Delete</button>
          </td>
        
          <td>
            <!-- Button to generate payslip -->
            <button @click="generatePayslip(payroll)">Generate Payslip</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<!-- Script -->
<script>
import { jsPDF } from 'jspdf';

export default {
mounted(){
  this.$store.dispatch('fetchPayroll')
},

  data() {
    return {
      isModalVisible: false,
      isEditing: false,
      editIndex: null,
      newPayroll: {
        payrollId: '',
        employeeId: '',
        hoursWorked: 0,
        leaveDeductions: 0,
        salary: 0,
      },
      
    };
  },
  methods: {
    // add payroll in methods
    async addPayroll() {
  if (this.isEditing) {
    // Call Vuex update action, passing only modified payroll
    await this.$store.dispatch("updatePayroll", this.newPayroll);
  } else {
    await this.$store.dispatch("insertPayroll", this.newPayroll);
  }
  this.closeModal();
}
,

    // update payroll in methods
    async updatePayroll() {
  if (this.isEditing) {
    await this.$store.dispatch("updatePayroll", {
      index: this.editIndex,
      payroll: this.newPayroll,
    });
    this.closeModal();
  }
},


    // delete payroll in methods
    async deletePayroll(payroll_id) {
  const confirmDelete = confirm("Are you sure you want to delete this payroll?");
  if (confirmDelete) {
    await this.$store.dispatch("deletePayroll", payroll_id);
  }
},


    openModal() {
      this.isModalVisible = true;
      console.log(8);
      
      this.isEditing = false; // Set editing mode to false
      // Reset form for new payroll
      this.newPayroll = {
        payrollId: '',
        dateFrom: '',
        dateTo: '',
        status: '',
        action: '',
        hoursWorked: 0,
        hourlyRate: 0,
        salary: 0,
        isSalary: false,
        payrollAmount: 0,
      };
    },
    closeModal() {
      this.isModalVisible = false; 
      this.isEditing = false;
      this.editIndex = null;
      this.newPayroll = {
      payrollId: '',
      employeeId: '',
      hoursWorked: 0,
      leaveDeductions: 0,
      salary: 0,
    };// Close the modal
    },
    savePayroll() {
      this.calculatePayroll(); // Ensure salary calculation
  
  if (this.isEditing) {
    // Directly update the payroll item
    this.payrolls[this.editIndex] = { ...this.newPayroll, finalSalary: this.newPayroll.salary };
  } else {
    this.payrolls.push({ 
      ...this.newPayroll, 
      finalSalary: this.newPayroll.salary // Assign salary to finalSalary
    });
  }
  
  this.closeModal(); // Close the modal after saving
},
editPayroll(index) {
  this.isEditing = true;
  this.editIndex = index; // Store index of the payroll being edited
  const selectedPayroll = this.$store.state.payroll[index]; // Get the payroll object

  // Ensure data is copied correctly
  this.newPayroll = {
    payroll_id: selectedPayroll.payroll_id,
    employee_id: selectedPayroll.employee_id,
    hours_worked: selectedPayroll.hours_worked,
    leave_deductions: selectedPayroll.leave_deductions,
    salary_paid: selectedPayroll.salary_paid,
    payroll_date: selectedPayroll.payroll_date,
  };

  this.isModalVisible = true; // Open modal for editing
}
,
    calculatePayroll() {
      // Compute payroll amount based on hours or salary
      if (this.newPayroll.isSalary) {
        this.newPayroll.payrollAmount = this.newPayroll.salary / 12;
      } else {
        this.newPayroll.payrollAmount = this.newPayroll.salary - this.newPayroll.leaveDeductions;
      }
    },
    // deletePayroll(index) {
    //   // Remove the selected payroll
    //   this.payrolls.splice(index, 1);
    // },

    generatePayslip(payroll) {
  const doc = new jsPDF();

  // Set page border (A4 size: 210mm x 297mm)
  doc.setLineWidth(1); // Set border width
  doc.setDrawColor(0, 0, 0); // Set border color (black)
  doc.rect(5, 5, 200, 287); // Draw border slightly inside the page margins

  // Function to load an image and convert it to Base64
  const loadImageAsBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Handle CORS if necessary
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = (err) => reject(err);
    });
  };

  // Load the logo image from a relative path
  const logoUrl = "assets/newlogo.png"; // Replace with your logo's relative path

  loadImageAsBase64(logoUrl)
    .then((logoBase64) => {
      // Add the logo image to the PDF (position: x, y, width, height)
      doc.addImage(logoBase64, "PNG", 10, 10, 30, 30);

      // Title
      doc.setFont("helvetica", "normal");
      doc.setFontSize(20);
      doc.setTextColor(0, 0, 0); // Black color for text
      doc.text("ModernTech Payslip", 105, 30, null, null, "center");

      // Draw a line under the title
      doc.setLineWidth(0.5);
      doc.line(20, 40, 190, 40);

      // Set font size for details
      doc.setFontSize(12);

      // Payroll details
      doc.text(`Employee Name and Surname: ${payroll.payroll_id || "N/A"}`, 20, 50);
      doc.text(`Employee ID: ${payroll.employee_id || "N/A"}`, 20, 60);
      doc.text(`Hours Worked: ${payroll.hours_worked || "N/A"}`, 20, 70);
      doc.text(`Leave Deductions: ${payroll.leave_deductions || "N/A"}`, 20, 80);
      doc.text(`Final Salary: R${payroll.salary_paid || "Not provided"}`, 20, 90);

      // Add a table-like structure
      doc.setLineWidth(0.2);
      doc.rect(20, 95, 170, 40); // Rectangle border for a section
      doc.text("Hours Worked: ", 25, 115);
      doc.text(`${payroll.hours_worked || "N/A"}`, 90, 115);

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100); // Grey color for footer
      doc.text(
        "Generated by ModernTech Solutions Paysystem",
        105,
        280,
        null,
        null,
        "center"
      );

      // Save the generated PDF
      doc.save(`${payroll.employeeName || "Employee"}-Payslip.pdf`);
    })
    .catch((err) => {
      console.error("Error loading image:", err);
    });
}

  },
};
</script>


<!-- CSS -->
<style scoped>
  /* Modal Container */
  .modal{
    display: flex;
    justify-content: center;
    
  }

  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
  }

  
  .modal-content {
  background-color: #ffffff;
  border: none;
  border-radius: 8px; /* Rounded corners */
  padding: 20px;
  width: 90%; /* Responsive width */
  max-width: 500px; /* Limit form width */
  max-height: 70vh; /* Limit form height (70% of viewport height) */
  overflow-y: auto; /* Enable vertical scrolling */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-in-out;
}

/* Optional: Add custom scrollbar styling */
.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-thumb {
  background-color: #007bff;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background-color: #0056b3;
}


/* Modal Close Button */
.close {
  color: #333;
  float: right;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.2s ease;
}

.close:hover {
  color: #ff0000;
}

/* Buttons */
button {
  background-color: lightgray;
  color: black;
  border: none;
  height: 50px;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease; 
}
.deletebutton{
  background-color: lightgray;
}
.editbutton{
  background-color: orange;
}
button:hover {
  background-color: lightgray;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* Table Styling */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

table tr:nth-child(even) {
  background-color: #f9f9f9;
}

table tr:hover {
  background-color: #f1f1f1;
}

/* Input Fields */
input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

label {
  font-weight: bold;
}

/* Modal Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.payroll-container {
  width: 90%;
  margin: 20px auto;
}

.modal-content {
  width: 80%;
  margin: 20px auto;
}

/* Use media queries to adjust styles for different screen sizes */
@media only screen and (max-width: 768px) {
  .payroll-container {
    width: 100%;
    margin: 10px auto;
  }
  .modal-content {
    width: 90%;
    margin: 10px auto;
  }
}

@media only screen and (min-width: 769px) and (max-width: 1024px) {
  .payroll-container {
    width: 80%;
    margin: 20px auto;
  }
  .modal-content {
    width: 70%;
    margin: 20px auto;
  }
}

@media only screen and (min-width: 1025px) {
  .payroll-container {
    width: 70%;
    margin: 30px auto;
  }
  .modal-content {
    width: 60%;
    margin: 30px auto;
  }
}
@media only screen and (max-width: 768px) {
table {
font-size: 14px;
}
table th,
table td {
padding: 8px;
}
/* Stack table columns vertically on small screens */
table tr {
display: flex;
flex-direction: column;
}
table td {
display: block;
width: 100%;
}
}
@media only screen and (max-width: 480px) {
table {
font-size: 12px;
}
table th,
table td {
padding: 5px;
}
}
/* Add labels to table columns on small screens */
@media only screen and (max-width: 768px) {
table td {
position: relative;
padding-top: 20px;
}
table td::before {
content: attr(data-label);
position: absolute;
top: 0;
left: 0;
font-weight: bold;
font-size: 14px;
}
}

</style>

