(function (angular) {
'use strict';

angular.module('maguireApp').controller('MaguireController', MaguireController);

function MaguireController($scope) {
    $scope.maxHours = 50;
    $scope.days = {};
    $scope.accumulatedHours = accumulatedHours;
    $scope.hoursRemaining = hoursRemaining;
    $scope.validateMoment = validateMoment;

    function accumulatedHours() {
        return _.reduce($scope.days, function(memo, day) {
            return memo + day.total();
        }, 0);
    }

    function hoursRemaining() {
        var remaining = $scope.maxHours - $scope.accumulatedHours();
        return remaining === 0 ? 0 : remaining || "cannot calculate";
    }

    function validateMoment(time) {
        return parseMoment(time).isValid();
    }

    //////// Helpers (this should probably be a service)

    var standardTimeFormat = "YYYY-MM-DD hh:mma";

    function timeDifference(time1, time2) {
        var response = " invalid ";

        if (!$scope.validateMoment(time1)) {
            response.splice(0, 0, "<-");
        } else {
            if (!$scope.validateMoment(time2)) {
                response = response + "->";
            } else {
                response = parseMoment(time1).diff(parseMoment(time2), 'hours', true);
            }
        }

        return response;
    }

    function formatTime(time) {
        return time.format(standardTimeFormat);
    }

    function parseMoment(time) {
        return moment(time, standardTimeFormat) || moment(time);
    }

    //////// Initialization (this should probably be config or something)

    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    _.each(dayNames, function(dayName, dayIndex) {
        $scope.days[dayName] = {
            "arrive": formatTime(moment().startOf('week').add(dayIndex, 'days').add(8, 'hours')),
            "lunchStart": formatTime(moment().startOf('week').add(dayIndex, 'days').add(12, 'hours')),
            "lunchEnd": formatTime(moment().startOf('week').add(dayIndex, 'days').add(13, 'hours')),
            "leave": formatTime(moment().startOf('week').add(dayIndex, 'days').add(19, 'hours')),

            "morning": function() {
                return timeDifference(this.lunchStart, this.arrive)
            },
            "lunch": function() {
                return timeDifference(this.lunchEnd, this.lunchStart)
            },
            "afternoon": function() {
                return timeDifference(this.leave, this.lunchEnd)
            },

            "total": function() {
                return this.morning() + this.afternoon();
            },
            "regular": function() {
                return Math.min(this.total(), 8)
            },
            "overtime": function() {
                return this.total() - this.regular();
            }
        }
    });

    $scope.days.Sunday.arrive = formatTime(moment().startOf('week').add(8, 'hours'));
    $scope.days.Sunday.lunchStart = formatTime(moment().startOf('week').add(8, 'hours'));
    $scope.days.Sunday.lunchEnd = formatTime(moment().startOf('week').add(8, 'hours'));
    $scope.days.Sunday.leave = formatTime(moment().startOf('week').add(8, 'hours'));
}

})(window.angular);