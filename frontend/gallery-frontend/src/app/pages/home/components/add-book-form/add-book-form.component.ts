import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/shared/services/book.service';
import { BookModel } from 'src/app/shared/models/book-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book-form',
  templateUrl: './add-book-form.component.html',
  styleUrls: ['./add-book-form.component.css']
})
export class AddBookFormComponent implements OnInit {

  @Input()
  hide: boolean = true;

  @Output()
  emitClose = new EventEmitter();

  currentImage: any;

  form: FormGroup;

  constructor(
    private bookService: BookService,
    private toast: ToastrService,
    ) {
    this.form = this.createBookForm(new BookModel());
  }

  ngOnInit(): void {
  }

  createBookForm(book: BookModel): FormGroup {
    return new FormGroup({
      title: new FormControl(book.title, [Validators.required, Validators.maxLength(200)]),
      description: new FormControl(book.description, [Validators.required, Validators.maxLength(1000)]),
    });
  }

  createBook(): void {
    let formData: FormData = new FormData();
    formData.append('title', this.form.value['title'])
    formData.append('description', this.form.value['description'])
    if (this.currentImage.target.files && this.currentImage.target.files[0]) {
      formData.append('cover_image', this.currentImage.target.files[0]);
    }
    this.bookService.createBook(formData).subscribe(
      data => {
        this.toast.success('Galeria criada');
      },
      error => {}
    )

  }

  inputFile(event: any) {
    this.currentImage = event;
  }

  onSubmit(): void {
    const title: string = this.form.value['title'];
    const description: string = this.form.value['description'];
    
    if (title.length > 200) {
      this.toast.error('O título deve ter no máximo 200 caracteres');
    } else if (description.length > 2500) {
      this.toast.error('A descrição deve ter no máximo 2500 caracteres');
    } else {
      this.createBook();
    }
  }

  closeModal(): void {
    this.hide = true;
    this.emitClose.emit('');
  }

}
