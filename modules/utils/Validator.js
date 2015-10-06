var res;

module.exports.Validator = function Validator (value, repeatValue, conditions) {
    for (condition in conditions) {
        if (condition == "required") {
            if (!value && conditions[condition].value) return {status: false, message: conditions[condition].message};
            if (!value && !conditions[condition].value) return {status: true};
        }


        if (condition == "type") {
            if (typeof value != conditions[condition].value) return {
                status: false,
                message: conditions[condition].message
            }
        }

        if (condition == "maxLength") {
            if (value.length > conditions[condition].value) return {
                status: false,
                message: conditions[condition].message
            }
        }

        if (condition == "minLength") {
            if (value.length < conditions[condition].value) return {
                status: false,
                message: conditions[condition].message
            }
        }

        if (condition == "no-specSymbols") {
            var regEx = new RegExp(conditions[condition].value);
            if (!regEx.test(value)) return {status: false, message: conditions[condition].message}
        }

        if (condition == "isEmail") {
            var regEx = new RegExp(conditions[condition].value);
            if (!regEx.test(value)) return {status: false, message: conditions[condition].message}
        }

        if (condition == "equals") {
            if(value != repeatValue){
                return {status: false, message: conditions[condition].message}
            }
        }
    }
    return {status: true}
};