

export type User = {
    id: number,
    username: string,
    hashedPassword: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
}

export type UserWithoutPassword = {
    id: number,
    username: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
}
