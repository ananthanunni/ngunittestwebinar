import { DOCUMENT } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Color } from '../../services/color';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'ar-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  isLoading: boolean;
  colors$: Observable<Color[]>;
  selectedColor: Color;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private changeDetector: ChangeDetectorRef,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  private initialize(): void {
    this.document.title = 'Secure Area';

    this.getColors();
  }

  getColors(): void {
    this.isLoading = true;

    this.colors$ = this.colorService.getColors$().pipe(
      finalize(() => {
        this.isLoading = false;
        this.changeDetector.markForCheck();
      })
    );
  }
}
