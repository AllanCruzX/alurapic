import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {
  
  photoForm: FormGroup;
  file: File;

  constructor(
    private formBuilder: FormBuilder ,
    private photoService: PhotoService,
    private router: Router
    ) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    })
  }

  upload() {

    // getRawValue -me retorna o valor das variveis que estão no formulario 
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;
    console.log(this.file);
    this.photoService
    .upload(description, allowComments, this.file)
    .subscribe(() => this.router.navigate(['']))
  }

}
