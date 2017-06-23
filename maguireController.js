(function (angular) {
'use strict';

angular.module('maguireApp').controller('MaguireController', MaguireController);

function MaguireController($scope, TimeManipulator) {
    $scope.maxHours = 50;
    $scope.days = {};
    $scope.accumulatedHours = accumulatedHours;
    $scope.hoursRemaining = hoursRemaining;
    $scope.validateMoment = validateMoment;

    TimeManipulator.setStandardTimeFormat("YYYY-MM-DD hh:mma");

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
        return TimeManipulator.validateMoment(time);
    }

    //////// Initialization (this should probably be config or something)

    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    _.each(dayNames, function(dayName, dayIndex) {
        $scope.days[dayName] = {
            "arrive": TimeManipulator.formatTime(moment().startOf('week').add(dayIndex, 'days').add(8, 'hours')),
            "lunchStart": TimeManipulator.formatTime(moment().startOf('week').add(dayIndex, 'days').add(12, 'hours')),
            "lunchEnd": TimeManipulator.formatTime(moment().startOf('week').add(dayIndex, 'days').add(13, 'hours')),
            "leave": TimeManipulator.formatTime(moment().startOf('week').add(dayIndex, 'days').add(19, 'hours')),

            "morning": function() {
                return TimeManipulator.timeDifference(this.lunchStart, this.arrive)
            },
            "lunch": function() {
                return TimeManipulator.timeDifference(this.lunchEnd, this.lunchStart)
            },
            "afternoon": function() {
                return TimeManipulator.timeDifference(this.leave, this.lunchEnd)
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

    $scope.days.Sunday.arrive = TimeManipulator.formatTime(moment().startOf('week').add(8, 'hours'));
    $scope.days.Sunday.lunchStart = TimeManipulator.formatTime(moment().startOf('week').add(8, 'hours'));
    $scope.days.Sunday.lunchEnd = TimeManipulator.formatTime(moment().startOf('week').add(8, 'hours'));
    $scope.days.Sunday.leave = TimeManipulator.formatTime(moment().startOf('week').add(8, 'hours'));
}

})(window.angular);