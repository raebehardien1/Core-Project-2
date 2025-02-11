import {getpayroll, insertpayroll, updatepayroll, deletepayroll} from "../model/payrollDb.js"

const getpayrollController = async (req, res) => {
  try {
      res.status(200).json({ payroll: await getpayroll() });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

const insertpayrollController = async (req, res) => {
  try {
     let { employee_id, hours_worked, leave_deductions, salary_paid, payroll_date } = req.body;
     console.log(req.body);
     
     const payroll = await insertpayroll(employee_id, hours_worked, leave_deductions, salary_paid, payroll_date);
     res.status(200).json({ payroll });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

const updatepayrollController = async (req, res) => {
  try {
     let { payroll_id } = req.params;
     let { employee_id, hours_worked, leave_deductions, salary_paid, payroll_date } = req.body;
     console.log(req.params);
     
     const payroll = await updatepayroll(employee_id, hours_worked, leave_deductions, salary_paid, payroll_date, payroll_id);
     res.status(200).json({ payroll });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

const deletepayrollController = async (req, res) => {
  try {
      let { payroll_id } = req.params;
      console.log(req.params);
      
      const payroll = await deletepayroll(payroll_id);
      res.status(200).json({ payroll });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

export { getpayrollController, insertpayrollController, updatepayrollController, deletepayrollController };
