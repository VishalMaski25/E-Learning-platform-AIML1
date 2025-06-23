// const mongoose = require("mongoose");

// const attendanceSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     time: { type: Date, default: Date.now },
// });

// const Attendance = mongoose.model("Attendance", attendanceSchema);
// module.exports = Attendance;


const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    time: { type: Date, default: Date.now },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
