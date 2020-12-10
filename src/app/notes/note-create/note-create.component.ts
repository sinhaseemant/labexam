import { NotesService } from './../notes.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent {

  enteredTitle = '';
  enteredContent = '';

  constructor(public postsService: NotesService){}
  onAddNote(form: NgForm) {
    if (form.invalid){
      return;
    }
    this.postsService.addNote(form.value.name,  form.value.adNumber,form.value.offense,  form.value.amount);
    form.resetForm();
  }



}
