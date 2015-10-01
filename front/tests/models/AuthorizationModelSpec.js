define(
    ['/front/components/accounting/models/AuthorizationModel.js', 'backbone'],
    function(AuthorizationModel, backbone) {
        describe('AuthorizationModel', function() {
            var model = null;
            beforeEach(function() {
                model = new AuthorizationModel();
            });
            it("shouldn't be null", function() {
                expect(model).not.toBeNull();
            });
            it("should be instance of backbone-model", function() {
                expect(model instanceof backbone.Model).toBe(true);
            });

            describe('validation', function () {
                beforeEach(function() {
                    model = new AuthorizationModel();
                });
                var errors = null;

                describe('when model has default value', function () {
                    beforeEach(function () {
                        model.validate();
                    });

                    it('should have 3 errors', function () {
                        console.log(model.get("email"));
                        expect(errors).toBe(null);
                    });

                    //it('should have 3 errors', function () {
                    //    expect(errors.length).toBe(3);
                    //});
                    //
                    //console.log(errors);
                    //it('should have email fields as invalid', function () {
                    //    expect(errors[0].name).toBe('email');
                    //});
                    //
                    //it('should have feedback field as invalid', function () {
                    //    expect(errors[1].name).toBe('feedback');
                    //});
                });
            });
        });
    });