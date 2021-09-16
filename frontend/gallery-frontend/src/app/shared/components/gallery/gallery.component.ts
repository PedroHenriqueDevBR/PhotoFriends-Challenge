import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  @Input()
  images:string[] = [];

  @Input()
  hide: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
