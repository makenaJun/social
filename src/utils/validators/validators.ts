type ValidatorsType = (value: string) => string | undefined

export const testForEmptiness = (params: string): ValidatorsType => {
    return (value) => {
        if (value) return undefined;

        switch (params) {

            case "required":
                return 'Field is required'

            case 'fieldEmpty':
                return 'Field cannot be empty'

            default:
                return 'Something went wrong';
        }
    }
}

export const minLengthCreator = (minLength: number): ValidatorsType => {
    return (value) => {
        if (!value || value.length < minLength) return `Min length is ${minLength} symbols`;
        return undefined;
    };
};

export const maxLengthCreator = (maxLength: number): ValidatorsType => {
    return (value) => {
        if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
        return undefined;
    };
};