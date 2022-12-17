export class Expense {
    constructor({
        amount, 
        description,
        category,
        tags,
        date,
    }) {
        this.amount = amount;
        this.description = description;
        this.category = category;
        this.tags = tags;
        this.date = date;
    }

    
}

export const buildFromModel = (model) => {
    return new Expense({...model})
} 