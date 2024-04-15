import {compare,hash} from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
}

export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await compare(plainPassword, hashedPassword);
}

