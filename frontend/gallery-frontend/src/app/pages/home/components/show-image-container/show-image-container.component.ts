import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommentModel } from 'src/app/shared/models/comment-model';
import { PhotoModel } from 'src/app/shared/models/photo-model';
import { MetadataImageService } from 'src/app/shared/services/metadata-image.service';
import { PhotoService } from 'src/app/shared/services/photo.service';

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
  
  comments: CommentModel[] = [];
  hideCommentFormModal: boolean = true;

  likes: number = 0;

  constructor(
    private photoService: PhotoService,
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
    this.emitClose.emit('');
  }

  acceptImage() {
    if (this.photo.acepted) {
      this.toast.warning('A imagem já está disponível para visualizalção');
      return;
    }
    this.photoService.acceptPhoto(this.bookId!, this.photo.id!).subscribe(
      data => {
        this.toast.success('Alteração realizada');
        this.closeModal();
      },
      error => {}
    );
  }

  rejectImage() {
    if (!this.photo.acepted) {
      this.toast.warning('A imagem já está oculta');
      return;
    }
    this.photoService.rejectPhoto(this.bookId!, this.photo.id!).subscribe(
      data => {
        this.toast.success('Alteração realizada');
        this.closeModal();
      },
      error => {}
    );
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

  closeCommentFormModal() {
    this.hideCommentFormModal = true;
    this.getComments();
  }

}
