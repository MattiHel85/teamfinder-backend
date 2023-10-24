export interface User {
    id: string,
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    profilePicUrl?: string;
    isAdmin?: boolean;
}

export interface JwtPayload {
    id: string;
}