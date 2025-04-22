import {Injectable} from '@angular/core';
import {getDownloadURL, ref, Storage, uploadBytes} from '@angular/fire/storage';
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private storage: Storage) {}

  async uploadImage(file: File, folder = 'items'): Promise<string> {
    const filePath = `${folder}/${uuidv4()}`;
    const storageRef = ref(this.storage, filePath);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }
}
