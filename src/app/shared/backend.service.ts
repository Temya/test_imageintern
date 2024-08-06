import { Injectable, inject } from "@angular/core";
import { AuthService } from "../cook-quiz/shared/utils/auth.service";
import { ImagesService } from "../images/shared/utils/images.service";




@Injectable({
  providedIn: "root",
})
export class BackendService {

  public readonly images = inject(ImagesService);
  public readonly auth = inject(AuthService);

}
