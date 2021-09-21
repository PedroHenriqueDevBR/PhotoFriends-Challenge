import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookModel } from 'src/app/shared/models/book-model';
import { PhotoService } from 'src/app/shared/services/photo.service';

@Component({
  selector: 'app-add-photo-form',
  templateUrl: './add-photo-form.component.html',
  styleUrls: ['./add-photo-form.component.css']
})
export class AddPhotoFormComponent implements OnInit {

  @Input()
  book: BookModel = new BookModel();

  @Input()
  hide: boolean = true;

  @Output()
  emitClose = new EventEmitter();

  currentImage: any;

  constructor(
    private photoService: PhotoService,
    private toast: ToastrService,
    ) {
  }

  ngOnInit(): void {
  }

  addPhoto(): void {
    let formData: FormData = new FormData();
    if (this.currentImage.target.files && this.currentImage.target.files[0]) {
      formData.append('url', this.currentImage.target.files[0]);
      this.photoService.addPhoto(this.book.id!, formData).subscribe(
        data => {
          this.toast.success('Foto adicionada');
          this.closeModal(true);
        },
        error => {}
      );
    } else {
      this.toast.warning('Nenhuma imagem selecionada');
    }
  }

  inputFile(event: any) {
    this.currentImage = event;
  }

  closeModal(update: boolean): void {
    this.hide = true;
    this.emitClose.emit(update);
  }
}
