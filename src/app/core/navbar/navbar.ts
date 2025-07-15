import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButton} from '@angular/material/button';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MatMenuModule, MatButton, MatToolbar, MatToolbarModule, RouterLinkActive, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

}
