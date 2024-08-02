import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { routes } from "./app.routes";
import { loginInterceptor } from "./core/auth/login.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(TuiRootModule),
    provideHttpClient(withFetch(), withInterceptors([loginInterceptor])),
  ],
};
