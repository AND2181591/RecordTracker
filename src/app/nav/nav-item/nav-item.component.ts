import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent implements OnInit {
  @Input() icon: string = "";
  @Input() itemHeader: string = "";
  @Input() link: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
