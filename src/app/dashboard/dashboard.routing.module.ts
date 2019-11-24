import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../services/user.guard';

// COMPONENTES

import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';

const dashboardRoutes: Routes = [
    {
        path: 'dashboard', component: MainComponent, canActivate: [UserGuard], children: [
            { path: '', component: ListComponent },
            { path: 'my-topics', component: ListComponent },
            { path: 'create-topic', component: AddComponent },
            { path: 'edit-topic/:id', component: EditComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class DashboardRoutingModule { }