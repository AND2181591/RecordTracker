import { NgModule } from "@angular/core";

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatButtonModule, 
        MatToolbarModule, 
        MatIconModule, 
        MatSidenavModule, 
        MatListModule, 
        MatAutocompleteModule
    ], 
    exports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatButtonModule, 
        MatToolbarModule, 
        MatIconModule, 
        MatSidenavModule, 
        MatListModule, 
        MatAutocompleteModule
    ]
})
export class MaterialModule {}