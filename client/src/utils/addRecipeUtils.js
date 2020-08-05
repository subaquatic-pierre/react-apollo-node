// ensure all fields filled in to enable button
export const validateForm = (setError, state) => {
    const { name, description, instructions, category } = state
    if (name && description && instructions && category) {
        return true
    } else {
        setError(true)
        return false
    }
}