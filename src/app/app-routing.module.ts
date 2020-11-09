import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokeloaderComponent } from './pokeloader/pokeloader.component';
import { PokemonPanelComponent } from './pokemon-panel/pokemon-panel.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'main', component: PokeloaderComponent, data: { animation: 'list' } },
  { path: 'pokemon/:name', component: PokemonPanelComponent, data: { animation: 'detail' }  },
  { path: '',   redirectTo: '/main', pathMatch: 'full' },
  { path: 'not-found', component: NotFoundComponent},
  { path: '**', redirectTo: '/not-found' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
