import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommentModel } from 'src/app/shared/models/comment-model';
import { PhotoModel } from 'src/app/shared/models/photo-model';
import { MetadataImageService } from 'src/app/shared/services/metadata-image.service';

@Component({
  selector: 'app-add-comment-form',
  templateUrl: './add-comment-form.component.html',
  styleUrls: ['./add-comment-form.component.css']
})
export class AddCommentFormComponent implements OnInit {

  @Input()
  hide: boolean = true;

  @Input()
  photo: PhotoModel = new PhotoModel('');

  @Output()
  emitClose = new EventEmitter();

  currentImage: any;

  form: FormGroup;

  constructor(
    private metadataService: MetadataImageService,
    private toast: ToastrService,
  ) {
    this.form = this.createForm(new CommentModel());
  }

  ngOnInit(): void {
  }

  createForm(comment: CommentModel): FormGroup {
    return new FormGroup({
      content: new FormControl(comment.content, [Validators.required, Validators.maxLength(200)]),
    });
  }

  createComment(): void {
    let comment: CommentModel = new CommentModel();
    comment.content = this.form.value['content'];
    this.metadataService.addComment(this.photo.id!, comment).subscribe(
      data => {
        this.toast.success('Comentário adicionado');
        this.closeModal(true);
      },
      error => { },
    );
  }

  closeModal(update: boolean): void {
    this.hide = true;
    this.emitClose.emit(update);
  }

}
