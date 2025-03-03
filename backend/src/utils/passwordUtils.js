import bcrypt from "bcrypt"

export async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 12)
        return hashedPassword
    } catch (error) {
        console.log("Error in hash password", error.message)
        throw error
    }
}

export async function checkPassword(password, hashedPassword) {
    try {
        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)
        return isPasswordCorrect
    } catch (error) {
        console.log("Error in comparing password", error.message)
    }
}
