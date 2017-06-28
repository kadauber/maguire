"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var angular_1 = require("angular");
exports.maguireApp = angular_1.module('maguireApp', ['TimeManipulatorService'])
    .config(['TimeManipulatorService', function (TimeManipulatorService) {
        _this.TimeManipulatorService.standardTimeFormat("YYYY-MM-DD hh:mma");
    }]);
//# sourceMappingURL=index.js.map