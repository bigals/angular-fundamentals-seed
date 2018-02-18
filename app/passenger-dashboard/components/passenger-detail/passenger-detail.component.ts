import { Component,  OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Passenger } from "../../models/passenger.interface";

@Component({
    selector: "passenger-detail",
    styleUrls: ["./passenger-detail.component.scss"],
    template: `
    <div>
      <span class="status" [class.checked-in]="detail.checkedIn"></span>
      <div *ngIf="editing">
        <input
          type="text"
          [value]="detail.fullname"
          (input)="onNameChange(name.value)"
          #name>
      </div>
      <div *ngIf="!editing">
        {{ detail.fullname }}
      </div>
      <div class="date">
        Check in date:
        {{ detail.checkInDate ? (detail.checkInDate | date: 'yMMMMd' | uppercase) : 'Not checked in' }}
      </div>
      <div class="children">
        Children: {{ detail.children?.length || 0 }}
      </div>
      <button (click)="toggleEdit()">
        {{ editing ? 'Done' : 'Edit' }}
      </button>
      <button (click)="onRemove()">
        Remove
      </button>
    </div>
    `
})
export class PassengerDetailComponent implements OnInit {
    @Input()
  public detail: Passenger;

  @Output()
 public  edit: EventEmitter<any>;

  @Output()
  public remove: EventEmitter<any>;

  public editing: boolean = false;
    constructor () {
        this.remove = new EventEmitter();
        this.edit = new EventEmitter();
    }

    public ngOnInit = () => { }

    //Keeps local state of the variable stable as the ngIf
    //will be destroying data as edit is toggled
    public onNameChange = (value: string) => {
        this.detail.fullname = value;
    };

    public toggleEdit = () => {
        //If we are leaving edit mode, emit the event
        if (this.editing) {
            this.edit.emit(this.detail);
        }
        this.editing = !this.editing;
    };

    public onRemove = () => {
        this.remove.emit(this.detail);
    };
}
