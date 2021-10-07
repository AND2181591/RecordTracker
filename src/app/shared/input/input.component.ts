import { 
  Component, 
  ElementRef, 
  EventEmitter, 
  Input, 
  OnInit, 
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
export class InputComponent implements OnInit {
  @Input() control: FormControl | any;
  @Input() controlName: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = '';
  @Input() options: Artist[] = [];

  @ViewChild("search") search: ElementRef<HTMLInputElement> = {} as ElementRef;
  @Output() selection = new EventEmitter();

  
  constructor() {
  }

  ngOnInit(): void {
  }

  onSelect(select: Artist) {
    this.search.nativeElement.value = "";
    this.search.nativeElement.blur();
    this.selection.emit(select);
  }

  showErrors() {
    const { touched, dirty, errors, passwordsDontMatch } = this.control;
    return touched && dirty && errors && passwordsDontMatch;
  }

}
