import { adaptDatabaseDateToServiceDate } from '../../../modules/date.js';

const categoryEnum = {
    1: "Lazer",
    2: "Mercado",
    3: "Farmarcia",
    4: "Casa",
    5: "Outros",
}

export class Expense {
    constructor({
        amount, 
        description,
        categoryId,
        date,
    }) {
        this.setAmount(amount);
        this.setDescription(description);
        this.setCategoryId(categoryId);
        this.setDate(date);
    }

    setAmount(amount) {
        if (amount < 0 || amount == undefined) 
            throw new Error("Invalid amount value")

        this.amount = amount;
    }
    setDescription(description) {
        if (description == undefined || description == "" || description.length >= 10 )
            throw new Error("Invalid description value")

        this.description = description;
    }

    setCategoryId(categoryId) {
        const validCategoryIds = [...Object.keys(categoryEnum)]
        if (!validCategoryIds.includes(categoryId.toString()))
            throw new Error("Invalid categoryId value")

        this.categoryId = categoryId;
    }

    setDate(date) {
        const dateData = date.split('-')
        if(dateData.length != 3){
            throw new Error("Invalid date value")
        }
        const [year, month, day] = dateData;
        const parsedDate = Date.parse(year, month, day);
        if (isNaN(parsedDate) || day > 31 || month > 12) {
            throw new Error("Invalid date value") 
        }
        this.date = parsedDate;
    }
    
}

export const buildFromModel = (model) => {
    const values = { ...model.dataValues }
    values.date = adaptDatabaseDateToServiceDate(values.date)
    return new Expense({...values})
} 