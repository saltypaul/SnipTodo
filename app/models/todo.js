import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/*
_id: auto-generated

completed: boolean; whether completed or not.

text: string; text describing what to do.

swr_flag: boolean; whether removed stopwords.

create_time: date-time; time of item creation.

last_modified: date-time; time of last modification of this item.
*/
const TodoSchema = new Schema(
  {
    text: String,
    completed: { type: Boolean, default: false},
    swr_flag: { type: Boolean, default: false},
    create_time: { type: Date, default: Date.now },
    last_modified: { type: Date, default: Date.now }
  }
);

export default mongoose.model('Todo', TodoSchema);