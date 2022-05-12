import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesServiceService } from './notes-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-keep-level-1-assignment';
  panelOpenState = false;
  keepNoteForm: FormGroup;
  notesData: any;

  constructor(private fb: FormBuilder, private notesServiceService : NotesServiceService, private snackbar: MatSnackBar){
    this.keepNoteForm = this.fb.group({
      title : [''],
      text: ['']
    })
  }
  ngOnInit(){
      this.getNotesData();
  }
  formSubmit(){
    let title = this.keepNoteForm.value.title;
    let text = this.keepNoteForm.value.text;
    let keepNoteObject ={
      "id": "",
      "title": title,
      "text": text

    }
    this.notesServiceService.addNote(keepNoteObject).subscribe((response: any) =>{
      if(response != {}){
        this.notesData.push(response);
      }else{
        setTimeout(()=>{this.snackbar.open("Server Error !!!", "Error")}); 
      }
    }, error => {
      setTimeout(()=>{this.snackbar.open("Server Error !!!","Error")});
    })
    this.resetForm();
  }
  getNotesData(){
    this.notesServiceService.getNotes().subscribe((response: any) =>{
      this.notesData = response;
  }, error => {
    setTimeout(()=>{this.snackbar.open("Server Error !!!","Error")});
  })
  }
  resetForm(){
    this.keepNoteForm.reset();
  }
}

