import { 
  Component, 
  ElementRef, 
  EventEmitter, 
  Input, 
  Output, 
  ViewChild 
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { Artist } from '../models/Artist';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() control: FormControl | any;
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() placeholder: string = '';

  @Input() options: Artist[] = [];

  @ViewChild("input") input: ElementRef<HTMLInputElement> = {} as ElementRef;
  @Output() selection = new EventEmitter();

  
  constructor() {
  }

  onSelect(select: Artist) {
    this.input.nativeElement.value = "";
    this.input.nativeElement.blur();
    this.selection.emit(select);
  }
}
