App.FileDropView = Ember.View.extend({
    drop: function(evt) {
        var target = $(evt.target);
        evt.preventDefault();
        target.removeClass('hover');
        target.addClass('drop');
        this.get('controller').send('uploadFiles', evt.dataTransfer.files);
        return false;
    },

    dragOver : function(evt) {
        $(evt.target).addClass('hover');
        return false;
    },

    dragLeave : function(evt) {
        $(evt.target).removeClass('hover');
        return false;
    }
});