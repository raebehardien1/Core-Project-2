<template>
  <h1>
    <img id="icon" src="../../public/img/favicon_io (1)/favicon-32x32.png">
      Attendance
      <!-- {{ timeOffRequests }} -->
  </h1>
    <table class="parent" border="1">
  <thead>
    <tr>
      <th>Employee</th>
      <th colspan="2">Attendance</th>
      <th>Actions</th>
    </tr>
    <tr>
      <th></th>
      <th>Date</th>
      <th>Status</th>
      <th></th>
    </tr>
  </thead>

  <tbody>
    <tr v-for="employee in attendanceRecords" :key="employee.employeeId">
      <!-- Employee Name -->
      <td data-cell="record_id">{{ employee.record_id }}</td>

      <!-- Attendance Section -->
      <td data-cell="date">
          {{ employee.date }}
      </td>

      <td data-cell="status">
          <span v-if="employee.attendance_status === 'Present'">Present</span>
          <span v-else-if="employee.attendance_status === 'Absent'">Absent</span>
      </td>

      <!-- Actions Section -->
      <td data-cell="action">
        <button @click="deleteEmployeeInfo(employee.record_id)">Delete</button>
      </td>

    </tr>
  </tbody>
</table>

        <!-- New Time Off Table below -->
<h1 id="timeOff">Time Off</h1>
<table class="parent" border="1">
  <thead>
    <tr>
      <th>Record ID</th>
      <th>Employee ID</th>
      <th>Date</th>
      <th>Attendance Status</th>
      <th>Leave Reason</th>
      <th>Leave Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="employee in timeOffRequests" :key="employee.employeeId">

      <td data-cell="record id">{{ employee.record_id }}</td>

      <!-- Time Off Section (Leave Requests) -->
      <td data-cell="employee id">
          {{ employee.employee_id }}
      </td>

      <td data-cell="date">
          {{ employee.date }}
      </td>

      <td data-cell="Attendance status">
          {{ employee.attendance_status }}
      </td>

      

      <td data-cell="leave reason">
          {{ employee.leave_reason }}
      </td>

      <td data-cell="leave status">
        <span v-if="employee.leave_status">{{ employee.leave_status }}</span>
        <span v-else> Pending </span>
      </td>

      <td data-cell="action">
        <!-- <div> -->
          <button @click="approveLeave(employee.record_id)">Approve</button>
          <button @click="declineLeave(employee.record_id)">Deny</button>
        <!-- </div> -->
      </td>

    </tr>
  </tbody>
</table>
</template>

<script>
export default {
  mounted() {
  this.$store.dispatch('fetchAttendanceAndLeave').then(() => {
    console.log("Attendance and Leave Data Fetched:", this.$store.state.attendanceandleave);
  });
},

computed: {
    attendanceRecords() {
      // Filter records that have attendance data
      return this.$store.state.attendanceandleave.filter(emp => emp.attendance_status);
    },
    timeOffRequests() {
      // Filter records that have leave requests and remove duplicates
      const uniqueRequests = new Map();

      // this.$store.state.attendanceandleave.forEach(emp => {
      //   if (emp.leave_reason) {
      //     uniqueRequests.set(emp.employee_id, emp); // Keep only the latest record per employee
      //   }
      // });

      // return Array.from(uniqueRequests.values());
      return this.$store.state.attendanceandleave
    }
  },

  data() {
    return{
      showModal: false, // Controls visibility of the modal for adding new employee
      editModalVisible: false, // Controls visibility of the edit modal
      newEmployee: {
        name: "" // New employee data
      },
      editEmployee: {
        employeeId: null,
        name: "", // Field to store the employee being edited
        date: "",
        status: ""
      }
    }
  },
  methods:{
     // Delete method
     deleteEmployeeInfo(record_id) {
      if (confirm("Are you sure you want to delete this record?")) {
        this.$store.dispatch("deleteAttendanceAndLeave", record_id);
      }
    },

    // approve and decline methods
    approveLeave(recordId) {
  const employee = this.timeOffRequests.find(emp => emp.record_id === recordId);
  console.log("Employee data:", employee);  // Check if date is available

  if (!employee.date) {
    console.error("Date is missing for employee", employee);
  }
  // employee_id, date, attendance_status, leave_reason, leave_status 
  this.$store.dispatch("updateLeaveStatus", {
    recordId,
    attendance_status: null,
    date: employee.date,  // Ensure date is included
    employee_id: employee.employee_id,  // Ensure employee_id is correct
    leave_reason:null,
    leave_status:"Approved"
  });
},

declineLeave(recordId) {
  const employee = this.timeOffRequests.find(emp => emp.record_id === recordId);
  console.log("Employee data:", employee);  // Check if date is available

  if (!employee.date) {
    console.error("Date is missing for employee", employee);
  }

  this.$store.dispatch("updateLeaveStatus", {
    recordId,
    attendance_status: null,
    date: employee.date,  // Ensure date is included
    employee_id: employee.employee_id,  // Ensure employee_id is correct
    leave_reason:null,
    leave_status:"Denied"
  });
}
,


    //edit method
    editEmployeeInfo(employee) {
      this.editEmployee = { ...employee }; // Create a copy of the employee to edit
      this.editModalVisible = true; // Show the edit modal
    },

    acceptLeave(leave) {
        alert(`Leave request for ${leave.date} has been accepted.`);
        // Additional logic to handle acceptance can go here
        // Update the status to "Approved"
        leave.status = "Approved"; 
      },
      
     

    // Method to handle updating employee info
   

    // Method to handle adding a new employee
   
  }
  };
</script>

<style scoped>
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

.editbutton{
  background-color: orange;
}
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

@media (max-width: 720px) {
  .parent {
    display: block;
    overflow-x: auto;
  }

  table {
    width: 100%;
    display: block;
    overflow-x: auto;
  }

  /* Keep the headers visible and sticky */
  thead {
    display: table-header-group;  /* Ensure header stays visible */
  }

  th {
   display: none;
  }

  /* Make table body and rows stack vertically */
  tbody {
    display: block;
  }

  tr {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  td {
    display: block;
    width: 100%;
    border: none;
    padding: 8px;
  }

  td::before{
    content: attr(data-cell) ": ";
    font-weight: 700;
    text-transform: capitalize;
    
  }

  /* Adjust the nested tables for attendance and leave requests */
  td table {
    width: 100%;
    display: block;
    margin-top: 10px;
  }

  td table th,
  td table td {
    width: 100%;
    display: block;
    border: 1px solid #ddd;
  }

  td table th {
    font-weight: bold;
  }

  td table tr {
    margin-bottom: 5px;
  }
}

  
</style>