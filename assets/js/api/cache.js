const CACHE_KEYS = {
    POKEMON: 'trainerdex_pokemon_',
    NATURES: 'trainerdex_natures_',
    RECENT: 'trainerdex_recent'
};

const CACHE_DURATION = 24 * 60 * 60 * 1000;

const Cache = {
    set(key, data) {
        const item = {
            data,
            timestamp: Date.now()
        };
        localStorage.setItem(key, JSON.stringify(item));
    },

    get(key) {
        const item = localStorage.getItem(key);
        if (!item) return null;

        const parsed = JSON.parse(item);
        if (Date.now() - parsed.timestamp > CACHE_DURATION) {
            localStorage.removeItem(key);
            return null;
        }
        return parsed.data;
    },

    getPokemon(name) {
        return this.get(CACHE_KEYS.POKEMON + name.toLowerCase());
    },

    setPokemon(name, data) {
        this.set(CACHE_KEYS.POKEMON + name.toLowerCase(), data);
    },

    getRecentSearches() {
        return this.get(CACHE_KEYS.RECENT) || [];
    },

    addRecentSearch(name) {
        let recent = this.getRecentSearches();
        recent = recent.filter(n => n.toLowerCase() !== name.toLowerCase());
        recent.unshift(name);
        recent = recent.slice(0, 5);
        this.set(CACHE_KEYS.RECENT, recent);
    },

    clear() {
        Object.values(CACHE_KEYS).forEach(key => {
            const keys = Object.keys(localStorage).filter(k => k.startsWith(key.replace('_', '_')));
            keys.forEach(k => localStorage.removeItem(k));
        });
    }
};

window.Cache = Cache;
