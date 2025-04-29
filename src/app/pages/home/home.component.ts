import {Component, inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../../models/item.model';
import {ItemListService} from '../../services/item-list.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ItemFavoritesService} from '../../services/item-favorites.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private itemService = inject(ItemListService);
  private router = inject(Router);

  items$!: Observable<Item[]>;


  ngOnInit() {
    this.items$ = this.itemService.getMostChosenItems(5);
  }



  openDetail(id: string) {
    this.router.navigate(['/item-detail', id]);
  }
}
