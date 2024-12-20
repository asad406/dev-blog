import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>
    public query: Record<string, unknown>

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.modelQuery = modelQuery,
            this.query = query
    }
    search(searchableFields: string[]) {
        const search = this?.query?.search
        if (this?.query?.search) {
            //searching
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: search, $options: 'i' } //i for case insensitive 
                }))
            } as FilterQuery<T>)
        }
        return this
    }

    filter() {
        const queryObj = { ... this?.query }
        const excludeFields = ['search', 'sortBy', 'sortOrder']
        excludeFields.forEach((el) => delete queryObj[el]);

        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

        return this
    }
    sort() {
        let sortStr
        if (this?.query?.sortBy && this?.query?.sortOrder) {
            const sortBy = this?.query?.sortBy
            const sortOrder = this?.query?.sortOrder          
            sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`
        }

        this.modelQuery = this.modelQuery.sort(sortStr)
        return this        
    }   
}

export default QueryBuilder;


///api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&author=60b8f42f9c2a3c9b7cbd4f18