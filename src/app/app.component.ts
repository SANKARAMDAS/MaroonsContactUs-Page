import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectionService } from './connection.service';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  contactForm: FormGroup;
  disabledSubmitButton: boolean = false;
  optionsSelect: Array<any>;

  @HostListener('input') oninput() {

    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
    }
  }

  constructor(fb: FormBuilder, private conn : ConnectionService, private theme : ThemeService) {
    this.theme.load();

    this.contactForm = fb.group({
      'contactFormName': ['', Validators.required],
      'contactFormEmail': ['', Validators.compose([Validators.required, Validators.email])],
      'contactFormSubjects': ['', Validators.required],
      'contactFormMessage': ['', Validators.required],
      'contactFormCopy': ['', Validators.requiredTrue],
    });
  }

  ngOnInit() {

    this.optionsSelect = [
      { value: 'Feedback', label: 'Feedback' },
      { value: 'Report a bug', label: 'Report a bug' },
      { value: 'Feature request', label: 'Feature request' },
      { value: 'Other stuff', label: 'Other stuff' },
    ];
  }

  get name() {
    return this.contactForm.get('contactFormName');
  }
  get email() {
    return this.contactForm.get('contactFormEmail');
  }
  get subjects() {
    return this.contactForm.get('contactFormSubjects');
  }
  get message() {
    return this.contactForm.get('contactFormMessage');
  }
  get copy() {
    return this.contactForm.get('contactFormCopy');
  }

  onSubmit() {
    alert(this.conn.sendMessage(this.contactForm.value))
      this.contactForm.reset();
      this.disabledSubmitButton = true;
  }
  
  onChange(event) {
    if (event.checked) {
      this.theme.update('dark');
    } else {
      this.theme.update('light');
    }
  }
}
