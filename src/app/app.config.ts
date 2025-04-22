import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getStorage, provideStorage} from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      projectId: "favoritos-plantas-animales",
      appId: "1:820281706374:web:57dd51680ad61c10e50e07",
      storageBucket: "favoritos-plantas-animales.appspot.com",
      apiKey: "AIzaSyDJKY5qaT1WKT8mJ0XbYTN1QfylkURyLu4",
      authDomain: "favoritos-plantas-animales.firebaseapp.com",
      messagingSenderId: "820281706374"

    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ]
};
