import { Expense } from '../../../../models/expense.js'
import { buildFromModel } from '../domain/expense.js'

export class ExpenseRepository {
    constructor() {
    }

    async create({ amount,description,category,tags,date }) {
        const modelData = await Expense.create({ amount,description,category,tags,date })
        return buildFromModel(expense);
    }

    async getByUser(userId) {
        const models = Expense.findAll({
            where: {
                userId: userId,
            },
        });

        return models.map(m => buildFromModel(m));
    }

    async getByMonthAndYear({userId, month, year}) {
        const models = Expense.findAll({
            where: {
                userId: userId,
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date')), month),
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), year),
                ],
            },
        });

        return models.map(m => buildFromModel(m));
    }
} 