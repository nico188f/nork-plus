const localStorageMemberIdKey = "memberId";
const localStorageNameKey = "name";
const localStorageAuthTokenKey = "authToken";

export function setLocalStorageMemberId(memberId: number) {
   localStorage.setItem(localStorageMemberIdKey, memberId.toString());
}

export function getLocalStorageMemberId() {
   const memberId = localStorage.getItem(localStorageMemberIdKey);
   return memberId ? parseInt(memberId) : null;
}

export function setLocalStorageName(name: string) {
   localStorage.setItem(localStorageNameKey, name);
}

export function getLocalStorageName() {
   return localStorage.getItem(localStorageNameKey);
}

export function setLocalStorageAuthToken(authToken: string) {
   localStorage.setItem(localStorageAuthTokenKey, authToken);
}

export function getLocalStorageAuthToken() {
   return localStorage.getItem(localStorageAuthTokenKey);
}
