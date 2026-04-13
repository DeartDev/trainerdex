const Helpers = {
    capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    capitalizeWords(str) {
        if (!str) return '';
        return str.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    },

    getTypeColor(type) {
        const colors = {
            normal: '#A8A878',
            fire: '#F08030',
            water: '#6890F0',
            electric: '#F8D030',
            grass: '#78C850',
            ice: '#98D8D8',
            fighting: '#C03028',
            poison: '#A040A0',
            ground: '#E0C068',
            flying: '#A890F0',
            psychic: '#F85888',
            bug: '#A8B820',
            rock: '#B8A038',
            ghost: '#705898',
            dragon: '#7038F8',
            dark: '#705848',
            steel: '#B8B8D0',
            fairy: '#EE99AC'
        };
        return colors[type] || '#A8A878';
    },

    formatStatName(statKey) {
        const names = {
            hp: 'PS',
            attack: 'Ataque',
            defense: 'Defensa',
            sp_atk: 'At. Esp.',
            sp_def: 'Def. Esp.',
            speed: 'Velocidad'
        };
        return names[statKey] || statKey;
    },

    getStatBarWidth(value, max = 255) {
        return Math.min((value / max) * 100, 100);
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    showElement(element) {
        if (element) element.classList.remove('hidden');
    },

    hideElement(element) {
        if (element) element.classList.add('hidden');
    },

    clearChildren(element) {
        if (element) element.innerHTML = '';
    }
};

window.Helpers = Helpers;
