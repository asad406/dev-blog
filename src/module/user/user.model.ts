import { model, Schema } from 'mongoose';
import IUser from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name.'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your valid email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please enter a strong password.'],
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not valid, please a valid role',
      },
      required: true,
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
//pre hook use to show isBlocked false user only
userSchema.pre('find', function (this, next) {
  this.find({ isBlocked: { $eq: 'false' } });
  next();
});

//for password hashing
userSchema.pre('save', async function (this, next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.post('find', function (docs, next) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  docs.forEach((doc: any) => {
    doc.toJSON = function () {
      return {
        _id: this._id,
        name: this.name,
        email: this.email,
      };
    };
  });
  next();
});

const User = model<IUser>('User', userSchema);
export default User;
