import { Component, Input } from '@angular/core';
import { Training } from 'src/app/model/training.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  @Input() training: Training | undefined;
}
