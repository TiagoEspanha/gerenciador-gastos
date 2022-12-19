
import { buildFromModel } from '../domain/expense.js'

const defaultUserId = 1
export class ExpenseRepository {
    constructor({expenseModel}) {
        this.model =  expenseModel;
    }

    async create({ amount, description, categoryId, date }) {
        const modelData = await this.model.create({ amount, description, categoryId, date, userId: defaultUserId })
        return buildFromModel(modelData);
    }

    async getByUser(userId) {
        const models = await this.model.findAll({
            where: {
                userId: userId,
            },
        });

        return models.map(m => buildFromModel(m));
    }

    async getByMonthAndYear({userId, month, year}) {
        const models = this.model.findAll({
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