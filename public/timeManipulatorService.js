(function (angular) {
'use strict';

angular.module('TimeManipulatorService', []).service('TimeManipulator', TimeManipulator);

function TimeManipulator () {
    var standardTimeFormat;
    this.setStandardTimeFormat = setStandardTimeFormat;
    this.getStandardTimeFormat = getStandardTimeFormat;
    this.timeDifference = timeDifference;
    this.formatTime = formatTime;
    this.parseMoment = parseMoment;
    this.validateMoment = validateMoment;

    function setStandardTimeFormat (format) {
        standardTimeFormat = format;
    }

    function getStandardTimeFormat () { 
        return standardTimeFormat;
    }

    function timeDifference (time1, time2) {
        var response = "invalid";
        var valid = true;

        if (!validateMoment(time1)) {
            response = response + " ->";
            valid = false;
        }

        if (!validateMoment(time2)) {
            response = "<- " + response;
            valid = false;
        }

        if (valid) {
            response = parseMoment(time1).diff(parseMoment(time2), 'hours', true);
        }

        return response;
    }

    function formatTime(time) {
        return time.format(standardTimeFormat);
    }

    function parseMoment(time) {
        return moment(time, standardTimeFormat) || moment(time);
    }

    function validateMoment(time) {
        return parseMoment(time).isValid();
    }
}

})(window.angular);