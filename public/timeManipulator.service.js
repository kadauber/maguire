"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var TimeManipulatorService = (function () {
    function TimeManipulatorService() {
    }
    Object.defineProperty(TimeManipulatorService.prototype, "standardTimeFormat", {
        get: function () {
            return this._standardTimeFormat;
        },
        set: function (format) {
            this._standardTimeFormat = format;
        },
        enumerable: true,
        configurable: true
    });
    TimeManipulatorService.prototype.timeDifference = function (time1, time2) {
        var response = "invalid";
        var valid = true;
        if (!this.validateMoment(time1)) {
            response = response + ' ->';
            valid = false;
        }
        if (!this.validateMoment(time2)) {
            response = '<- ' + response;
            valid = false;
        }
        if (valid) {
            response = this.parseMoment(time1).diff(this.parseMoment(time2), 'hours', true);
        }
        return response;
    };
    TimeManipulatorService.prototype.parseMoment = function (time) {
        return moment(time, this._standardTimeFormat) || moment(time);
    };
    TimeManipulatorService.prototype.formatTime = function (time) {
        return time.format(this._standardTimeFormat);
    };
    TimeManipulatorService.prototype.validateMoment = function (time) {
        return this.parseMoment(time).isValid();
    };
    return TimeManipulatorService;
}());
exports.TimeManipulatorService = TimeManipulatorService;
//# sourceMappingURL=timeManipulator.service.js.map