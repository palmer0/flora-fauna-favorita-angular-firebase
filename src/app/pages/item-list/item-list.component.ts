import {Component, inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../../models/item.model';
import {ItemListService} from '../../services/item-list.service';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

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
export class ItemListComponent implements OnInit {

  private itemListService = inject(ItemListService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  tipo: 'animal' | 'planta' = 'animal';
  items$!: Observable<Item[]>;

  /*
  constructor(
    private itemListService: ItemListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  */

  ngOnInit() {
    this.tipo = this.route.snapshot.paramMap.get('tipo') as 'animal' | 'planta';
    this.items$ = this.itemListService.getItemsByTipo(this.tipo);
  }


  openDetail(itemId: string) {
    this.itemListService.incrementElegido(itemId).then(() => {
      this.router.navigate(['/item-detail', itemId]);

    }).catch(error => {
      console.error('Error al incrementar votos:', error);
      this.router.navigate(['/item-detail', itemId]);
    });
  }

  addNewItem() {
    //this.router.navigate(['/item-form', { tipo: this.tipo }]);
    this.router.navigate(['/item-form', this.tipo]);
  }

}
