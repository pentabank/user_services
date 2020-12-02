
export interface Message {
    code: Number;
    message: String;
    errors?: String[]
}

export function getError(err: any) {
    let errors = []
    if (err.name == 'ValidationError') {
        for (let field in err.errors) {
            errors.push(err.errors[field].message);
        }
    }
    return errors
}