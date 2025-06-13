// Folders for modular structure
// core/: singleton services (auth, interceptors, guards)
// shared/: shared components, pipes, directives, utilities
// features/auth/: login, register, JWT handling
// features/users/: user CRUD
// features/products/: product CRUD
// features/categories/: category CRUD
// layout/: main layout, navigation, header, footer
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Portfolio-Angular';
}
