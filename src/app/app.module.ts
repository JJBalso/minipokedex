import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { L10nLoader, TranslationModule } from 'angular-l10n';
import { HttpClientModule } from '@angular/common/http';

import { LoggerModule } from 'ngx-logger';
import { NotificationModule } from '@progress/kendo-angular-notification';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { l10nConfig } from './lib/l10n-config';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Material Libraries
import { MatToolbarModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


//Components
import { PokeloaderComponent } from './pokeloader/pokeloader.component';
import { MinipokedexComponent } from './minipokedex/minipokedex.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PokemonPanelComponent } from './pokemon-panel/pokemon-panel.component';

//Services
import { PokemonService } from './services/pokemon.service';

@NgModule({
  declarations: [
    AppComponent,
    MinipokedexComponent,
    NotFoundComponent,
    PokeloaderComponent,    
    PokemonPanelComponent
  ],
  imports: [
    FormsModule,
    TranslationModule.forRoot(l10nConfig),
    BrowserModule,
    AppRoutingModule,
    LoggerModule.forRoot({
      disableConsoleLogging: false,
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel
    }),
    NotificationModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private l10nLoader: L10nLoader) {
    this.l10nLoader.load();
  }
}
