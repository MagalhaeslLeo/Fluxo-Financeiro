import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login.component";
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { LoginRoutingModule } from "./login.routing.module";
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';






@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        MatDividerModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        LoginRoutingModule,
        MatButtonModule,
        FlexLayoutModule
    ],
    providers: []
})

export class LoginModule {}