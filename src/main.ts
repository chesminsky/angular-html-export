import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import mock from 'xhr-mock';

if (environment.production) {
  enableProdMode();
}

const w = window as any;

if (w.offlineData) {
  mock.setup();

  const { svg } = w.offlineData;

  mock.get('./assets/sprite.svg', {
    body: svg,
  });
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
