// eslint-disable-next-line import/no-unresolved
const pkgInfo = require('./package.json');
const Service = require('webos-service');
const luna = require("./luna_service");
const mongo = require("./mongodb_lib");
const service = new Service(pkgInfo.name); // Create service by service name on package.json
const mongoIP = "mongodb://3.34.50.139:27017/DB"

// connect => schema => show => send to Enact => close
service.register("mainInit", async function(message) {
    var Car = undefined;
    var cars = undefined;
    let connect = await mongo.connectDB(mongoIP).then((result) => {console.log(result)}).catch((error) => {console.log(error)})
    let schema = await mongo.carSchema("cars").then((result) => {Car = result})
    let show = await mongo.showCarData(Car).then((result) => {cars = result})
    message.respond(cars);
    mongo.closeDB()
});

// connect => schema => put => close
service.register("registerCar", async function(message) {
    luna.init(service);
    var Car = undefined;
    let connect = await mongo.connectDB(mongoIP).then((result) => {console.log(result)}).catch((error) => {console.log(error)})
    let schema = await mongo.carSchema("cars").then((result) => {Car = result})
    let register = await mongo.createRegisterCar(Car, message.put.carNumber, message.put.startAt, message.put.endAt).then((result) => {console.log(result)}).catch((error) => console.log(error))
    luna.tts(message.put.carNumber + " 차량이 임시등록 되었습니다");
    luna.toast(message.put.carNumber + " 차량이 임시등록 되었습니다");
    message.respond("register success");
    mongo.closeDB()
})

// connect => schema => delete => show => close
service.register("deleteCarData", async function(message) {
    var Car = undefined;
    let connect = await mongo.connectDB(mongoIP).then((result) => {console.log(result)}).catch((error) => {console.log(error)})
    let schema = await mongo.carSchema("cars").then((result) => {Car = result})
    let delte = await mongo.deleteCarData(Car, message.carNumber).then((result) => {console.log(result)}).catch((error) => {console.log(error)})
    let show = await mongo.showCarData(Car).then((result) => {cars = result})
    message.respond(message.carNumber + " : delete success");
    mongo.closeDB()
})