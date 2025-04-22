import {Component, inject, OnInit} from '@angular/core';
import {Item} from '../../models/item.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemListService} from '../../services/item-list.service';
import {ImageUploadService} from '../../services/image-upload.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-item-form',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css'
})
export class ItemFormComponent implements OnInit {

  private itemListService = inject(ItemListService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private uploadService = inject(ImageUploadService);

  item: Item = {
    nombre: '',
    descripcion: '',
    imagenUrl: '',
    tipo: 'animal',
  };

  isEditMode = false;
  id: string | null = null;
  uploading = false;

  /*
  constructor(
    private route: ActivatedRoute,
    private itemListService: ItemListService,
    private router: Router,
    private uploadService: ImageUploadService,
  ) {}
  */


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    const tipoParam = this.route.snapshot.paramMap.get('tipo');

    if (this.id) {
      this.isEditMode = true;
      this.itemListService.getItemById(this.id).subscribe((data) => {
        this.item = data;
      });

    } else if (tipoParam === 'animal' || tipoParam === 'planta') {
      this.item.tipo = tipoParam;
    }
  }

  async onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.uploading = true;

    try {
      const url = await this.uploadService.uploadImage(file);
      this.item.imagenUrl = url;

    } catch (err) {
      console.error('Error al subir imagen:', err);
    } finally {
      this.uploading = false;
    }
  }

  saveItem() {
    if (this.isEditMode && this.id) {
      this.itemListService.updateItem(this.id, this.item).then(() => {
        this.router.navigate(['/item-list', this.item.tipo]);
      });

    } else {
      this.itemListService.addItem(this.item).then(() => {
        this.router.navigate(['/item-list', this.item.tipo]);
      });
    }
  }

  getTitulo(): string {
    const tipoCapitalizado =
      this.item.tipo.charAt(0).toUpperCase() + this.item.tipo.slice(1);
    const prefijo =
      this.isEditMode ? 'Editar' : (this.item.tipo === 'animal' ? 'Nuevo' : 'Nueva');

    return `${prefijo} ${tipoCapitalizado}`;
  }


}
