import { pool } from "../config/config.js";

 const getpayroll= async () => {
    let [data] = await pool.query("SELECT * FROM payroll");
    return data;
};
 
const insertpayroll= async(  employee_id , hours_worked, leave_deductions, salary_paid , payroll_date)=>{
    await pool.query("INSERT INTO hr.payroll (employee_id , hours_worked, leave_deductions, salary_paid , payroll_date ) VALUES ( ?, ? ,? ,? ,?);", [employee_id , hours_worked, leave_deductions, salary_paid , payroll_date])
   
   return await getpayroll();//edited from here--mickey
 }

 const deletepayroll= async (payroll_id) => {
    let [result] = await pool.query("DELETE FROM payroll WHERE payroll_id = ?", [payroll_id]); //let [result]  ia not neccessary in the code
    return result; // result contains affectedRows to check if deletion was successful
 }

 const updatepayroll= async (employee_id , hours_worked, leave_deductions, salary_paid , payroll_date, payroll_id) =>{
    pool.query('UPDATE hr.payroll SET  employee_id=? ,hours_worked=?, leave_deductions=?, salary_paid=?, payroll_date=? WHERE ( payroll_id = ?)',[employee_id , hours_worked, leave_deductions, salary_paid , payroll_date, payroll_id]) //the pk must be in parameter and statement
    return await getpayroll()
    }

export {getpayroll, insertpayroll, deletepayroll, updatepayroll}
