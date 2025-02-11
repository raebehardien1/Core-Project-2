import { getemployees , insertemployees , deleteemployee , updateemployee} from "../model/employeesDb.js" 

const getemployeesController = async (req, res) => {
   try {
      res.status(200).json({ employees: await getemployees() });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

const insertemployeesController = async (req, res) => {
   try {
      let { name, position, department, base_salary, employment_history, email, username, password } = req.body;
      console.log(req.body);

      const employee = await insertemployees(name, position, department, base_salary, employment_history, email, username, password);
      res.status(200).json({ employee });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

const deleteemployeeController = async (req, res) => {
   try {
      let { employee_id } = req.params;
      console.log(req.params);

      const employee = await deleteemployee(employee_id);
      res.status(200).json({ employee });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

const updateemployeeController = async (req, res) => {
   try {
      let { employee_id, name, position, department, base_salary, employment_history, email, username, password } = req.body;
      console.log(req.body);

      const employee = await updateemployee(employee_id, name, position, department, base_salary, employment_history, email, username, password);
      res.status(200).json({ employee });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

export { getemployeesController, insertemployeesController, deleteemployeeController, updateemployeeController };
