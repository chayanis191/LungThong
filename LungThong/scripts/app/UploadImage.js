function getImage() {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(uploadPhoto, function(message) {
alert('get picture failed');
},{
quality: 50,
destinationType: navigator.camera.DestinationType.FILE_URI,
sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
});}
    function uploadPhoto(imageURI) {
        var el = new Everlive('8V8ecMpYsIMnoghp');
        var uploadUrl = el.Files.getUploadUrl();
        var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";

        var params = new Object();
        params.value1 = "test";
        params.value2 = "param";

        options.params = params;
        options.chunkedMode = false;

        var ft = new FileTransfer();
        ft.upload(imageURI, uploadUrl, win, fail, options);
    }

    function win(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        alert(r.response);
    }

    function fail(error) {
        alert("An error has occurred: Code = " = error.code);
    }
