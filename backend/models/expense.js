'use strict';
import { Model } from 'sequelize';


export default (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  
  
  Expense.init({
    amount: DataTypes.INTEGER,
    description: DataTypes.STRING,
    categoryId: DataTypes.STRING,
    tags: DataTypes.STRING,
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Expense',
    tableName: 'expenses'
  });
  return Expense;
};