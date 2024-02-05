var Client = /** @class */ (function () {
    function Client(theFirst, theLast) {
        this._firstName = theFirst;
        this._lastName = theLast;
    }
    Object.defineProperty(Client.prototype, "firstName", {
        get: function () {
            return this._firstName;
        },
        set: function (value) {
            this._firstName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "lastName", {
        get: function () {
            return this._lastName;
        },
        set: function (value) {
            this._lastName = value;
        },
        enumerable: false,
        configurable: true
    });
    return Client;
}());
var myClient = new Client("Mustafa", "Dilek");
console.log(myClient.firstName);
console.log(myClient.lastName);
