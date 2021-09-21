import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommentModel } from 'src/app/shared/models/comment-model';
import { PhotoModel } from 'src/app/shared/models/photo-model';
import { MetadataImageService } from 'src/app/shared/services/metadata-image.service';

@Component({
  selector: 'app-show-image-container',
  templateUrl: './show-image-container.component.html',
  styleUrls: ['./show-image-container.component.css']
})
export class ShowImageContainerComponent implements OnInit {
  @Input()
  hide: boolean = true;

  @Input()
  showControls: boolean = false;

  @Input()
  bookId?: number = 0;

  @Input()
  photo: PhotoModel = new PhotoModel('');

  @Output()
  emitClose = new EventEmitter();

  @Output()
  emitAcept = new EventEmitter();

  @Output()
  emitReject = new EventEmitter();
  
  comments: CommentModel[] = [];
  hideCommentFormModal: boolean = true;
  update: boolean = false;

  likes: number = 0;

  constructor(
    private toast: ToastrService,
    private metadataService: MetadataImageService,
  ) {
    
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.getLikes();
    this.getComments();
  }

  closeModal(): void {
    this.hide = true;
    this.photo = new PhotoModel('');
    this.bookId = 0;
    this.comments = [];
    this.emitClose.emit(this.update);
  }

  addLike() {
    this.metadataService.addLike(this.photo.id!).subscribe(
      data => {
        this.toast.success('Like registrado');
        this.likes++;
      },
      error => {}
    );
  }

  getLikes() {
    this.metadataService.getLikesFromPhoto(this.photo.id!).subscribe(
      data => {
        this.likes = data.length;
      },
      error => {}
    );
  }

  getComments() {
    this.metadataService.getCommentsFromPhoto(this.photo.id!).subscribe(
      data => {
        this.comments = [];
        this.comments = data;
      },
      error => {}
    );
  }

  showCommentFormModal() {
    this.hideCommentFormModal = false;
  }

  closeCommentFormModal(event: any) {
    if (event == true) {
      this.getComments();
    }
    this.hideCommentFormModal = true;
  }

  acceptImage() {
    console.log('accept show-image-container');
    this.emitAcept.emit(this.photo);
    this.closeModal();
  }

  rejectImage() {
    console.log('reject show-image-container');
    this.emitReject.emit(this.photo);
    this.closeModal();
  }

}
