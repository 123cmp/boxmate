'use strict';

jQuery.each( [ "put", "delete" ], function( i, method ) {
    jQuery[ method ] = function( url, data, callback, type ) {
        if ( jQuery.isFunction( data ) ) {
            type = type || callback;
            callback = data;
            data = undefined;
        }

        return jQuery.ajax({
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback
        });
    };
});

_.isBlank = function(str) {
    return (/^\s*$/).test(str||'');
};

Backbone.Model.prototype.test = function(value, ruleName, ruleValue) {
    switch (ruleName) {
        case 'required': {
            if(ruleValue.value == "true") return (!(_.isUndefined(value) || _.isBlank(value)));
            return true;
        }
        case 'maxLength': {
            console.log(_.isBlank(value));
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

        default: return true;
    }
};

Backbone.Model.prototype.valid = function(config) {
    config = (typeof config === 'object') ? config : JSON.parse(config);
    var result = {result: true, full: {}};
    var __self = this;
    $.each(config, function(name, rules) {
        result.full[name] = {result: true, rules: {}};
        $.each(rules, function(ruleName, ruleValue) {
            var valid = false;
            if(ruleName == 'equals') valid = __self.get(name) === __self.get(ruleValue.value);
            else valid = __self.test(__self.get(name), ruleName, ruleValue);
            result.full[name].rules[ruleName] = {valid: valid, message: ruleValue.message};
            if(result.full[name].result && !valid) result.full[name].result = false;
            if(result.result && !valid) result.result = false;
        });
    });
    return result;
};


