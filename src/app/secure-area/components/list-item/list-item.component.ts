import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { Color } from '../../services/color';

@Component({
  selector: 'ar-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  @Input() color: Color;
  @Input() selectedColor: Color;

  @Output() select = new EventEmitter<Color>();
}
