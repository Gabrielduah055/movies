import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  router = inject(Router)

  navItems = [
    { path: '/home', icon: 'icon-nav-home.svg', hoverIcon:'hover-home-icon.png', activeIcon: 'Shape.svg' },
    { path: '/movies', icon: 'icon-nav-movies.svg', hoverIcon:'hover-movie-icon.png', activeIcon: 'movies.svg' },
    { path: '/series', icon: 'icon-nav-tv-series.svg', hoverIcon:'hover-tv-icon.png', activeIcon: 'tv.svg' },
    { path: '/bookmark', icon: 'icon-nav-bookmark.svg', hoverIcon:'hover-bookmark-icon.png', activeIcon: 'bookmark.svg' }
  ]
  
  hoveredItem:any = null;
}
