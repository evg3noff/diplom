import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { getFromSessionStorage } from "../utils/session-storage";

export const likesGuard = (route: ActivatedRouteSnapshot) => {
  const flagUser: boolean = !!getFromSessionStorage('User');
  const urlParamLast = route.params['GoodsCategory'];
  const isLike: boolean = urlParamLast === 'likes' ? true : false;
  const router = inject(Router);

  if(!flagUser && isLike) return router.createUrlTree(['/auth']);

  return true;
};


export const defaultGuard = () => {
  const flagUser: boolean = !!getFromSessionStorage('User');
  const router = inject(Router);

  if(flagUser) {
    return true;
  } else {
    return router.createUrlTree(['/auth']);
  }
}