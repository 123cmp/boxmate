var Validator = require("../modules/utils/Validator").Validator,
    assert = require("chai").assert,
    expect = require("chai").expect;

var conditions = {
    "required": {"value": true, "message": "required false"},
    "type": {"value": "string"},
    "maxLength": {"value": 25, "message": "too long"},
    "minLength": {"value": 2, "message": "too short"},
    "no-specSymbols": {"value": "^[A-Za-zА-Яа-я0-9_-]*$", "message": "has specSymbols"},
    "isEmail" :  {"value" : "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$", "message": "not valid email"}
};

describe("Validator", function () {

    describe("Check required validation", function(){
        it("if value == null and required == true", function () {
            expect(Validator(null, null, {"required": {"value": true, "message": "required false"}})).to.deep.equal({status: false, message: "required false"});
        });

        it("if value == undefined and required == true", function () {
            expect(Validator(undefined, null, {"required": {"value": true, "message": "required false"}})).to.deep.equal({status: false, message: "required false"});
        });

        it("if value == 'qwe' and required == true", function () {
            expect(Validator('qwe', null, {"required": {"value": true, "message": "required false"}})).to.deep.equal({status: true});
        });

        it("if value == 'qwe' and required == false", function () {
            expect(Validator('qwe', null, {"required": {"value": false, "message": "required false"}})).to.deep.equal({status: true});
        });

        it("if value == null and required == false", function () {
            expect(Validator(null, null, {"required": {"value": false, "message": "required false"}})).to.deep.equal({status: true});
        });
    });

    describe("Check type validation", function(){
        it("if value type = object, and expected object", function () {
            expect(Validator({qwe: "qwe"}, null, {"type": {"value": "object", "message": "type error"}})).to.deep.equal({status: true});
        });

        it("if value type = string, and expected object", function () {
            expect(Validator( "qwe", null, {"type": {"value": "object", "message": "type error"}})).to.deep.equal({status: false, message: "type error"});
        });
    });

    describe("Check maxLength validation", function(){
        it("if value length = 20, and maxlength = 20", function () {
            expect(Validator("01234567890123456789", null, {"maxLength": {"value": 20, "message": "too long"}})).to.deep.equal({status: true});
        });

        it("if value length = 19, and maxlength = 20", function () {
            expect(Validator("0123456789012345678", null, {"maxLength": {"value": 20, "message": "too long"}})).to.deep.equal({status: true});
        });

        it("if value length = 21, and maxlength = 20", function () {
            expect(Validator("012345678901234567890", null, {"maxLength": {"value": 20, "message": "too long"}})).to.deep.equal({status: false, message: "too long"});
        });
    });

    describe("Check minLength validation", function(){
        it("if value length = 6, and minlength = 6", function () {
            expect(Validator("012345", null, {"minLength": {"value": 6, "message": "too short"}})).to.deep.equal({status: true});
        });

        it("if value length = 10, and minlength = 6", function () {
            expect(Validator("0123456789012345678", null, {"minLength": {"value": 6, "message": "too short"}})).to.deep.equal({status: true});
        });

        it("if value length = 5, and maxlength = 6", function () {
            expect(Validator("01234", null, {"minLength": {"value": 6, "message": "too short"}})).to.deep.equal({status: false, message: "too short"});
        });
    });

    describe("Check noSpecSymbols validation", function(){
        it("if value length = 'qwe', and regExp = '^[A-Za-zА-Яа-я0-9_-]*$'", function () {
            expect(Validator("qwe", null, {"no-specSymbols": {"value": "^[A-Za-zА-Яа-я0-9_-]*$", "message": "has specSymbols"}})).to.deep.equal({status: true});
        });

        it("if value length = 'qwe//', and regExp = '^[A-Za-zА-Яа-я0-9_-]*$'", function () {
            expect(Validator("qwe//", null, {"no-specSymbols": {"value": "^[A-Za-zА-Яа-я0-9_-]*$", "message": "has specSymbols"}})).to.deep.equal({status: false, message: "has specSymbols"});
        });
    });

    describe("Check emailValidation validation", function(){
        it("if value = 'qwe', and regExp = '^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'", function () {
            expect(Validator("qwe", null, {"isEmail" :  {"value" : "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$", "message": "not valid email"}})).to.deep.equal({status: false, message: "not valid email"});
        });

        it("if value = 'qwe@qwe.qw', and regExp = '^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'", function () {
            expect(Validator("qwe@qwe.qw", null, {"isEmail" :  {"value" : "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$", "message": "not valid email"}})).to.deep.equal({status: true});
        });

        it("if value = 'qwe@qwe', and regExp = '^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'", function () {
            expect(Validator("qwe@qwe", null, {"isEmail" :  {"value" : "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$", "message": "not valid email"}})).to.deep.equal({status: false, message: "not valid email"});
        });
    });

    describe("Check equals validation", function(){
        it("if value = 'qwe', second value = 'asd", function () {
            expect(Validator("qwe", "asd", {"equals" : {"value" : "password", "message": "passwords not equal"}})).to.deep.equal({status: false, message: "passwords not equal"});
        });

        it("if value = 'qwe', second value = 'qwe", function () {
            expect(Validator("qwe", "qwe", {"equals" : {"value" : "password", "message": "passwords not equal"}})).to.deep.equal({status: true});
        });

        it("if value = 'qwe', second value = null", function () {
            expect(Validator("qwe", null, {"equals" : {"value" : "password", "message": "passwords not equal"}})).to.deep.equal({status: false, message: "passwords not equal"});
        });
    });
});
