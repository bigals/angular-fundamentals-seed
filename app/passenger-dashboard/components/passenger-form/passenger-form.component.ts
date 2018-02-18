import { Component, OnInit, Input } from '@angular/core';

import { Passenger } from '../../models/passenger.interface';

@Component({
    selector: 'passenger-form',
    styleUrls: [ './passenger-form.component.scss' ],
    template: `
        <form #form="ngForm" novalidate>
            {{ detail  | json }}
            <div>
                Passenger Name:
                <input
                    type="text"
                    name="fullname"
                    [ngModel]="detail?.fullname">
            </div>
            <div>
                Passenger ID:
                <input
                    type="number"
                    name="id"
                    [ngModel]="detail?.id">
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="checkedIn"
                        [ngModel]="detail?.checkedIn"
                        (ngModelChange)="toggleCheckIn($event)">
                </label>
            </div>
            <div *ngIf="form.value.checkedIn">
                Check in Date:
                <input
                    type="number"
                    name="checkInDate"
                    [ngModel]="detail?.checkInDate">
            </div>
            {{ form.value | json }}
        </form>
    `
})

export class PassengerFormComponent implements OnInit {
    @Input()
    public detail: Passenger;
    constructor() {}

    ngOnInit() { }

    toggleCheckIn(checkedIn: boolean) {
        if (checkedIn) {
            this.detail.checkInDate = Date.now();
        }
    }
}
