import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
 
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar {}