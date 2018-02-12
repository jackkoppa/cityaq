type LocalStorageKey = 'favorites'

export interface LocalStorage extends Storage {
    getItem(key: LocalStorageKey): string;
    removeItem(key: LocalStorageKey): void;
    setItem(key: LocalStorageKey, data: string): void;
}

type SessionStorageKey = 'newSession'

export interface SessionStorage extends Storage {
    getItem(key: SessionStorageKey): string;
    removeItem(key: SessionStorageKey): void;
    setItem(key: SessionStorageKey, data: string): void;
}

