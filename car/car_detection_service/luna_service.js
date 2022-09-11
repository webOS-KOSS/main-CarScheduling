const { MqttClient } = require("mqtt");

var ls2 = undefined;

function init(service){
    ls2 = service;
}

function tts(text){
    let tts_url = "luna://com.webos.service.tts/speak";
    let tts_params = {
        "text": text,
        "language" :"ko-KR",
        "clear":true
    };
    var callback = (m) => {
        console.log("[tts] called : " + text);
    };
    ls2.call(tts_url, tts_params, callback);
}

function toast(msg){
    let toast_url = "luna://com.webos.notification/createToast";
    let toast_params = {
        message: msg,
        persistent:true
    };
    let callback = (m) =>{
        console.log("[Toast] called : "+ msg);
    }
    ls2.call(toast_url, toast_params, callback);
}

function launchApp(app_id){
    let launchApp_url = "luna://com.webos.service.applicationmanager/launch";
    let launchApp_params = {
        id: app_id
    };
    let callback = (m) =>{
        console.log("[launch app] called : "+ app_id);
    }
    ls2.call(launchApp_url, launchApp_params, callback);
}

async function appDownload(app_id, path){
    let appDownload_url = "luna://com.webos.appInstallService/dev/install";
    let appDownload_params = {
        id: app_id,
        ipkUrl: path,
        subscribe: true
    };
    var callback = (m) => {
        console.log("[app install] called : " + app_id);
    };
    ls2.call(appDownload_url, appDownload_params, callback);
}

function appRemove(app_id){
    let appRemove_url = "luna://com.webos.appInstallService/dev/remove";
    let appRemove_params = {
        id: app_id,
        subscribe: true
    };
    var callback = (m) => {
        console.log("[app remove] called : " + app_id);
    };
    ls2.call(appRemove_url, appRemove_params, callback);
}

function cloudlogin(){ // yunminwo1211@kookmin.ac.kr의 클라우드 API
    let cloudLogin_url = "luna://com.webos.service.storageaccess/device/handleExtraCommand";
    let cloudLogin_params = {
        "storageType":"cloud",
        "operation":{
           "type":"login",
           "payload":{
              "clientId":"75267798816-n8kk75u6gmkc1s0idooldhsdao0q4o3r.apps.googleusercontent.com",
              "clientSecret":"O739pRVX0j96eSWgvpfX3y_wu6KV"
           }
        }
    };
    ls2.call(cloudLogin_url, cloudLogin_params, (msg) =>{
        console.log("[cloud login]" + JSON.stringify(msg));
        if (msg.payload.returnValue == "true"){
            url = JSON.stringify(msg.payload[0].payload.response);
            return url
        }
    });
}

function cloudCertification(token){
    let cloudAuth_url = "luna://com.webos.service.storageaccess/device/handleExtraCommand";
    let cloudAuth_params = {   
        storageType: "cloud",
        driveId : "GDRIVE_1",
        operation:{
        type: "authenticate",
        payload:{
            secretToken: token
            }
        }
    };
    ls2.call(cloudAuth_url, cloudAuth_params, (msg) =>{
        console.log("[cloud certification]" + JSON.stringify(msg));
    });
}

function cloudMove(file){
    let cloudMove_url = "luna://com.webos.service.storageaccess/device/move";
    let cloudMove_params = {
        "srcStorageType":"cloud",                                                                         
        "srcDriveId":"GDRIVE_1",                                                                          
        "destStorageType":"internal",                                                                     
        "destDriveId":"INTERNAL_STORAGE",                                                                 
        "srcPath":"/CCTV/" + file,                                                                     
        "destPath":"/home/root/video",
        "subscribe": true
    }
    ls2.call(cloudMove_url, cloudMove_params, (msg) => {
        console.log("[cloud Move]" + JSON.stringify(msg));
    })
}

function cameraOpen(device){
    return new Promise((resolve, reject) => {
        let cameraOpen_url = "luna://com.webos.service.camera2/open";
        let cameraOpen_params = {
            "id":device
        }
        ls2.call(cameraOpen_url, cameraOpen_params, (msg) => {
            if (msg.payload.returnValue) {
                console.log("[camera open] " + JSON.stringify(msg.payload));
                resolve(msg.payload.handle);
            } else {
                console.log("error!");
                reject("[camera open] " + JSON.stringify(msg.payload));
            }
        });
    });
}

function cameraPreviewStart(handle){
    return new Promise((resolve, reject) => {
        let cameraPreviewStart_url = "luna://com.webos.service.camera2/startPreview";
        let cameraPreviewStart_params = {
            "handle":handle,
            "params":{
            "type":"sharedmemory",
            "source":"0"
            }
        }
        ls2.call(cameraPreviewStart_url, cameraPreviewStart_params, (msg) => {
            if (msg.payload.returnValue) {
                console.log("[camera preview] " + JSON.stringify(msg.payload))
                resolve(JSON.stringify(msg.payload.key));
            }
            else {
                console.log("error!")
                reject("[camera preview] " + JSON.stringify(msg.payload))
            }
        })
    });
}

async function cameraReady(device){
    var handle = undefined;
    let open = await cameraOpen(device).then((result) => {handle = result}).catch((error) => {console.log(error)});
    console.log(handle);
    var key = undefined;
    let privew = await cameraPreviewStart(handle).then((result) => {key = result}).catch((error) => {console.log(error)});
    console.log(key);
    return handle;
}

function cameraCapture(handle, path){
    let cameraCapture_url = "luna://com.webos.service.camera2/startCapture";
    let cameraCapture_params = {
        "handle": handle,
        "params":
            {
                "width": 640,
                "height": 480,
                "format": "JPEG",
                "mode":"MODE_ONESHOT"
            },
        "path":path
    }
    ls2.call(cameraCapture_url, cameraCapture_params, (msg) => {
        console.log("[CameraCapture]" + JSON.stringify(msg));
    });
}

exports.init = init;
exports.toast = toast;
exports.tts = tts;
exports.launchApp = launchApp;
exports.appDownload = appDownload;
exports.appRemove = appRemove;
exports.cloudlogin = cloudlogin;
exports.cloudCertification = cloudCertification;
exports.cloudMove = cloudMove;
exports.cameraReady =cameraReady;
exports.cameraCapture = cameraCapture;