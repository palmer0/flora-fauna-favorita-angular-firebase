import {Component, inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ItemFavoritesService} from '../../services/item-favorites.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-item-favorites',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './item-favorites.component.html',
  styleUrl: './item-favorites.component.css'
})
export class ItemFavoritesComponent implements OnInit {

  private router = inject(Router);
  private favoritosService = inject(ItemFavoritesService);

  favoritos$!: Observable<any[]>;


  ngOnInit() {
    this.favoritos$ = this.favoritosService.getMisFavoritos();
  }

  openDetail(id: string) {
    this.router.navigate(['/item-detail', id]);
  }
}
