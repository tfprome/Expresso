import mongoose from "mongoose";

const EmployeeSchema= new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Employeemodel=mongoose.model("employees",EmployeeSchema)
export default Employeemodel;