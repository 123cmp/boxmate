var Validate = require("../modules/controllers/utils").validate,
    chai = require("chai"),
    assert = chai.assert,
    expect = chai.expect,
    fs = require("fs"),
    sinon = require("sinon");

var body = {
    email: "qwe@qwe.qwe",
    password: "qweasd",
    repeat: "qweasd",
    name: "maxim"
};
describe("Validation", function () {
    describe("Validation when reedFile error", function () {

        var readFile;
        before(function(){
            readFile = sinon.stub(fs, "readFile").yields("error", "");
        });

        it("when read file error", function () {
            return Validate(body, "qqq").then(function(data){
                expect(data, "Validate return true").have.been.false;
                expect(readFile.called, "readFile not called").have.been.true;
                expect(readFile.args[0][0], "Path to file not correct").equal("/home/maxim/Projects/boxmate/qqq.validate.json")
            });
        });

        after(function(){
            fs.readFile.restore();
        });
    });

    describe("Check validate when bad response from reedFile", function () {

        var readFile;
        before(function(){
            readFile = sinon.stub(fs, "readFile").yields("", 'qqq');
        });


        it("when read file error", function () {
            return Validate(body, "qqq").then(function(data){
                expect(data, "Validate return true").false;
                expect(readFile.called, "readFile not called").true;
                expect(readFile.args[0][0], "Path to file not correct").equal("/home/maxim/Projects/boxmate/qqq.validate.json")
            });
        });

        after(function(){
            fs.readFile.restore();
        });
    });

    describe("Check validate when false from Validator", function () {

        var readFile, validator,
            Validator = require("../modules/utils/Validator");
        before(function(){
            readFile = sinon.stub(fs, "readFile").yields("", '{"email": {}}');
            validator = sinon.stub(Validator, "Validator").returns({status: false})
        });


        it("when read file error", function () {
            return Validate(body, "qqq").then(function(data){
                expect(readFile.called, "readFile not called").true;
                expect(validator.called, "Validator not called").true;
                expect(data, "Validate return true").false;
                expect(readFile.args[0][0], "Path to file not correct").equal("/home/maxim/Projects/boxmate/qqq.validate.json")
            });
        });

        after(function(){
            fs.readFile.restore();
            Validator.Validator.restore();
        });
    });

    describe("Check validate when true from Validator", function () {

        var readFile, validator,
            Validator = require("../modules/utils/Validator");
        before(function(){
            readFile = sinon.stub(fs, "readFile").yields("", '{"email": {}}');
            validator = sinon.stub(Validator, "Validator").returns({status: true})
        });


        it("when read file error", function () {
            return Validate(body, "qqq").then(function(data){
                expect(readFile.called, "readFile not called").true;
                expect(validator.called, "Validator not called").true;
                expect(data, "Validate return true").true;
                expect(readFile.args[0][0], "Path to file not correct").equal("/home/maxim/Projects/boxmate/qqq.validate.json")
            });
        });

        after(function(){
            fs.readFile.restore();
            Validator.Validator.restore();
        });
    });
});
