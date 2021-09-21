import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PhotoModel } from 'src/app/shared/models/photo-model';
import { PhotoService } from 'src/app/shared/services/photo.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  @Input()
  images:PhotoModel[] = [];

  @Input()
  bookId?: number = 0;

  @Input()
  hide: boolean = true;

  @Input()
  hideImages: boolean = true;

  @Input()
  showControls: boolean = false;

  @Output()
  emitClose = new EventEmitter();

  @Output()
  accept = new EventEmitter();

  @Output()
  reject = new EventEmitter();

  selectedImage: PhotoModel = new PhotoModel('');

  constructor() { }

  ngOnInit(): void {
  }

  selectImage(photo: PhotoModel): void {
    this.selectedImage = photo;
  }

  removeSelectedImage(event: any): void {
    this.selectedImage = new PhotoModel('');
    this.bookId = 0;
    if (event == true) {
      this.hide = true;
      this.emitChange(true);
    }
  }

  emitChange(update: boolean): void {
    this.emitClose.emit(update);
  }

  acceptImage(photo: PhotoModel): void {
    console.log('accept galley');
    this.accept.emit(photo);
  }

  rejectImage(photo: PhotoModel): void {
    console.log('reject galley');
    this.reject.emit(photo);
  }
  
}
