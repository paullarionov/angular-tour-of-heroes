import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeroesComponent} from './heroes/heroes.component';
import {RouterModule, Routes} from '@angular/router';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {TradersComponent} from './traders/traders.component';
import {MarketComponent} from './market/market.component';
import {TraderDetailsComponent} from './trader-details/trader-details.component';

const routes: Routes = [
  {path: 'dashboard', component: MarketComponent},
  {path: 'traders', component: TradersComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'traders/details/:name', component: TraderDetailsComponent},


  {path: 'heroes', component: HeroesComponent},
  { path: 'detail/:id', component: HeroDetailComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
