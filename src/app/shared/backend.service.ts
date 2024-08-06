import { Injectable, inject } from "@angular/core";
import { ImagesService } from "../images/shared/utils/images.service";
import { AuthApiService } from "../cook-quiz/shared/utils/auth-api.service";
import { QuizSettingsService } from "../cook-quiz/shared/utils/quiz-settings.service";

@Injectable({
  providedIn: "root",
})
export class BackendService {
  public readonly images = inject(ImagesService);
  public readonly auth = inject(AuthApiService);
  public readonly quiz = inject(QuizSettingsService);
}
