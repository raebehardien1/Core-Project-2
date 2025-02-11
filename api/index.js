
import express from "express"
import employeesRouter from "./routes/employeesRouter.js"
import payrollRouter from "./routes/payrollRouter.js"
import reviewsRouter from "./routes/reviewsRouter.js"
import authRouter from "./routes/authRouter.js"
import cors from "cors"

// config()
const app = express()
app.use(cors()) //always make sure cors is on top 
app.use (express.json())

//this app takes path +imported file(middeleware)
app.use ('/employees',employeesRouter)
app.use ('/payroll',payrollRouter)
app.use ('/reviews',reviewsRouter)
app.use("/api/auth", authRouter);

// const pool = mysql.createPool({
//     host: process.env.host,
//     user: process.env.user,
//     password: process.env.password,
//     database: process.env.database //the process.env as we creatend a env folder for refernces
// })
app.listen(3002, () => {
    console.log('http://localhost:3002');
  }) 


 
//ALL GETS
 //gettign all the users
 app.get("/employees", async(req, res)=>{
    res.json({employee: await getemployees()})
    
 })
// function for the above
const getemployees = async()=>{ 
    let [data] = await pool.query("SELECT * FROM employee")
    return data
 }


 app.get("/payroll", async(req, res)=>{
   res.json({payroll: await getpayroll()})
   
})
// function for the above
const getpayroll= async()=>{ 
   let [data] = await pool.query("SELECT * FROM payroll")
   return data
}

app.get("/reviews", async(req, res)=>{
   res.json({attendanceandleave: await getreviews()})
   
})
// function for the above
const getreviews = async()=>{ 
   let [data] = await pool.query("SELECT * FROM attendanceandleave")
   return data
}




 //ALL POST
 app.post("/employees", async(req, res)=>{
    let { employee_id , name , position , department,base_salary,employment_history , email , username, password} = req.body //the parenthesis is a destructuring
    console.log(req.body); //body in the request has the data 
    res.json({employee: await insertemployees
      (employee_id , name , position , department,base_salary,employment_history , email , username, password)})
  })
 const insertemployees= async(  name , position , department,base_salary,employment_history , email , username, password)=>{
     await pool.query("INSERT INTO `hr`.`employee` (`name`, `position`, `department`, `base_salary`, `employment_history`, `email`, `username`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [ name , position , department, base_salary,employment_history , email , username, password])
    
    return await getemployees();//
  }
 

  app.post("/payroll", async(req, res)=>{
   let { payroll_id ,employee_id , hours_worked, leave_deductions, salary_paid , payroll_date} = req.body //the parenthesis is a destructuring
   console.log(req.body); //body in the request has the data 
   res.json({payroll: await insertpayroll( payroll_id ,employee_id , hours_worked, leave_deductions, salary_paid , payroll_date)})
 })
const insertpayroll= async( payroll_id ,employee_id , hours_worked, leave_deductions, salary_paid , payroll_date)=>{
    await pool.query("INSERT INTO hr.payroll ( payroll_id ,employee_id , hours_worked, leave_deductions, salary_paid , payroll_date ) VALUES (?, ?, ? ,?,?,?);", [payroll_id ,employee_id , hours_worked, leave_deductions, salary_paid , payroll_date])
   
   return await getpayroll();
 }


 app.post("/reviews", async(req, res)=>{
   let { employee_id , date , attendance_status , leave_reason , leave_status } = req.body;
   console.log(req.body);
   res.json({ attendanceandleave: await insertreviews(employee_id, date, attendance_status, leave_reason, leave_status) });
});


const insertreviews= async(   employee_id , date , attendance_status , leave_reason , leave_status)=>{
   pool.query('UPDATE hr.attendanceandleave SET employee_id=?, date=?, attendance_status=?, leave_reason=?, leave_status=? WHERE record_id = ?', [employee_id, date, attendance_status, leave_reason, leave_status, record_id])

   
   return await getreviews();  
 } 

 //2d
 //All DELETES

app.delete("/employees/:employee_id", async (req, res) => {
   let { employee_id } = req.params; 
   res.json({ employee: await deleteemployee(employee_id) }); 
});


// Function to delete a product from the database
const deleteemployee = async (employee_id) => {
    let [result] = await pool.query("DELETE FROM employee WHERE employee_id = ?", [employee_id]); //let [result]  ia not neccessary in the code
    return result; // result contains affectedRows to check if deletion was successful
};


app.delete("/payroll/:payroll_id", async (req, res) => {
   let { payroll_id } = req.params;
   console.log(req.params);
   res.json({ payroll : await deletepayroll(payroll_id) }); 
});


// Function to delete a product from the database
const deletepayroll= async (payroll_id) => {
   let [result] = await pool.query("DELETE FROM payroll WHERE payroll_id = ?", [payroll_id]); //let [result]  ia not neccessary in the code
   return result; // result contains affectedRows to check if deletion was successful
};


 
// Function to delete a product from the database
const deletereviews= async (record_id) => {
   let [result] = await pool.query("DELETE FROM reviews WHERE record_id = ?", [record_id]); //let [result]  ia not neccessary in the code
   return result; // result contains affectedRows to check if deletion was successful
};


//ALL PATCH 
app.patch("/employees/:employee_name", async (req, res) => {
   let { name } = req.params;
   console.log(req.params);
   res.json({ employee: await updateProduct(name) }); 
});
 
const updateemployee= async (employee_id , name , position , department,base_salary,employment_history , email , username, password) =>{
   pool.query('UPDATE hr.employee SET employee_id=?, position =?, department=?,base_salary=?,employment_history=?, email=? , username=?, password =? WHERE ( name = ?)',[employee_id , name , position , department,base_salary,employment_history , email , username, password ])
   return await getemployees()
   };


   app.patch("/payroll/:payroll_id", async (req, res) => {
      let { payroll_id } = req.params;
      console.log(req.params);
      res.json({ users: await updatepayroll(payroll_id) }); 
   });
   
   const updatepayroll= async (payroll_id , employee_id , hours_worked, leave_deductions, salary_paid , payroll_date) =>{
      pool.query('UPDATE hr.payroll SET employee_id=?, hours_worked=?, leave_deductions=?, salary_paid=?, payroll_date=?, WHERE ( payroll_id = ?)',[payroll_id , employee_id , hours_worked, leave_deductions, salary_paid , payroll_date ])
      return await getpayroll()
      };
      

      // app.patch("/reviews", async (req, res) => {
      //    let { record_id} = req.params;
      //    console.log(req.params);
      //    res.json({ attendanceandleave: await updatereviews(record_id) }); 
      // });
       
      // const updatereviews= async ( record_id , employee_id , date , attendance_status , leave_reason , leave_status) =>{
      //    pool.query('UPDATE hr.attendanceandleave SET employee_id=?, date=? , attendance_status=? , leave_reason=? , leave_status, WHERE ( record_id = ?)',[ record_id , employee_id , date , attendance_status , leave_reason , leave_status])
      //    return await getreviews()
      //    };
      app.patch('/reviews/:record_id', async (req, res) => {
         const { record_id } = req.params;
         const { employee_id, date, attendance_status, leave_reason, leave_status } = req.body;
         
         try {
           // Call the updatereviews function
           const result = await updatereviews(record_id, employee_id, date, attendance_status, leave_reason, leave_status);
           
           // Send the response after the update
           res.status(200).send({ message: "Record updated successfully", result });
         } catch (error) {
           console.error('Error updating record:', error);
           res.status(500).send('Internal Server Error');
         }
       });
        
       // Function for updating reviews
       const updatereviews = async (record_id, employee_id, date, attendance_status, leave_reason, leave_status) => {
         console.log("Updating leave status for record", record_id);
         console.log("Payload:", { record_id, employee_id, date, attendance_status, leave_reason, leave_status });
       
         // Ensure date is formatted as YYYY-MM-DD
         const formattedDate = new Date(date).toISOString().slice(0, 10); // Converts to YYYY-MM-DD format
       
         return new Promise((resolve, reject) => {
           pool.query(
             'UPDATE hr.attendanceandleave SET employee_id=?, date=?, attendance_status=?, leave_reason=?, leave_status=? WHERE record_id=?',
             [employee_id, formattedDate, attendance_status, leave_reason, leave_status, record_id],
             (error, results) => {
               if (error) {
                 console.error("Error updating leave status:", error);
                 reject(error);
               } else {
                 resolve(results);
               }
             }
           );
         });
       };
       
      
       
       

        
          