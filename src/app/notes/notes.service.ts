import { Note} from './note.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private notes: Note[] = [];
  private notesUpdated = new Subject<Note[]>();


  constructor(private http: HttpClient) { }
  // tslint:disable-next-line: typedef
  getPosts() {
    this.http.get<{ message: string, notes: Note[] }>('http://localhost:3000/api/posts')
      .subscribe((noteData) => {
        this.notes = noteData.notes;
        this.notesUpdated.next([...this.notes]);
      });
  }

  getPostUpdateListener() {
    return this.notesUpdated.asObservable();
  }

  // tslint:disable-next-line: typedef
  addNote(name: string, adNumber: number, offense: string, amount: number) {
    const note: Note = {
      id: null,
      name,
      adNumber,
      offense,
      amount

    };
    this.http.post<{ message: string }>('http://localhost:3000/api/posts', note)
      .subscribe((responseData) => {
        console.log(responseData);
        this.notes.push(note);
        this.notesUpdated.next([...this.notes]);
      });


  }
}
