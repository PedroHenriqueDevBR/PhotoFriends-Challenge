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

  selectedImage: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  removeSelectedImage(): void {
    this.selectedImage = '';
  }

}
