bm.RegistrationView = Backbone.View.extend({
    el: "#registrationForm",

    events: {
        "submit form": "formSubmitted"
    },

    formSubmitted: function(e){
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        this.model.set(data);
        this.model.save();
        console.log(data);
    },

    render: function () {
        //$(this.el).html(this.template());
    }
});


