const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

const PokeAPI = {
    async getPokemon(nameOrId) {
        const response = await fetch(`${POKEAPI_BASE}/pokemon/${nameOrId.toString().toLowerCase()}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Pokémon no encontrado');
            }
            throw new Error('Error al cargar los datos');
        }
        
        const data = await response.json();
        return this.normalizePokemonData(data);
    },

    normalizePokemonData(data) {
        return {
            id: data.id,
            name: data.name,
            sprite: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
            types: data.types.map(t => t.type.name),
            stats: this.extractStats(data.stats),
            baseStats: this.extractBaseStats(data.stats),
            height: data.height,
            weight: data.weight,
            abilities: data.abilities.map(a => a.ability.name),
            moves: data.moves.length
        };
    },

    extractStats(statsArray) {
        const statMap = {
            'hp': 'hp',
            'attack': 'attack',
            'defense': 'defense',
            'special-attack': 'sp_atk',
            'special-defense': 'sp_def',
            'speed': 'speed'
        };

        const stats = {};
        statsArray.forEach(stat => {
            const key = statMap[stat.stat.name];
            if (key) {
                stats[key] = {
                    base: stat.base_stat,
                    effort: stat.effort
                };
            }
        });

        return stats;
    },

    extractBaseStats(statsArray) {
        const statMap = {
            'hp': 'hp',
            'attack': 'attack',
            'defense': 'defense',
            'special-attack': 'sp_atk',
            'special-defense': 'sp_def',
            'speed': 'speed'
        };

        const baseStats = {};
        statsArray.forEach(stat => {
            const key = statMap[stat.stat.name];
            if (key) {
                baseStats[key] = stat.base_stat;
            }
        });

        return baseStats;
    },

    async getNature(nameOrId) {
        const response = await fetch(`${POKEAPI_BASE}/nature/${nameOrId}`);
        
        if (!response.ok) {
            return null;
        }
        
        const data = await response.json();
        return {
            name: data.name,
            increasedStat: data.increased_stat?.name || null,
            decreasedStat: data.decreased_stat?.name || null,
            likedFlavor: data.liked_flavor?.name || null,
            dislikedFlavor: data.disliked_flavor?.name || null
        };
    },

    async searchPokemon(query) {
        const response = await fetch(`${POKEAPI_BASE}/pokemon?limit=1000`);
        
        if (!response.ok) {
            throw new Error('Error al buscar');
        }
        
        const data = await response.json();
        const results = data.results.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase())
        );
        
        return results.slice(0, 10).map(p => ({
            name: p.name,
            url: p.url
        }));
    }
};

window.PokeAPI = PokeAPI;
