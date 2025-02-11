import { createStore } from 'vuex'

export default createStore({
  state: {
    // store data
    employees: [],
    attendanceandleave:[],
    payroll:[]

  },
  getters: {
  },
  mutations: {
    // change state

    // view employees
    viewEmployees(state,payload){
      state.employees = payload
    },

    // insert employees
    insertEmployeesToState(state, employees){
      state.employees.push(employees)
    },

    // update employees mutation
    updateEmployeesToState(state, updatedEmployee) {
      const index = state.employees.findIndex(emp => emp.employee_id === updatedEmployee.employee_id);
      if (index !== -1) {
        // ✅ Ensure Vue detects the change
        state.employees[index] = { ...updatedEmployee };
        state.employees = [...state.employees]; // Important for reactivity in Vue 3
      }
    },
    

    // delete employees in mutations
    deleteEmployeesToState(state, employee_id){
      state.employees = state.employees.filter(employee => employee.employee_id !== employee_id)
    },

    // view payroll mutations
    viewPayroll(state,payload){
      state.payroll = payload
    },
    // insert payroll mutations
    insertPayrollToState(state, payroll){
      state.payroll.push(payroll)
    },
    // update payroll mutations
    updatePayrollToState(state, updatePayroll){
      const index = state.payroll.findIndex(payroll => payroll.payroll_id === updatePayroll.payroll_id);
      if (index !== -1) {
        state.payroll[index] = updatePayroll;
      }
    },

    // delete payroll mutations
    deletePayrollToState(state, payroll_id) {
      if (!state.payroll) {
        console.error("state.payroll is undefined!");
        return;
      }
    
      console.log("Before Deletion:", state.payroll);
    
      state.payroll = state.payroll.filter(payroll => payroll.payroll_id !== payroll_id);
    
      console.log("After Deletion:", state.payroll);
    },
    

    // view attendanceandleave mutations
    viewAttendanceAndLeave(state,payload){
      state.attendanceandleave = payload
    },

    // delete attendanceandleave mutations
    deleteAttendanceAndLeaveToState(state, record_id) {
      state.attendanceandleave = state.attendanceandleave.filter(record => record.record_id !== record_id);
    },

    // leave status mutation
    UPDATE_LEAVE_STATUS(state, { recordId, status, employeeId }) {
      const recordIndex = state.attendanceandleave.findIndex(emp => emp.record_id === recordId && emp.employee_id === employeeId);
      if (recordIndex !== -1) {
        console.log("Before updating:", state.attendanceandleave);
        state.attendanceandleave[recordIndex].leave_status = status;
        console.log("After updating:", state.attendanceandleave);
      }
    },
    
  
    // You can also add this to handle the direct update after an API call if needed
    updateAttendanceAndLeaveRecord(state, updatedRecord) {
      const index = state.attendanceandleave.findIndex(record => record.record_id === updatedRecord.record_id);
      if (index !== -1) {
        state.attendanceandleave[index] = updatedRecord;
      }
    }
    
    
  },
  actions: {
    // async functions

    // fetch employees
    async fetchEmployees({commit}){
      try{
        const response = await fetch('http://localhost:3002/employees');
        if (!response.ok) throw new Error("Failed to fetch employees");

        const data = await  response.json();
        console.log(data);
        
        commit('viewEmployees', data.employees);
      }catch(error){
        console.error("Error fetching employees:", error);
      }
    },

    // insert employees
    async insertEmployees({commit},employees){
      const response = await fetch('http://localhost:3002/api/auth/register',{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employees)
      })

      if (response.ok) {
        commit("insertEmployeesToState", employees); // Update local state
      }
    },

    // update employees action
    async updateEmployees({commit}, employee) {
      // Corrected the URL with proper template literals
      const response = await fetch(`http://localhost:3002/employees/${employee.employee_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee), // Send the employee data in the request body
      });
    
      // Handle the response if needed
      if (response.ok) {
        const updatedEmployee = await response.json();
        commit('updateEmployeesToState', updatedEmployee); // Commit to Vuex store (if you have a mutation for updating)
        location.reload()
      } else {
        console.error('Failed to update employee');
      }
    },

      // delete product in actions
  async deleteEmployees({ commit }, employee_id) {
    try {
      const response = await fetch(`http://localhost:3002/employees/${employee_id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        commit("deleteEmployeesToState", employee_id); // Update local state
      }
    } catch (error) {
      console.error("Error deleting employees:", error);
    }
  },


  // view payroll actions
  async fetchPayroll({commit}){
    try{
      const response = await fetch('http://localhost:3002/payroll');
      if (!response.ok) throw new Error("Failed to fetch payroll");

      const data = await  response.json();
      console.log(data);
      
      commit('viewPayroll', data.payroll);
    }catch(error){
      console.error("Error fetching payroll:", error);
    }
  },
    // insert payroll actions
    async insertPayroll({ commit }, payroll) {
      try {
        const response = await fetch('http://localhost:3002/payroll', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payroll)
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response from server:", errorData);
          throw new Error(`Failed to insert payroll: ${errorData.message || response.statusText}`);
        }
    
        commit("insertPayrollToState", payroll); // Update local state if success
    
      } catch (error) {
        console.error("Error inserting payroll:", error);
      }
    },
    

    // update payroll actions
    async updatePayroll({ commit }, payroll) {
      if (!payroll || !payroll.payroll_id) {
        console.error("Error: payroll_id is undefined");
        return; // Stop execution if payroll_id is missing
      }
    
      try {
        const response = await fetch(`http://localhost:3002/payroll/${payroll.payroll_id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payroll),
        });
    
        if (response.ok) {
          const updatedPayroll = await response.json();
          commit('updatePayrollToState', updatedPayroll);
        } else {
          console.error('Failed to update payroll');
        }
        location.reload()
      } catch (error) {
        console.error("Error updating payroll:", error);
      }
    },
    
    

    // delete payroll actions
    async deletePayroll({ commit }, payroll_id) {
      try {
        const response = await fetch(`http://localhost:3002/payroll/${payroll_id}`, {
          method: 'DELETE',
        });
    
        const data = await response.json();
        console.log("Delete Response:", data);
    
        if (response.ok) {
          commit("deletePayrollToState", payroll_id);
        } else {
          console.error("Failed to delete payroll");
        }
      } catch (error) {
        console.error("Error deleting payroll:", error);
      }
    },
    
    
    // attendanceandleave actions
    // fetch attendanceandleave
    async fetchAttendanceAndLeave({ commit }) {
      try {
        const response = await fetch('http://localhost:3002/reviews');
        if (!response.ok) throw new Error("Failed to fetch attendanceandleave");
    
        const data = await response.json();
        console.log("Fetched data:", data.attendanceandleave);
        
        // Log before committing the state
        console.log("State before commit:", this.state.attendanceandleave);
    
        commit('viewAttendanceAndLeave', data.attendanceandleave);
    
        // Log after committing the state to track changes
        console.log("State after commit:", this.state.attendanceandleave);
      } catch (error) {
        console.error("Error fetching attendanceandleave:", error);
      }
    },
    

    // delete attendance
    async deleteAttendanceAndLeave({ commit }, record_id) {
      try {
        const response = await fetch(`http://localhost:3002/reviews/${record_id}`, {
          method: 'DELETE'
        });
  
        if (response.ok) {
          commit("deleteAttendanceAndLeaveToState", record_id);
        } else {
          console.error("Failed to delete record");
        }
      } catch (error) {
        console.error("Error deleting record:", error);
      }
    },

    // leave status mutation
    async updateLeaveStatus({ commit, dispatch }, { recordId, attendance_status, date, employee_id,leave_reason , leave_status}) {
      try {
        date = date.split('T')[0]
        
        const response = await fetch(`http://localhost:3002/reviews/${recordId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({employee_id, date, attendance_status, leave_reason, leave_status}),
          
        });
        
        console.log(`Updating leave status for record ${recordId} to ${leave_status}`);
    
        // Ensure employee_id is not null
        if (!employee_id) {
          throw new Error("Employee ID is required.");
        }
    
        // Format the date as YYYY-MM-DD
        const formattedDate = new Date(date).toISOString().slice(0, 10);
    
        // Simulate updating the state without fetching new data
        commit('UPDATE_LEAVE_STATUS', { recordId, leave_status });
    
        // Log to confirm
        console.log('Updated state after status change:', this.state.attendanceandleave);
    
        // If necessary, manually update the record here instead of refetching data:
        // const updatedRecord = { record_id: recordId, leave_status: status, date: formattedDate, employee_id: employeeId };
        // commit('updateAttendanceAndLeaveRecord', updatedRecord);
        location.reload()
        // this.$router.push('/#timeOff')
      } catch (error) {
        console.error("Error updating leave status:", error);
      }
    }
    
    
  
    
  },
  modules: {
  }
})
