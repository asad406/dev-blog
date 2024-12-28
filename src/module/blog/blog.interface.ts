import { Types } from 'mongoose';

interface IBlog {
  _id?: string;
  title: string;
  content: string;
  author?: Types.ObjectId;
  isPublished: boolean;
}

export default IBlog;
