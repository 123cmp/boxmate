/**
 * @module
 * @author 123cmp
 * @abstract
 * @extends Backbone.Model
 * @description Si model with validation methods
 */

define(['abstract/SiModel', 'underscore', 'extensions'], function(SiModel, _) {
    return new function() {

        _.isBlank = function(str) {
            return (/^\s*$/).test(str||'');
        };

        return SiModel.extend({
            test: function (value, ruleName, ruleValue) {
                switch (ruleName) {
                    case 'required': {
                        if (ruleValue.value == "true" || ruleValue.value == true) {
                            return (!(_.isUndefined(value) || _.isBlank(value)));
                        }
                        return true;
                    }
                    case 'maxLength': {
                        if (!(_.isUndefined(value) || _.isBlank(value))) return String(value).length <= parseInt(ruleValue.value);
                        return true
                    }
                    case 'minLength': {
                        if (!(_.isUndefined(value) || _.isBlank(value))) return String(value).length >= parseInt(ruleValue.value);
                        return true
                    }
                    case 'isEmail': {
                        if (!(_.isUndefined(value) || _.isBlank(value)))
                            return /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/.test(value);
                        return true
                    }
                    default:
                        return true;
                }
            },

            validField: function(name, rules) {
                if(!rules) return [];
                var self = this;
                var result = [];
                $.each(rules, function (ruleName, ruleValue) {
                    var valid = false;
                    if (ruleName == 'equals') valid = self.get(name).value === self.get(ruleValue.value).value;
                    else valid = self.test(self.get(name).value, ruleName, ruleValue);
                    if(!valid) result.push({ message: ruleValue.message });
                });
                return result;
            },

            valid: function (config) {
                var self = this;
                config = (typeof config === 'object') ? config : JSON.parse(config);
                var result = {valid: true};
                $.each(config, function (name, rules) {
                    var errors = self.validField(name, rules);
                    if(errors.length > 0) {
                        result[name] = errors;
                        if(result.valid) result.valid = false;
                    }
                });
                return result;
            }
        })
    };
});
