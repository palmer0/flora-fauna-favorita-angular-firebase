import {Component, inject, OnInit} from '@angular/core';
import {catchError, forkJoin, map, Observable, of, switchMap, take, tap} from 'rxjs';
import {ItemFavoritesService} from '../../services/item-favorites.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ItemListService} from '../../services/item-list.service';
import {Item} from '../../models/item.model';

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
  private itemListService = inject(ItemListService);

  favoritos$!: Observable<Item[]>;
  private vecesElegidoMap = new Map<string, number>();


  /*
   ngOnInit() {
     this.favoritos$ = this.favoritosService.getMisFavoritos();
   }
   */

  ngOnInit() {
    this.favoritos$ = this.favoritosService.getMisFavoritos().pipe(
      tap(favoritos => {
        // Cargar vecesElegido para cada favorito
        const peticiones = favoritos.map(fav =>
          this.itemListService.getItemById(fav.id!).pipe(
            tap(item => this.vecesElegidoMap.set(fav.id!, item.vecesElegido ?? 0))
          )
        );

        forkJoin(peticiones).subscribe(() => {
          console.log('Map de vecesElegido cargado:', this.vecesElegidoMap);
        });
      })
    );
  }

  getVecesElegido(id: string): number {
    return this.vecesElegidoMap.get(id) ?? 0;
  }

  openDetail(id: string) {
    this.router.navigate(['/item-detail', id]);
  }
}
