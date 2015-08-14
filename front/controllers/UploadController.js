App.UploadController = Ember.ArrayController.extend({
    actions: {
        uploadFiles: function(files) {
            var formData = new FormData();
            for(var i = 0; i< files.length; i++) {
                var file = files[i];
                formData.append(file.name, file);
            }
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', function() {
            }, false);
            xhr.onreadystatechange = function(event) {
            };
            xhr.onload = function(){
                if(xhr.responseText) {
                    var newFile = JSON.parse(xhr.responseText);
                    newFile.moqup = 0;
                    var fileRecord = this.store.createRecord('file', newFile);
                    fileRecord.save();
                }

            };
            xhr.open('POST', '/upload', true);
            xhr.send(formData);
        }
    }
});