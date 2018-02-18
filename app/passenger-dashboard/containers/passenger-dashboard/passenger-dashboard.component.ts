import { Component, OnInit } from "@angular/core";

import { Passenger } from "../../models/passenger.interface";
import { PassengerDashboardService } from "../../passenger-dashboard.service";

@Component({
    selector: "passenger-dashboard",
    styleUrls: ["./passenger-dashboard.component.scss"],
    template: `
    <div>
    <passenger-count
      [items]="passengers">
    </passenger-count>
    <div *ngFor="let passenger of passengers">
        {{ passenger.fullname }}
    </div>
    <passenger-detail
      *ngFor="let passenger of passengers;"
      [detail]="passenger"
      (edit)="handleEdit($event)"
      (remove)="handleRemove($event)">
    </passenger-detail>
  </div>
    `
})
export class PassengerDashboardComponent implements OnInit {
    public passengers: Passenger[];
    constructor(private PassengerDashboardService: PassengerDashboardService) {}

    ngOnInit() {
        this.PassengerDashboardService.getPassengers().subscribe(
            (data: Passenger[]) => {
                this.passengers = data;
            }
        );
    }

    public handleRemove = (event: Passenger) => {
        this.PassengerDashboardService.removePassenger(event)
            .subscribe((data: Passenger) => {
                this.passengers = this.passengers
                    .filter((passenger: Passenger) => {
                        return passenger.id !== event.id;
                    }
                );
            }
        );
    };
    public handleEdit = (event: any) => {
        this.PassengerDashboardService.updatePassenger(event).subscribe(
            (data: Passenger) => {
                this.passengers = this.passengers.map(
                    (passenger: Passenger) => {
                        if (passenger.id === event.id) {
                            passenger = Object.assign({}, passenger, event);
                        }
                        return passenger;
                    }
                );
            }
        );
    };
}
