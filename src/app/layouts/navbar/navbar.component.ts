import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [CommonModule, RouterModule],
})
export class NavbarComponent implements OnInit {
  showMobileMenu = false;

  navItems = [
    {
      title: 'home',
      link: 'home',
    },
    {
      title: 'search',
      link: 'search',
    },
    {
      title: 'wish list',
      link: 'wishlist',
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  menuToggleHandler() {
    this.showMobileMenu = !this.showMobileMenu;

    if (this.showMobileMenu) {
      document.querySelector('html').style.overflow = 'hidden';
    } else {
      document.querySelector('html').style.overflow = 'auto';
    }
  }

  closeMenuHandler() {
    this.showMobileMenu = false;

    document.querySelector('html').style.overflow = 'auto';
  }
}
