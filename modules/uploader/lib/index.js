var multer = require('multer');
exports = function(dest, rename, onFileUploadStart, onFileUploadComplete, onFileUploadData){

    return multer({
        dest: dest,
        rename: rename,
        onFileUploadStart: onFileUploadStart,
        onFileUploadComplete: onFileUploadComplete,
        onFileUploadData: onFileUploadData
    });
};
