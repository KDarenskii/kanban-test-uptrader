class LocalStorageService {
    static save = (key: string, data: unknown) => {
        localStorage.setItem(key, JSON.stringify(data));
    };
    static get = <T>(key: string): T | null => {
        const item = localStorage.getItem(key);

        return item ? (JSON.parse(item) as T) : null;
    };
}

export default LocalStorageService;
