/**
 * This module defines the db schema Todo
 * 
 */

// Use mongoose as mongodb client
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * A Todo item the following attributes:
 * _id: auto-generated unique key.
 * text: string, the text describing what to do.
 * completed: boolean, whether completed or not.
 * swr_flag: boolean, whether stopwords are removed.
 * create_time: date-time, time of item creation.
 * last_modified: date-time, time of last modification of this item.
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