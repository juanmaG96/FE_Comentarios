import { Component } from '@angular/core';
import { comentario } from 'src/app/interfaces/comentario';
import { ComentarioService } from 'src/app/services/comentarios.service';

@Component({
  selector: 'app-list-comentarios',
  templateUrl: './list-comentarios.component.html',
  styleUrls: ['./list-comentarios.component.css']
})
export class ListComentariosComponent {

  listComentarios: comentario[] = []; // eliminamos los comentarios creados como ejemplos en FE

  constructor (private _comentarioService: ComentarioService) { }

  ngOnInit(): void{
    this.getComentario();
  }

  getComentario() {
    this._comentarioService.getListComentarios().subscribe(data => {
      console.log(data);
      this.listComentarios = data;    //conectamos a los comentarios guardados en la BD con BE
    }, error => {
      console.log(error);
    })
  }

  eliminarComentario(id: any){
    console.log(id);
    this._comentarioService.deleteComentario(id).subscribe(data => {
      this.getComentario();
    }, error => {
      console.log(error);
    })
  }

}
