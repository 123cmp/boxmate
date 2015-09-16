var Validate = require("../modules/api/utils").validate,
    chai = require("chai"),
    assert = chai.assert,
    expect = chai.expect,
    validator = require("../modules/utils/Validator"),
    simple = require("simple-mock"),
    should = require("chai").should,
    Q = require("q"),
    chaiAsPromised = require("chai-as-promised"),
    fs = require("fs");

//chai.use(chaiAsPromised);

var body = {
    email: "qwe@qwe.qwe",
    password: "qweasd",
    repeat: "qweasd",
    name: "maxim"
};
//TODO tests not working
describe("Validation", function () {
    describe("Check validate file read when no file", function () {

        var readFile;
        before(function(){
            readFile = simple.mock(fs, "readFile");
        });

        after(function(){
            simple.restore();
        });
        it("when read file error", function (done) {
            Validate(body, "qqq").then(function(result){
                console.log(result);
                console.log(readFile.called, "called");
                readFile.called.should.equal(false);
                done();
            });
        });
    });

    //describe("Check validate file read when file no content json", function () {
    //
    //    var readFile;
    //    before(function(){
    //        fs.writeFile("/home/maxim/Projects/boxmate/test.validate.json");
    //        readFile = simple.mock(fs, "readFile");
    //    });
    //
    //    after(function(){
    //        simple.restore();
    //        fs.unlink("/home/maxim/Projects/boxmate/test.validate.json")
    //    });
    //    it("", function () {
    //        Validate(body, "test").then(function(result){
    //            result.should.equal(true);
    //            readFile.called.should.equal(true);
    //        });
    //    });
    //});

});
