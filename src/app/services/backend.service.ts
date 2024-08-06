import { Injectable, inject } from "@angular/core";
import { UserData } from "../interfaces/userdata";
import { ImagesService } from "../core/images/images.service";
import { AuthService } from "../core/auth/auth.service";


@Injectable({
  providedIn: "root",
})
export class BackendService {
  public user?: UserData;

  public readonly images = inject(ImagesService);
  public readonly auth = inject(AuthService);

}
