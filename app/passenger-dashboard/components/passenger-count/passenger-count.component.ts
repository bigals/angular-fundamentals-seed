import { Component, Input, OnInit } from "@angular/core";
import { Passenger } from "../../models/passenger.interface";

@Component({
    selector: "passenger-count",
    styleUrls: ["./passenger-count.component.scss"],
    template: `
        <div>
            <h3>Airline Passengers</h3>
            <div>
                Total checked in: {{ checkedInCount() }}/{{ items.length }}
            </div>
        </div>
    `
})
export class PassengerCountComponent implements OnInit {
    @Input()
    public items: Passenger[];
    constructor() {}

    public ngOnInit = () => { }
    public checkedInCount = (): number => {
        if (!this.items) return;
        return this.items.filter((passenger: Passenger) => {
            return passenger.checkedIn;
        }).length;
    }
}
