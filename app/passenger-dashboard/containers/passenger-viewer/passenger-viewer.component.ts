import { Component, OnInit } from "@angular/core";

//Services
import { PassengerDashboardService } from "../../passenger-dashboard.service";

//Interfaces
import { Passenger } from '../../models/passenger.interface';
@Component({
    selector: "passenger-viewer",
    styleUrls: ["./passenger-viewer.component.scss"],
    template: `
        <div>
            <passenger-form
                [detail]="passenger"
                (update)="onUpdatePassenger($event)">
            </passenger-form>
        </div>
    `
})
export class PassengerViewerComponent implements OnInit {
    public passenger: Passenger;
    constructor (
        private passengerService: PassengerDashboardService) { }

    ngOnInit() {
        this.passengerService
            .getPassenger(1)
            .subscribe((data: Passenger) => {
                this.passenger = data;
            }, (error: any) => {
                console.log(error);
            });
    }

    onUpdatePassenger(event: Passenger) {
        this.passengerService.updatePassenger(event)
            .subscribe((data: Passenger) => {
                this.passenger = Object.assign({}, this.passenger, event);
            }, (error: any) => {
                console.log(error);
            });
    }
}
