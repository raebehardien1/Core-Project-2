import { pool } from "../config/config.js";

const getreviews = async()=>{ 
    let [data] = await pool.query("SELECT * FROM attendanceandleave")
    return data
 }

 const insertreviews= async(  employee_id , date , attendance_status , leave_reason , leave_status)=>{
    await pool.query("INSERT INTO hr.attendanceandleave ( employee_id , date , attendance_status , leave_reason , leave_status ) VALUES (?, ?, ? ,?,?);", [  employee_id , date , attendance_status , leave_reason , leave_status ])
   
   return await getreviews();
 }



 const deletereviews= async (record_id) => {
    let [result] = await pool.query("DELETE FROM attendanceandleave WHERE record_id = ?", [record_id]); //let [result]  ia not neccessary in the code
    return result; // result contains affectedRows to check if deletion was successful
 }; 

 const updatereviews= async (  employee_id , date , attendance_status , leave_reason , leave_status, record_id ) =>{
   await pool.query('UPDATE hr.attendanceandleave SET employee_id=? , date=? , attendance_status=? , leave_reason=? , leave_status =? WHERE ( record_id = ?)',[ employee_id , date , attendance_status , leave_reason , leave_status , record_id])
   return await getreviews()
   };
 export {getreviews, insertreviews, deletereviews, updatereviews}



