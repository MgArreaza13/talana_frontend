import { PetService } from './../../../../core/services/pet.service';
import { Pet } from 'src/app/shared/models/pet';
import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(2));
  public petForm: FormGroup;
  public pet: Pet = {};
  public idToPetUpdate: number;
  public submitted = false;
  public isUpdatePet: boolean = false;
  public isFormActive: boolean = false;
  // public submitted = false;
  public isImageToUpload = false;
  public haveToUpdate = false;
  public editFile = true;
  public removeUpload = false;
  tasks;
  modalRef: BsModalRef;
  bsModalRef: BsModalRef;
  liked;
  imageUrl: any;
  constructor(
    private formBuilder: FormBuilder,
    private petService: PetService,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
    private modalService: BsModalService,
    private cd: ChangeDetectorRef,
  ) {
    this.liked = JSON.parse(localStorage.getItem('petAppLiked'));
    console.log(this.liked)
  }

  ngOnInit() {
    // Build form
    this.petForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
      ]],
      file: ['']

    });
    this.get_list_task();
  }


  get f() { return this.petForm.controls; }


  /**
   * create task from user
   */
  onSubmit() {
    this.ngxService.start();
    this.submitted = true;
    if (this.petForm.invalid) {
      this.ngxService.stop();
      return;
    }


    // Set object
    this.pet.title = this.petForm.get('title').value;
    this.pet.file = this.petForm.get('file').value;


    // Send request
    this.petService.create(this.pet).subscribe(
      (data: any) => {
        this.petForm.setValue({
          title: '',
          file: ''
        })
        this.imageUrl = null;
        this.editFile = true;
        this.removeUpload = false;
        this.isImageToUpload = false;
        this.cd.markForCheck();
        this.isFormActive = false;
        this.get_list_task();
        this.ngxService.stop();
        this.closeModal();

      },
      err => { console.log(err); this.toastr.error('Error', err); this.ngxService.stop(); }
    );
  }

  /**
   * get list tasks from user
   */
  get_list_task() {
    this.ngxService.start()
    this.petService.get_list().subscribe(
      (data) => {
        this.tasks = data;
        this.ngxService.stop();
        this.toastr.success('Mascotas cargadas con exito');
      },
      error => { console.log(error); this.toastr.success(error); this.ngxService.stop(); }
    );
  }



  /**
   * deletetask from user
   */
  delete(id: number) {
    this.ngxService.start()
    this.petService.delete(id).subscribe(
      (data) => {
        this.get_list_task(); // update tasks
        this.ngxService.stop();
        this.toastr.success('Mascota eliminada con exito');
      },
      error => { console.log(error); this.toastr.success(error); this.ngxService.stop(); }
    );
  }

  /**
   * setting form update
   */
  updateForm(pet: Pet) {
    this.isFormActive = true;
    this.isUpdatePet = true;
    this.idToPetUpdate = pet.id;
    this.petForm.setValue({
      title: pet.title,
      description: pet.description
    });
  }

  /**
   * edit task from user
  */
  edit() {
    this.submitted = true;
    if (this.petForm.invalid) {
      this.ngxService.stop();
      return;
    }

    // Set object
    this.pet.title = this.petForm.get('title').value;
    this.pet.description = this.petForm.get('description').value;

    // Send request
    this.petService.update(this.idToPetUpdate, this.pet).subscribe(
      (data: any) => {
        this.petForm.setValue({
          title: '',
          description: ''
        })
        this.isFormActive = false;
        this.get_list_task();
        this.ngxService.stop();
        this.closeModal();
      },
      err => { console.log(err); this.toastr.error('Error', err); this.ngxService.stop(); }
    );
  }



  /**
   * show form
   */
  showForm() {
    // set value the form in ''
    this.petForm.setValue({
      title: '',
      description: ''
    })
    // show create form
    this.isFormActive = true;

    // reset edit form
    this.idToPetUpdate = 0;
    this.isUpdatePet = false;
  }

  /**
   * hide form
   */
  hideForm() {
    // reset data
    this.idToPetUpdate = 0;
    this.isFormActive = false;
    this.isUpdatePet = false;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModalEdit(template: TemplateRef<any>, task) {
    this.modalRef = this.modalService.show(template);
    this.updateForm(task);

  }

  closeModal() {
    this.modalRef.hide()
  }


  like(id) {
    const ob = {
      id: id,
      liked: true
    }

    localStorage.setItem("petAppLiked", JSON.stringify(ob));
    this.liked = JSON.parse(localStorage.getItem('petAppLiked'));
    this.petService.like(id).subscribe(
      (data: any) => {
        this.tasks = data;
      }, error => {
        console.log(error);
      }
    )
  }


  uploadFile(event: any) {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.isImageToUpload = true;
        this.haveToUpdate = true;
        this.editFile = false;
        this.removeUpload = true;
        this.petForm.patchValue({
          file: reader.result,

        });
      };
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }


  removeUploadedFile() {
    this.imageUrl = null;
    this.editFile = true;
    this.removeUpload = false;
    this.isImageToUpload = false;
    this.cd.markForCheck();
  }

}



