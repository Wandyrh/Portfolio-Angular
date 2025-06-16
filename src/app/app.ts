import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected title = 'Portfolio-Angular';
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');    
    this.translate.use('en');
  }
}
