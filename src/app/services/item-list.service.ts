import {inject, Injectable} from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  limit,
  orderBy,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where
} from '@angular/fire/firestore';
import {Item} from '../models/item.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemListService {

  private firestore = inject(Firestore);
  private itemListRef = collection(this.firestore, 'items');

  /*
  private itemListRef = collection(this.firestore, 'items');

  constructor(private firestore: Firestore) {}
  */

  getAllItems(): Observable<Item[]> {
    return collectionData(this.itemListRef, { idField: 'id' }) as Observable<Item[]>;
  }

  getItemsByTipo(tipo: 'animal' | 'planta'): Observable<Item[]> {
    const q =
      query(this.itemListRef, where('tipo', '==', tipo));
    return collectionData(q, { idField: 'id' }) as Observable<Item[]>;
  }

  getItemById(id: string): Observable<Item> {
    const itemDoc = doc(this.firestore, `items/${id}`);
    return docData(itemDoc, { idField: 'id' }) as Observable<Item>;
  }

  addItem(item: Item): Promise<void> {
    const newItemRef = doc(collection(this.firestore, 'items'));
    item.fechaCreacion = Date.now();
    item.vecesElegido = 0;
    return setDoc(newItemRef, item);
  }

  updateItem(id: string, item: Partial<Item>): Promise<void> {
    const itemDoc = doc(this.firestore, `items/${id}`);
    return updateDoc(itemDoc, item);
  }

  deleteItem(id: string): Promise<void> {
    const itemDoc = doc(this.firestore, `items/${id}`);
    return deleteDoc(itemDoc);
  }

  getMostChosenItems(limitCount: number = 10): Observable<Item[]> {
    const q =
      query(this.itemListRef, orderBy('vecesElegido', 'desc'), limit(limitCount));
    return collectionData(q, { idField: 'id' }) as Observable<Item[]>;
  }


  incrementElegido(id: string): Promise<void> {
    const itemRef = doc(this.firestore, `items/${id}`);

    return runTransaction(this.firestore, async (transaction) => {
      const snapshot = await transaction.get(itemRef);
      if (!snapshot.exists()) {
        throw new Error('Item not found');
      }

      const data = snapshot.data() as Item;
      const nuevosVotos = (data.vecesElegido || 0) + 1;
      transaction.update(itemRef, { vecesElegido: nuevosVotos });
    });
  }
}
