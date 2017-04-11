import { CommonModule } from '@angular/common';
import { DropdownMenuComponent, DropdownCloseDirective } from './dropdown-menu.component';
import { NgModule } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export * from './dropdown-menu.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        DropdownMenuComponent,
        DropdownCloseDirective
    ],
    exports: [
        DropdownMenuComponent,
        DropdownCloseDirective
    ],
    entryComponents: [
        DropdownMenuComponent
    ]
})
export class DropdownMenuModule {

}
