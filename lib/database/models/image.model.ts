import { model, Schema, Types, Document } from "mongoose";

// Define the IImage interface
export interface IImage extends Document {
    title: string;
    transformationType: string;
    publicId: string;
    secureUrl: string;
    width?: number;   // optional
    height?: number;  // optional
    config?: object;  // optional
    transformationUrl?: URL;  // optional
    aspectRatio?: string;  // optional
    color?: string;  // optional
    prompt?: string;  // optional
    author?: Types.ObjectId;  // ref to User, optional
    createdAt?: Date;  // default value
    updatedAt?: Date;  // default value
}

// Define the image schema
const imageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    transformationType: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    secureUrl: {
        type: String,
        required: true
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    config: {
        type: Object
    },
    transformationUrl: {
        type: String  // Use `String` instead of `URL`
    },
    aspectRatio: {
        type: String
    },
    color: {
        type: String
    },
    prompt: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Check if the model already exists, if not, create a new one
const Image = model<IImage>('Image') || model<IImage>('Image', imageSchema);

export default Image;
