import { getreviews, insertreviews, deletereviews , updatereviews} from "../model/reviewsDb.js"


 const gettimeawayController = async (req, res) => { 
    try {
        const attendanceandleave = await getreviews();
        res.status(200).json({ attendanceandleave });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const inserttimeawayController = async (req, res) => {
    try {
        let { employee_id, date, attendance_status, leave_reason, leave_status } = req.body;
        console.log(req.body); // body in the request has the data
        const attendanceandleave = await insertreviews(employee_id, date, attendance_status, leave_reason, leave_status);
        res.status(200).json({ attendanceandleave });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deletetimeawayController = async (req, res) => {
    try {
        let { record_id } = req.params;
        console.log(req.params);
        const attendanceandleave = await deletereviews(record_id);
        res.status(200).json({ attendanceandleave });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updatereviewController = async (req, res) => {
    // try {
        console.log('chu papi1');
        let { employee_id, date, attendance_status, leave_reason, leave_status } = req.body;
        let { record_id } = req.params;

        console.log(req.body);
        const attendanceandleave = await updatereviews(employee_id, date, attendance_status, leave_reason, leave_status, record_id);
        res.status(200).json({ attendanceandleave });
    // } catch (err) {
    //     res.status(500).json({ message: err.message });
    // }
};

export { gettimeawayController, inserttimeawayController, deletetimeawayController, updatereviewController };
