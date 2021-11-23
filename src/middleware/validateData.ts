export const errorFormat = (e) => {
    let errors = {}
    try {
        const allErrors = e.message.substring(e.message.indexOf(':') + 1).trim();
        const allErrorsInArrayFormat = allErrors.split(',').map(err => err.trim())
        allErrorsInArrayFormat.forEach(error => {
            const [key, value] = error.split(':').map(err => err.trim())
            errors[key] = value
        })
        return errors
    }
    catch
    {
        errors[e.path] = e.message;
        return errors
    }
}