import {Component, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../../models/item.model';
import {ItemListService} from '../../services/item-list.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private itemService = inject(ItemListService);
  private router = inject(Router);

  items$!: Observable<Item[]>;

  /*
  constructor(
    private itemService: ItemListService,
    private router: Router
  ) {}
  */

  ngOnInit() {
    this.items$ = this.itemService.getMostChosenItems(5);
  }

  openDetail(id: string) {
    this.router.navigate(['/item-detail', id]);
  }
}
