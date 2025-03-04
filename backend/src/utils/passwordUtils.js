import bcrypt from "bcrypt"

const SALT_ROUNDS = 12

export async function hashPassword(password) {
    try {
        return await bcrypt.hash(password, SALT_ROUNDS)
    } catch (error) {
        console.log("Error in hash password", error.message)
        throw new Error("Failed to hash password")
    }
}

export async function checkPassword(password, hashedPassword) {
    try {
        return await bcrypt.compare(password, hashedPassword)
    } catch (error) {
        console.log("Error in comparing password", error.message)
        return false
    }
}