import { Document } from 'mongoose';

export interface User extends Document {
    userName: String,
    readonly password: String,
    userEmail: String,
    isAdmin: Boolean,
    created: Date
}

export class UserLoginDTO {
    email: string;
    password: string;
}

// export interface UserDTO {
//     _id: number,
//     userEmail: string,
//     password: string,
//     role: string
// }