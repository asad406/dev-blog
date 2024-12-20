import { model, Schema } from "mongoose";
import IBlog from "./blog.interface";

const blogSchema = new Schema<IBlog>({
    title: {
        type: String,
        required: [true, "Please enter a title."]
    },
    content: {
        type: String,
        required: [true, "Please enter your Blog"],      
    },
    author: {
        type: Schema.Types.ObjectId,
        required: [true, "please enter an author."],
        ref: 'User'
    },  
    isPublished: {
        type: Boolean,
        default: true,
        required: true
    }
},
    {
        timestamps: true
    }
)

blogSchema.pre('find', function(this, next){
    this.find({isPublished: {$eq: 'true'}})
    next()
})

const Blog = model<IBlog>('Blog', blogSchema)
export default Blog