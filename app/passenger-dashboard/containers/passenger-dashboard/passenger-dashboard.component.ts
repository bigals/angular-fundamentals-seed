import { Component, OnInit } from "@angular/core";

@Component({
    selector: "passenger-dashboard",
    template: `
        <div>
        <h3>Airline Passengers</h3>
        <ul>
          <li *ngFor="let passenger of passengers; let i = index;">
            <span
            class="status"
            [class.checked-in]="passenger.checkedIn"></span>
            {{ i }}: {{ passenger.fullname }}
            <div class="date">
              Check in date:
              {{ passenger.checkInDate ?
                (passenger.checkInDate | date: 'yMMMMd' | uppercase) :
                'Not checked in'
              }}
            </div>
            <div class="children">
              Children: {{ passenger.children?.length || 0 }}
            </div>
          </li>
        </ul>
        </div>
    `
})
export class PassengerDashboardComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
