bm.SpinnerView = Backbone.View.extend({
    el: $("body"),
    spinning: false,


    template: "<div class='spinner-wrapper'><div class='loader'>Loading...</div></div>",
    initialize: function () {
        var __self = this;
        __self.render();
        __self.model.bind("change:spin", function () {
            __self.render();
        });
    },

    render: function() {
        var __self = this;
        if(__self.model.get("spin") && !__self.spinning) __self.startSpinning();
        else if(!__self.model.get("spin") && __self.spinning) __self.stopSpinning();
    },

    startSpinning: function() {
        this.spinning = true;
        $(this.el).append(this.template);
    },
    stopSpinning: function() {
        this.spinning = false;
       $(this.el).find('.spinner-wrapper').remove();
    }
});


