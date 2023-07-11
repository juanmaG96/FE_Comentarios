import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  img = 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg';

  ngOnInit(): void {
  }
}
