define(function(require, exports, module) {
    let mod2 = require('mod2.js');
    let mod3 = require("mod3.js");

    exports.result = mod2.num1 + mod3.num2;
})