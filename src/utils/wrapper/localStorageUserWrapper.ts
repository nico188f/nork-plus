import type { Profile } from "@/models/Profile";

const localStorageMemberIdKey = "memberId";
const localStorageNameKey = "name";
const localStorageAuthTokenKey = "authToken";

export function setLocalStorageUserMemberId(memberId: number) {
   localStorage.setItem(localStorageMemberIdKey, memberId.toString());
}

export function getLocalStorageUserMemberId() {
   const memberId = localStorage.getItem(localStorageMemberIdKey);
   return memberId ? parseInt(memberId) : null;
}

export function setLocalStorageUserName(name: string) {
   localStorage.setItem(localStorageNameKey, name);
}

export function getLocalStorageUserName() {
   return localStorage.getItem(localStorageNameKey);
}

export function setLocalStorageUserAuthToken(authToken: string) {
   localStorage.setItem(localStorageAuthTokenKey, authToken);
}

export function getLocalStorageUserAuthToken() {
   return localStorage.getItem(localStorageAuthTokenKey);
}

export function setLocalStorageProfile(profile: Profile) {
   setLocalStorageUserMemberId(profile.memberId);
   setLocalStorageUserName(profile.name);
   setLocalStorageUserAuthToken(profile.token);
}

export function clearLocalStorageUser() {
   localStorage.removeItem(localStorageMemberIdKey);
   localStorage.removeItem(localStorageNameKey);
   localStorage.removeItem(localStorageAuthTokenKey);
}
