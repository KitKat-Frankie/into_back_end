import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 3,
        maxLength: 10
    },

    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 25,
        select: false // Exclude password from query results by default
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
        
    }

},

{timestamps: true});

// Hash password before saving the user document
// Modern approach - no next() needed

UserSchema.pre("save", async function () {
    // Only hash if password is modified
    if (!this.isModified("password")) return;
    
    // Hash the password
    this.password = await bcrypt.hash(this.password, 10);
});


// Method to compare provided password with the hashed password
UserSchema.methods.comparePassword = async function (password) {

    try {
        return await bcrypt.compare(password, this.password);
        
    } catch (error) {
        throw new Error('Password Comparison failed');
        
    }
    
};

UserSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.userId;
    delete obj.__v;
    return obj;
};

export const User = mongoose.model("User", UserSchema);

