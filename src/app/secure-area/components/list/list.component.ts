import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';

@Component({
  selector: 'ar-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.initialize();
  }

  private initialize(): void {
    this.document.title = 'Secure Area';
  }
}
