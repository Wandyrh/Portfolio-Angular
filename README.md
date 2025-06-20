# Portfolio Angular Demo

A demonstration project for the portfolio of **Wandy Rodríguez**. This Angular application showcases best practices in modular architecture, clean code, and integration with a RESTful API.
---
![imagen](https://github.com/user-attachments/assets/b5c14ba7-dd42-46ff-b66f-34c7a0855c2b)
![imagen](https://github.com/user-attachments/assets/be4edd57-52d8-4e45-979b-6d886d55c13b)
![imagen](https://github.com/user-attachments/assets/c615648f-ee0e-480a-9a75-895a788066eb)
![imagen](https://github.com/user-attachments/assets/e391c3d8-9560-4a78-b4a2-d6a55e2664fb)

---

## Technologies Used

- **Angular 20+** (standalone components, new control flow)
- **TypeScript**
- **Bootstrap 5** (UI and layout)
- **Angular Material** (dialogs, form controls)
- **RxJS** (reactive programming)
- **SCSS** (custom styles)
- **Icons:** Bootstrap Icons

## Project Architecture

- **Feature-based structure:** Each domain (users, products, product-categories, auth) is organized in its own folder under `src/app/features/`.
- **Standalone Components:** Modern Angular approach, no NgModules.
- **DTOs:** Data Transfer Objects for type safety and API integration.
- **Services:** For API communication and business logic.
- **Dialogs:** For CRUD operations using Angular Material dialogs.
- **Routing:** Configured in `src/app/app.routes.ts` with lazy loading.
- **Environment configuration:** API URL and other settings in `src/environments/environment.ts`.

## Main Libraries

- `@angular/core`, `@angular/router`, `@angular/forms`
- `@angular/material`
- `bootstrap`
- `rxjs`
- `bootstrap-icons`

## API Endpoints Used

The app communicates with a backend API. Main endpoints:

- **Authentication:** `POST /Authentication/login`
- **Users:** `GET /Users/paged`, `POST /Users`, `PUT /Users/{id}`, `DELETE /Users/{id}`
- **Product Categories:** `GET /ProductCategories`, `GET /ProductCategories/paged`, `POST /ProductCategories`, `PUT /ProductCategories/{id}`, `DELETE /ProductCategories/{id}`
- **Products:** `GET /Products`, `GET /Products/paged`, `POST /Products`, `PUT /Products/{id}`, `DELETE /Products/{id}`

## Environment Configuration

Set your API base URL in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://your-api-url.com'
};
```

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Wandyrh/Portfolio-Angular.git
   cd Portfolio-Angular
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   - Edit `src/environments/environment.ts` and set `apiUrl` to your backend API.

4. **Run the app:**
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

5. **Access the app:**
   - Open [http://localhost:4200](http://localhost:4200) in your browser.

## Backend API

This Angular frontend consumes a backend API built with **.NET 8** using **Clean Architecture**.
You can find the backend source code here:
[https://github.com/Wandyrh/Clean-Architecture-Dot-Net](https://github.com/Wandyrh/Clean-Architecture-Dot-Net)

## Features

- **Authentication:** Login with backend validation.
- **User Management:** CRUD for users.
- **Product Categories:** CRUD for product categories.
- **Products:** CRUD for products, with category selection.
- **Responsive UI:** Bootstrap-based, mobile-friendly.
- **Dialogs:** Angular Material dialogs for create/edit forms.
- **Pagination:** Server-side pagination for lists.
- **Validation:** All forms with required field validation.

## Internationalization (i18n)

- Full support for English and Spanish throughout the application.
- Language selector available in the header, with instant language switching.
- All menus, views, forms, dialogs, alerts, and confirmation messages are translated.
- The selected language is saved in localStorage and automatically restored on page reload.
- Translation files:
  - `src/assets/i18n/en.json`
  - `src/assets/i18n/es.json`

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Author

Wandy Rodríguez

## License

[MIT](LICENSE)
