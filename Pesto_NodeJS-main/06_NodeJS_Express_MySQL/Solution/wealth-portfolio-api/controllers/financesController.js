const db = require("../models");
const Finances = db.Finances;

exports.getFinances = async (req, res) => {
    const { year, month } = req.query;
    const userId = req.userId; // Retrieved from the token after verification

    let whereClause = {
        user_id: userId // Ensure that only the finances related to the logged-in user are fetched
    };

    if (year) {
        whereClause.date = db.Sequelize.where(db.Sequelize.fn('YEAR', db.Sequelize.col('date')), '=', year);
    }
    if (month) {
        whereClause.date = db.Sequelize.where(db.Sequelize.fn('MONTH', db.Sequelize.col('date')), '=', month);
    }

    try {
        const income = await db.Finances.sum('amount', {
            where: { ...whereClause, type: 'Income' }
        });
        const expenses = await db.Finances.sum('amount', {
            where: { ...whereClause, type: 'Expense' }
        });
        const savings = income - expenses;

        res.status(200).json({
            year,
            month,
            income,
            expenses,
            savings
        });
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving financial data: " + error.message
        });
    }
};

exports.createFinanceRecord = async (req, res) => {
    const userId = req.userId; // Retrieved from the token after verification
    const { type, amount, date } = req.body;

    // Ensure all required fields are provided
    if (!type || amount === undefined || !date) {
        return res.status(400).send({
            message: "All fields (type, amount, date) are required."
        });
    }

    try {
        const newFinanceRecord = await db.Finances.create({
            user_id: userId,
            type: type,
            amount: amount,
            date: date
        });

        res.status(201).json(newFinanceRecord);
    } catch (error) {
        res.status(500).send({
            message: "Error creating new financial record: " + error.message
        });
    }
};




exports.getDetailedBreakdown = async (req, res) => {
    const { year, month } = req.query;
    const userId = req.userId; // Retrieved from the token after verification

    let whereClause = {
        user_id: userId // Ensure that only the finances related to the logged-in user are fetched
    };

    if (year) {
        whereClause.date = db.Sequelize.where(db.Sequelize.fn('YEAR', db.Sequelize.col('date')), '=', year);
    }
    if (month) {
        whereClause.date = db.Sequelize.where(db.Sequelize.fn('MONTH', db.Sequelize.col('date')), '=', month);
    }

    try {
        const incomeDetails = await db.Finances.findAll({
            where: { ...whereClause, type: 'Income' }
        });
        const expenseDetails = await db.Finances.findAll({
            where: { ...whereClause, type: 'Expense' }
        });

        res.status(200).json({
            year,
            month,
            incomeDetails,
            expenseDetails
        });
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving detailed financial breakdown: " + error.message
        });
    }
};


