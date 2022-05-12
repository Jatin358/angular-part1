import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesServiceService {

  private url = 'http://localhost:3000/notes';

  constructor(private http: HttpClient) { }

  getNotes(){
    return this.http.get(this.url);
  }
  addNote(data: any){
    return this.http.post(this.url, data);
  }
}
