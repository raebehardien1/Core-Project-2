
import { pool } from "../config/config.js";

const getemployees = async()=>{ 
    let [data] = await pool.query("SELECT * FROM employee")
    return data
 }

 const insertemployees= async( name , position , department,base_salary,employment_history , email , username, password)=>{
    await pool.query("INSERT INTO `hr`.`employee` (`name`, `position`, `department`, `base_salary`, `employment_history`, `email`, `username`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [  name , position , department,base_salary,employment_history , email , username, password])
   
   return await getemployees();
 }
 

 const deleteemployee = async (name) => {
    let [result] = await pool.query("DELETE FROM employee WHERE employee_id = ?", [name]); //let [result]  ia not neccessary in the code
    return result; // result contains affectedRows to check if deletion was successful
};


const updateemployee= async (employee_id , name , position , department,base_salary,employment_history , email , username, password) =>{
    pool.query('UPDATE hr.employee SET  name=? , position=?, department =?,base_salary =?,employment_history=?, email=? , username=?, password=? WHERE ( employee_id = ?)',[ name , position , department,base_salary,employment_history , email , username, password,employee_id])
    return await getemployees()
    };

    export {getemployees, insertemployees, deleteemployee, updateemployee}