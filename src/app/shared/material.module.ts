import {NgModule}                      from '@angular/core';
import { MatToolbarModule }            from '@angular/material/toolbar';
import {MatCardModule}                 from '@angular/material/card';
import {MatListModule}                 from '@angular/material/list';
import {MatButtonModule}               from '@angular/material/button';
import {MatIconModule}                 from '@angular/material/icon';
import {MatFormFieldModule}            from '@angular/material/form-field';
import {MatInputModule}                from '@angular/material/input';
import {MatCheckboxModule}             from '@angular/material/checkbox';
import {MatProgressSpinnerModule}      from '@angular/material/progress-spinner';
import {MatGridListModule}             from '@angular/material/grid-list';
import {MatSelectModule}               from '@angular/material/select';
import {MatTableModule}                from '@angular/material/table';
import {MatSortModule}                 from '@angular/material/sort';
import {MatBadgeModule}                from '@angular/material/badge';


@NgModule({
    exports:[
        MatToolbarModule,
        MatCardModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        MatBadgeModule
    ]
})

export class MaterialModule {}