import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocaleService, TranslationService, Language } from 'angular-l10n';
import { RouterOutlet } from '@angular/router';
import { fader } from './route-animations' 

/**
 * Main component of the App
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fader]
})
export class AppComponent implements OnInit, OnDestroy{
  /** 
   * Name of the App
   */
  title = 'PokemonWebUI';
  /** 
   * @ignore
   */
  @Language() lang: string | undefined;

  /** 
   * @ignore
   */
  constructor(public locale: LocaleService, public translation: TranslationService){
    
  }

  /** 
   * @ignore
   */
  ngOnInit(){ }

  /** 
   * @ignore
   */
  ngOnDestroy(){}
  
  /** 
   * Detects the route to perform animation
   */
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  /** 
   * Changes the default language of the App
   */
  selectLocale(language: string): void {
    this.locale.setDefaultLocale(language);
}

}
