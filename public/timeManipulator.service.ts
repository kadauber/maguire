import {maguireApp} from './index';
import * as moment from 'moment';

export class TimeManipulatorService {
    private _standardTimeFormat: string;

    public get standardTimeFormat() {
        return this._standardTimeFormat;
    }

    public set standardTimeFormat(format: string) {
        this._standardTimeFormat = format;
    }

    public timeDifference(time1: string, time2: string): string|number {
        let response: string|number = "invalid";
        let valid: boolean = true;

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
    }

    private parseMoment(time: string): moment.Moment {
        return moment(time, this._standardTimeFormat) || moment(time);
    }

    private formatTime(time: moment.Moment): string {
        return time.format(this._standardTimeFormat);
    }

    private validateMoment(time: string): boolean {
        return this.parseMoment(time).isValid();
    }
}
