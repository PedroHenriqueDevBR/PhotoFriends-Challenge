import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PhotoModel } from 'src/app/shared/models/photo-model';
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

  constructor(
    private photoService: PhotoService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.hide = true;
    this.emitClose.emit('');
  }

  acceptImage() {
    console.log('Passou aqui (Aceitou)');
    console.log(this.bookId);
    console.log(this.photo.id);
    if (this.photo.acepted) {
      this.toast.warning('A imagem já está disponível para visualizalção');
      return;
    }
    this.photoService.acceptPhoto(this.bookId!, this.photo.id!).subscribe(
      data => {
        this.toast.success('Alteração realizada');
        this.closeModal();
      },
      error => {
        console.log(error);
      }
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
      error => {
        console.log(error);
      }
    );
  }

}
