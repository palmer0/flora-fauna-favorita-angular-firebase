import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Item} from '../../models/item.model';
import {ItemListService} from '../../services/item-list.service';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ItemFavoritesService} from '../../services/item-favorites.service';

@Component({
  selector: 'app-item-list',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnDestroy {

  private itemListService = inject(ItemListService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private favoritosService = inject(ItemFavoritesService);

  tipo: 'animal' | 'planta' = 'animal';
  items$!: Observable<Item[]>;
  private sub: Subscription;
  favorites: { [itemId: string]: boolean } = {};


  constructor() {
    this.sub = this.route.paramMap.subscribe((params) => {
      // this.tipo = params.get('tipo')  || '';
      this.tipo = params.get('tipo') as 'animal' | 'planta';
      this.items$ = this.itemListService.getItemsByTipo(this.tipo);

      this.items$.subscribe(items => {
        items.forEach(item => {
          this.checkIfFavorite(item.id!);
        });
      });
    });
  }

  /*
  ngOnInit() {
    this.tipo = this.route.snapshot.paramMap.get('tipo') as 'animal' | 'planta';
    this.items$ = this.itemListService.getItemsByTipo(this.tipo);
  }
  */


  openDetail(itemId: string) {
    this.itemListService.incrementElegido(itemId).then(() => {
      this.router.navigate(['/item-detail', itemId]);

    }).catch(error => {
      console.error('Error al incrementar votos:', error);
      this.router.navigate(['/item-detail', itemId]);
    });
  }

  /*
  addNewItem() {
    //this.router.navigate(['/item-form', { tipo: this.tipo }]);
    this.router.navigate(['/item-form', this.tipo]);
  }
  */



  async checkIfFavorite(itemId: string) {
    const isFav = await this.favoritosService.isFavorito(itemId);
    this.favorites[itemId] = isFav;
  }


  getTitulo(): string {

    const tipoCapitalizado =
      this.tipo === 'animal' ? 'Animales' : 'Plantas';
    return `Lista de ${tipoCapitalizado}`;
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
