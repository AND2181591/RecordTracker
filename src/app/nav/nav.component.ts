import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn: boolean = false;
  @Output() close = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isUserData.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  onClose() {
    this.close.emit();
  }
}
