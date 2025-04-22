import {Component, inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../../models/item.model';
import {User} from '@angular/fire/auth';
import {ActivatedRoute} from '@angular/router';
import {ItemFavoritesService} from '../../services/item-favorites.service';
import {UserAuthService} from '../../services/user-auth.service';
import {ItemListService} from '../../services/item-list.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-item-detail',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent  implements OnInit {

  private route = inject(ActivatedRoute);
  private favoritosService = inject(ItemFavoritesService);
  private authService = inject(UserAuthService);
  private itemListService = inject(ItemListService);


  item$!: Observable<Item>;
  itemId!: string;
  isFavorito = false;
  user: User | null = null;

  /*
  constructor(
    private route: ActivatedRoute,
    private favoritosService: ItemFavoritesService,
    private authService: UserAuthService,
    private itemListService: ItemListService
  ) {}
  */


  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id')!;
    this.item$ = this.itemListService.getItemById(this.itemId);

    this.authService.currentUser$.subscribe(user => {
      this.user = user;

      // Solo consultar favoritos si está logeado
      if (user) {
        this.favoritosService.isFavorito(this.itemId).then(result => {
          this.isFavorito = result;
        });
      }
    });
  }

  async toggleFavorito(item: Item) {
    if (!this.user) return;

    if (this.isFavorito) {
      await this.favoritosService.removeFavorito(item.id!);

    } else {
      await this.favoritosService.addFavorito(item);
    }

    this.isFavorito = !this.isFavorito;
  }

}
