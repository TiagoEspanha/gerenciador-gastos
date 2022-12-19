export const adaptDatabaseDateToServiceDate = (dbDate) => {
    return `${dbDate.getDate()}-${dbDate.getMonth() + 1 }-${dbDate.getFullYear()}`
}