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
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


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
        MatDialogModule, 
        MatSelectModule, 
        MatDividerModule, 
        MatDatepickerModule, 
        MatNativeDateModule,
        MatMenuModule, 
        MatRippleModule, 
        MatProgressSpinnerModule
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
        MatDialogModule, 
        MatSelectModule, 
        MatDividerModule, 
        MatDatepickerModule, 
        MatNativeDateModule, 
        MatMenuModule, 
        MatRippleModule, 
        MatProgressSpinnerModule
    ]
})
export class MaterialModule {}