import { BehaviorSubject } from 'rxjs';

/** чтобы не забыть как называется какое-то поле, пользоваться только этим типом */
export type LSInstances =
  'AuthenticateToken' |
  'User' |
  'CurrentUser' |
  'Phone' |
  'RoleId' |
  'AuthTime' |
  'AuthCountToday' |
  'EsiaPersonalData' |
  'PermissionSignature' |
  'Permission';

const LS_CHANGES$ = new BehaviorSubject<{
  key: LSInstances,
  data: any
}>(null);

export const localStorageChages$ = LS_CHANGES$.asObservable();

export function getFromLocalStorage<T>(key: LSInstances): T {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (e) {
    return value as any;
  }
}

export function removeFromLocalStorage(key: LSInstances | LSInstances[]) {
  const keyArr = Array.isArray(key) ? key : [key];
  keyArr.forEach(keyName => {
    localStorage.removeItem(keyName);
    LS_CHANGES$.next({ key: keyName, data: null });
  });
}

export function setToLocalStorage(key: LSInstances, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    localStorage.setItem(key, data);
  }
  LS_CHANGES$.next({ key, data });
}

export function clearLocalStorage() {
  localStorage.clear();
}
