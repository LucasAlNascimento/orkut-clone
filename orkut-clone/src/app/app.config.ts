import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC22APvXuAqhOyahQUrs6WUOhZTvTlrkv0",
  authDomain: "clone-2f4b9.firebaseapp.com",
  projectId: "clone-2f4b9",
  storageBucket: "clone-2f4b9.appspot.com",
  messagingSenderId: "632642563817",
  appId: "1:632642563817:web:a8758743e8d7107e7a0a78"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
  ]
};
