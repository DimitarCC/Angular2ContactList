import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Contact, Gender } from './contact.model';
import { BackendMockService } from '../common/backend-mock.service';

@Component({
  // moduleId: module.id,
  selector: 'contact-detail',
  templateUrl: './contact-detail.component.html',
  providers: [BackendMockService]
})
export class ContactDetailComponent implements OnInit, OnChanges {
  public contact: Contact = { id: undefined, firstName: '', lastName: '', address: '', gender: Gender.MALE, email: '', phone: '' };
  public contactForm: FormGroup;
  public isNewProduct: boolean = true; // new product by default
  public errorMessage: string;

  private formErrors = {
    'name': '',
    'price': ''
  };

  private validationMessages = {
    'firstName': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'First Name cannot be more than 40 characters long.'
    },
    'lastName': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 40 characters long.'
    },
    'address': {
      'required': 'Address is required.',
    }
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private service: BackendMockService) { }

  public ngOnInit() {
    this.service.getAll(Contact);
    this.buildForm();
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // (+) converts string 'id' to a number
      if (id) {
        this.isNewProduct = false; // has Id => not new
             this.service.get(Contact, id).then(
               contactItem => {
                 this.contact = contactItem;
                 this.resetForm();
         });
      }
    });
    // this.route.data.forEach(data => {
    //   console.log('Data:', data);
    //   this.product = data['product'] || this.product; // resolved product using ProductResolver
    //   this.isNewProduct = !this.product.id;
    //   this.resetForm();
    // });
  }

  public ngOnDestroy() {
  }



  public ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    let chng = changes['contact'];
    if (chng.currentValue !== chng.previousValue) {
      this.resetForm();
    }
  }

  public buildForm(): void {
    this.contactForm = this.fb.group({
      'id': [{ value: this.contact.id, disabled: true }],
      'firstName': [this.contact.firstName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24)
      ]],
      'lastName': [this.contact.lastName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24)
      ]],
      'gender': [this.contact.gender],
      'email' : [this.contact.email],
      'phone' : [this.contact.phone],
      'address' : [this.contact.address, [
        Validators.required,
      ]],
    });

    this.contactForm.statusChanges
      .subscribe(data => this.onStatusChanged(data));

    this.onStatusChanged(); // reset validation messages
  }

  public onSubmit() {
    this.contact = this.contactForm.getRawValue() as Contact;
    if (this.isNewProduct) {
      this.service.add(Contact, this.contact).then((contactAdded) => {
        this.contact = contactAdded;
        this.goBack();
      });
    } else {
      this.service.edit(Contact, this.contact).then((contactEdited) => {
        this.contact = contactEdited;
        this.goBack();
      });
    }
  }

  public goBack() {
    // let navigationExtras: NavigationExtras = {
    //   queryParams: { selectedId: this.product.id },
    //   fragment: 'anchor'
    // };
    this.location.back();
    // this.router.navigate(['/products', {foo: 'bar'}], navigationExtras);
  }

  public resetForm() {
    this.contactForm.reset(this.contact);
  }

  private onStatusChanged(data?: any) {
    if (!this.contactForm) { return; }
    const form = this.contactForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}

