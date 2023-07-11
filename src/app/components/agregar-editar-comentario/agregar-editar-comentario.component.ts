import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { comentario } from 'src/app/interfaces/comentario';
import { ComentarioService } from 'src/app/services/comentarios.service';

@Component({
  selector: 'app-agregar-editar-comentario',
  templateUrl: './agregar-editar-comentario.component.html',
  styleUrls: ['./agregar-editar-comentario.component.css']
})
export class AgregarEditarComentarioComponent implements OnInit {
  agregarComentario: FormGroup;
  accion = "Agregar";
  id = 0;
  comentario: comentario | undefined;

  constructor(private fb: FormBuilder,
              private _comentarioService: ComentarioService,  //acceder al servicio --> los servicios siempre inician con "_"
              private router: Router,                     //para navegar a traves del routeo?
              private aRoute: ActivatedRoute) {         //inyectamos la clase aRoute para extraer el id
    this.agregarComentario = this.fb.group({
      titulo: ['', Validators.required],
      creador: ['', Validators.required],
      texto: ['', Validators.required],
    })
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void{
    this.esEditar();
  }

  esEditar(){
    if(this.id !== 0){
      this.accion = "Editar";
      this._comentarioService.getComentario(this.id).subscribe(data => {
      //console.log(data);
      this.comentario = data;
      this.agregarComentario.patchValue({
        titulo: data.titulo,
        texto: data.texto,
        creador: data.creador
      })
      }, error => {
        console.log(error);
      })
    }
  }

  agregarEditarComentario(){
    if(this.comentario == undefined) {

      //AGREGAMOS UN NUEVO COMENTARIO
      const comentario: comentario = {
        titulo: this.agregarComentario.get("titulo")?.value,
        creador: this.agregarComentario.get("creador")?.value,
        texto: this.agregarComentario.get("texto")?.value,
        fechaCreacion: new Date
      }
      this._comentarioService.saveComentario(comentario).subscribe(data => {
        this.router.navigate(['/']);
      }, error => {
        console.log(error)
      })
    } else {
      // EDITAMOS COMENTARIO
      const comentario: comentario = {
        id: this.comentario.id,
        titulo: this.agregarComentario.get("titulo")?.value,
        creador: this.agregarComentario.get("creador")?.value,
        texto: this.agregarComentario.get("texto")?.value,
        fechaCreacion: this.comentario.fechaCreacion
    }
    this._comentarioService.updateComentario(this.id, comentario).subscribe(data => {
      this.router.navigate(['/']);
    }, error => {
      console.log(error)
    })

  }
}
}
