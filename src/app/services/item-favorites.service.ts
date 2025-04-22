import {inject, Injectable} from '@angular/core';
import {collection, collectionData, deleteDoc, doc, Firestore, getDoc, setDoc} from '@angular/fire/firestore';
import {Item} from '../models/item.model';
import {Observable} from 'rxjs';
import {UserAuthService} from "./user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class ItemFavoritesService {

  private firestore = inject(Firestore);
  private authService = inject(UserAuthService);

  /*
  constructor(
    private firestore: Firestore,
    private authService: UserAuthService
  ) {}
  */

  private getUserId(): string {
    const user = this.authService.getCurrentUser();
    if (!user) throw new Error('Usuario no logeado');
    return user.uid;
  }

  private getFavoritosCollectionRef() {
    const userId = this.getUserId();
    return collection(this.firestore, `users/${userId}/favoritos`);
  }

  addFavorito(item: Item): Promise<void> {
    const favoritosRef =
      doc(this.firestore, `users/${this.getUserId()}/favoritos/${item.id}`);
    return setDoc(favoritosRef, {
      nombre: item.nombre,
      tipo: item.tipo,
      imagenUrl: item.imagenUrl,
      fecha: Date.now()
    });
  }

  removeFavorito(itemId: string): Promise<void> {
    const favoritoRef =
      doc(this.firestore, `users/${this.getUserId()}/favoritos/${itemId}`);
    return deleteDoc(favoritoRef);
  }

  isFavorito(itemId: string): Promise<boolean> {
    const favoritoRef =
      doc(this.firestore, `users/${this.getUserId()}/favoritos/${itemId}`);
    return getDoc(favoritoRef).then(snapshot => snapshot.exists());
  }

  getMisFavoritos(): Observable<any[]> {
    const favoritosRef = this.getFavoritosCollectionRef();
    return collectionData(favoritosRef, { idField: 'id' });
  }
}
