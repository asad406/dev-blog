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

blogSchema.post('find', function (docs) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    docs.forEach((doc: any) => {
      doc.toJSON = function () {
        return {
          _id: this._id,
          title: this.title,
          content: this.content,
          author: this.author
        };
      };
    });
  });
  
 

const Blog = model<IBlog>('Blog', blogSchema)
export default Blog