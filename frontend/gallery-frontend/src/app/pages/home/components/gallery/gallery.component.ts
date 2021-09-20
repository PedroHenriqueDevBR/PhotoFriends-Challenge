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

  @Output()
  emitClose = new EventEmitter();

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
    this.emitChange();
  }

  emitChange(): void {
    this.hide = true;
    this.emitClose.emit('');
  }
  
}
