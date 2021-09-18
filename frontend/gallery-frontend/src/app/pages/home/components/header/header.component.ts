import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  changeStatus = new EventEmitter();
  currentStatus: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  emitChange() {
    this.currentStatus = !this.currentStatus;
    this.changeStatus.emit(this.currentStatus);
  }

}
