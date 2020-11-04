import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { SecureAreaRoutingModule } from './secure-area-routing.module';

@NgModule({
  declarations: [ListComponent, ListItemComponent],
  imports: [CommonModule, SecureAreaRoutingModule],
})
export class SecureAreaModule {}
