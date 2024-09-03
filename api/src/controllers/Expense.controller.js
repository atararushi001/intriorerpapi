

const  Expense = require("../models/Expense.module");
const Project = require("../models/project.model");
const User = require("../models/user.model");



const createExpense = async (req, res) => {
    const { amount, reason, type, project, createdBy } = req.body;

    if (!amount || !reason || !type) {
        return res.status(400).json({ message: "Amount, reason and type are required" });
    }

    const billphoto = req.file?.path
    ? req.file.path.replace(/\\/g, "/").split("public")[1]
    : "";

    try {
        const createdExpense = await Expense.create({
            amount,
            reason,
            billphoto,
            type,
            project,
            createdBy,
        });

        res.status(200).json(createdExpense);
    } catch (error) {
        res.status(500).json({ message: "Error creating expense", error });
    }

}
const getallExpense= async(req,res)=>{
    
    try{
        const expenses = await Expense.findAll(
            {
                include: [
                    { model: User, as: "createdByid" },
                    { model: Project, as: "projectid" },
                ],
            }
        );
        res.status(200).json(expenses);
    }
    catch(error){
        res.status(500).json({message:"Error getting all expenses",error});
    }
}
const getExpenseByuserid = async (req, res) => {    
    try{
        const expenses = await Expense.findAll(
            {
                where: {
                    createdBy: req.params.id,
                },
                include: [
                    { model: User, as: "createdByid" },
                    { model: Project, as: "projectid" },
                ],
            }
        );
        res.status(200).json(expenses); 
    }
    catch(error){
        res.status(500).json({message:"Error getting all expenses",error});
    }
}

const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { amount, reason, type, project, createdBy } = req.body;

    if (!amount || !reason || !type) {
        return res.status(400).json({ message: "Amount, reason and type are required" });
    }

    const billphoto = req.file?.path
        ? req.file.path.replace(/\\/g, "/").split("public")[1]
        : "";

    try {
        const expense = await Expense.findByPk(id);

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        expense.amount = amount;
        expense.reason = reason;
        expense.billphoto = billphoto;
        expense.type = type;
        expense.project = project;
        expense.createdBy = createdBy;

        await expense.save();

        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: "Error updating expense", error });
    }
};

module.exports = {
    createExpense,
    getallExpense,
    getExpenseByuserid,
    updateExpense,
}
