import {module} from 'angular';
import {TimeManipulatorService} from './timeManipulator.service';

export let maguireApp = module('maguireApp', ['TimeManipulatorService'])
    .config(['TimeManipulatorService', (TimeManipulatorService: TimeManipulatorService) => {
        this.TimeManipulatorService.standardTimeFormat("YYYY-MM-DD hh:mma");
    }]);
