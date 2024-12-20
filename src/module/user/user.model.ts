import { model, Schema } from "mongoose";
import IUser from "./user.interface";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Please enter your name."]
    },
    email: {
        type: String,
        required: [true, "Please enter your valid email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please enter a strong password."]
    },
    role: {
        type: String,
        enum: { values: ['user', 'admin'], message: '{VALUE} is not valid, please a valid role' },
        required: true,
        default: 'user'

    },
    isBlocked: {
        type: Boolean,
        default: false,
        required: true
    }
},
    {
        timestamps: true
    }
)
//pre hook use to show isBlocked false user only
userSchema.pre('find', function(this, next){
    this.find({isBlocked: {$eq: 'false'}})
    next()
})

const User = model<IUser>('User', userSchema)
export default User