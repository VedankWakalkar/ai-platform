import { Schema, model, Document} from "mongoose";

// Define the IUser interface
export interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    planId?: number;          // Optional since it has a default value
    clerkId: string;
    photo?: string;           // Optional
    creditBalance?: number;    // Optional since it has a default value
}

// Define the user schema
const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    planId: {
        type: Number,
        default: 1
    },
    clerkId: {
        type: String,  // Clerk ID should be a string
        required: true,
        unique: true
    },
    photo: {
        type: String  // Assuming this is a URL or path to the image
    },
    creditBalance: {
        type: Number,
        default: 10
    }
});

// Create the User model
const User = model<IUser>('User', userSchema);

export default User;
