import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
} )
export class AppComponent {

  form: FormGroup = new FormGroup( {
    name: new FormControl( '', [
      Validators.required,
    ] ),
    email: new FormControl( '', [
      Validators.required,
      Validators.email
    ] )
  } );

  submitted = false

  constructor ( private http: HttpClient ) {

  }

  onSubmit () {

    const data = this.form.value
    this.submitted = true;

    if ( this.form.invalid ) {
      return;
    } else {
      this.postData( data ).subscribe(
        res => console.log( res ),
        err => console.log( err ) )
      this.submitted = false
      this.form.reset()
    }
  }

  postData ( data: any ) {
    return this.http.post<any>( `${ environment.api }/lead`, data )
  }

  get f (): { [ key: string ]: AbstractControl } {
    return this.form.controls;
  }

}
