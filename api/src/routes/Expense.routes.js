const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/Expense.controller');
const { expenseupload } = require("../middlewares/multer.middleware");
// Route to create a new expense
router.post('/create',expenseupload.single('expensephoto'), expenseController.createExpense);

// Route to get all expenses
router.get('/getall', expenseController.getallExpense);

// Route to get expenses by user ID
router.get('/byuserid/:id', expenseController.getExpenseByuserid);

// Route to update an expense
router.put('/update/:id',expenseupload.single('expensephoto'), expenseController.updateExpense);

module.exports = router;