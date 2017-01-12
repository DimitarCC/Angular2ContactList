import { Component, OnInit } from '@angular/core';
import { Contact } from '../contacts/contact.model';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BackendMockService } from '../common/backend-mock.service';

@Component({
  selector: 'home-main',
  templateUrl: './home.component.html',
  styleUrls: ['./../app.component.css'],
  providers: [BackendMockService]
})
export class HomeComponent {
}
