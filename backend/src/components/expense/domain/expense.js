export class Expense {
    constructor({
        amount, 
        description,
        categoryId,
        tags,
        date,
    }) {
        this.amount = amount;
        this.description = description;
        this.categoryId = categoryId;
        this.tags = tags;
        this.date = date;
    }

    
}

export const buildFromModel = (model) => {
    return new Expense({...model.dataValues})
} 