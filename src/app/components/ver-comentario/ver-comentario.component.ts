import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { comentario } from 'src/app/interfaces/comentario';
import { ComentarioService } from 'src/app/services/comentarios.service';

@Component({
  selector: 'app-ver-comentario',
  templateUrl: './ver-comentario.component.html',
  styleUrls: ['./ver-comentario.component.css']
})
export class VerComentarioComponent implements OnInit {
  id: number;
  comentario: comentario | undefined;

  constructor(private aRoute: ActivatedRoute, private _comentarioService: ComentarioService) {
    this.aRoute.snapshot.paramMap.get('id')
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;    //convierte el id string obtenido a numero para acceder a los datos de la BD
  }

  ngOnInit(): void {
    this.getComentario();
  }

  getComentario() {
    this._comentarioService.getComentario(this.id).subscribe (data => {
      this.comentario = data;
    })
  }
}
