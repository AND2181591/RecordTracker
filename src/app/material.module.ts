import { NgModule } from "@angular/core";

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatButtonModule, 
        MatToolbarModule, 
        MatIconModule, 
        MatSidenavModule, 
        MatListModule, 
        MatAutocompleteModule, 
        MatCardModule, 
        MatDialogModule
    ], 
    exports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatButtonModule, 
        MatToolbarModule, 
        MatIconModule, 
        MatSidenavModule, 
        MatListModule, 
        MatAutocompleteModule, 
        MatCardModule, 
        MatDialogModule
    ]
})
export class MaterialModule {}