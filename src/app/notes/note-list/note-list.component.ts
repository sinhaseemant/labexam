
import { NotesService } from './../notes.service';
import { Component, OnInit, OnDestroy} from '@angular/core';
import {Note} from '../note.model';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit, OnDestroy {
  posts: Note[] = [];
  amountTot =0
  private postsSub: Subscription;

  constructor(public notesService: NotesService) {}

  ngOnInit() {
    this.notesService.getPosts();
    this.postsSub = this.notesService.getPostUpdateListener()
    .subscribe((posts: Note[]) => {
      this.posts = posts;
      for (let i = 0; i < posts.length; i++) {
        this.amountTot = this.amountTot+ posts[i].amount;
      }
      this.amountTot = this.amountTot/posts.length;
    });

  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
