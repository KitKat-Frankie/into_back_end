import mongoose, {Schema} from "mongoose";


const PostSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
            },

    description: {
        type: String,
        required: true,
        trim: true,
        select: true
    },

    age: {
        type: Number,
        required: true,
        min:1,
        max:150
    }
 
   }

, {timestamps: true,
    versionKey: false});


   // Hide sensitive fields from JSON output
PostSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.__v;
  return obj;
};

   
   export const Post = mongoose.model("Post", PostSchema);
   
