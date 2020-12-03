
export interface Message {
    code: Number;
    message: String;
    errors?: String[]
}

export function getError(error: any) {
    let errors = []
    if (error.name == "ClientCreationError") {
        return error.err
    }
    if (error.name == 'ValidationError') {
        for (let field in error.errors) {
            errors.push(error.errors[field].message);
        }
    }
    return errors
}