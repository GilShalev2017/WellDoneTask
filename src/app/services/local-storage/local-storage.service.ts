import { Injectable } from '@angular/core';

// @Injectable()
export class LocalStorageService {

    saveToStorage(storageKey: string, stringifyObject: string) {
        localStorage.setItem(storageKey, stringifyObject);
    }

    removeStorage(storageKey: string) {
        localStorage.removeItem(storageKey);
    }

    getFromStorage(storageKey: string): string {
        return localStorage.getItem(storageKey);
    }
}
