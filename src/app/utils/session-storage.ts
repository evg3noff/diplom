import { BehaviorSubject } from 'rxjs';

/** чтобы не забыть как называется какое-то поле, пользоваться только этим типом */
export type LSInstances =
  'User'
;

const LS_CHANGES$ = new BehaviorSubject<{
  key: LSInstances,
  data: any
}>(null);

export const SessionStorageChages$ = LS_CHANGES$.asObservable();

export function getFromSessionStorage<T>(key: LSInstances): T {
  const value = sessionStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (e) {
    return value as any;
  }
}

export function removeFromSessionStorage(key: LSInstances | LSInstances[]) {
  const keyArr = Array.isArray(key) ? key : [key];
  keyArr.forEach(keyName => {
    sessionStorage.removeItem(keyName);
    LS_CHANGES$.next({ key: keyName, data: null });
  });
}

export function setToSessionStorage(key: LSInstances, data: any): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    sessionStorage.setItem(key, data);
  }
  LS_CHANGES$.next({ key, data });
}

export function clearSessionStorage() {
  sessionStorage.clear();
}
