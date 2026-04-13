const App = {
    currentPokemon: null,
    targetStats: {
        hp: 0, attack: 0, defense: 0,
        sp_atk: 0, sp_def: 0, speed: 0
    },

    init() {
        this.cache = window.Cache;
        this.bindEvents();
        this.loadTheme();
        this.loadRecentSearches();
    },

    bindEvents() {
        document.getElementById('search-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch();
        });

        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        document.getElementById('retry-btn').addEventListener('click', () => {
            this.handleSearch();
        });

        document.getElementById('generate-plan').addEventListener('click', () => {
            this.generatePlan();
        });
    },

    loadTheme() {
        const savedTheme = localStorage.getItem('trainerdex_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    },

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('trainerdex_theme', newTheme);
        this.updateThemeIcon(newTheme);
    },

    updateThemeIcon(theme) {
        const icon = document.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = theme === 'dark' ? '🌙' : '☀️';
        }
    },

    async handleSearch() {
        const searchInput = document.getElementById('pokemon-search');
        const query = searchInput.value.trim().toLowerCase();

        if (!query) return;

        this.showLoading();

        try {
            let pokemon = this.cache.getPokemon(query);

            if (!pokemon) {
                pokemon = await window.PokeAPI.getPokemon(query);
                this.cache.setPokemon(query, pokemon);
            }

            this.cache.addRecentSearch(pokemon.name);
            this.currentPokemon = pokemon;

            this.renderPokemonCard(pokemon);
            this.renderTrainingConfig(pokemon);
            this.renderRecentSearches();
            this.hideError();

        } catch (error) {
            this.showError(error.message);
        }
    },

    showLoading() {
        Helpers.hideElement(document.getElementById('pokemon-card'));
        Helpers.hideElement(document.getElementById('empty-state'));
        Helpers.hideElement(document.getElementById('error-message'));
        Helpers.showElement(document.getElementById('loading'));
    },

    hideLoading() {
        Helpers.hideElement(document.getElementById('loading'));
    },

    showError(message) {
        Helpers.hideElement(document.getElementById('loading'));
        Helpers.hideElement(document.getElementById('pokemon-card'));
        Helpers.hideElement(document.getElementById('empty-state'));
        
        const errorEl = document.getElementById('error-message');
        errorEl.querySelector('.error-text').textContent = message;
        Helpers.showElement(errorEl);
    },

    hideError() {
        Helpers.hideElement(document.getElementById('error-message'));
    },

    renderPokemonCard(pokemon) {
        this.hideLoading();
        Helpers.hideElement(document.getElementById('empty-state'));

        const card = document.getElementById('pokemon-card');
        Helpers.showElement(card);

        document.getElementById('pokemon-name').textContent = Helpers.capitalizeWords(pokemon.name);

        const typesContainer = document.getElementById('pokemon-types');
        typesContainer.innerHTML = pokemon.types.map(type => 
            `<span class="type-badge ${type}">${type}</span>`
        ).join('');

        document.getElementById('pokemon-sprite').src = pokemon.sprite;
        document.getElementById('pokemon-sprite').alt = pokemon.name;

        this.renderBaseStats(pokemon.baseStats);
        this.renderEvYield(pokemon.stats);
    },

    renderBaseStats(baseStats) {
        const container = document.getElementById('base-stats');
        container.innerHTML = '';

        Object.entries(baseStats).forEach(([stat, value]) => {
            const width = Helpers.getStatBarWidth(value);
            const row = document.createElement('div');
            row.className = 'stat-row';
            row.innerHTML = `
                <span class="stat-name">${Helpers.formatStatName(stat)}</span>
                <div class="stat-bar-container">
                    <div class="stat-bar" style="width: ${width}%"></div>
                </div>
                <span class="stat-value">${value}</span>
            `;
            container.appendChild(row);
        });
    },

    renderEvYield(stats) {
        const container = document.getElementById('ev-yield');
        container.innerHTML = '';

        Object.entries(stats).forEach(([stat, data]) => {
            const isActive = data.effort > 0;
            const item = document.createElement('div');
            item.className = `ev-yield-item ${isActive ? 'active' : ''}`;
            item.innerHTML = `
                <span class="ev-stat-name">${Helpers.formatStatName(stat)}</span>
                <span class="ev-yield-value">+${data.effort}</span>
                <span class="ev-yield-desc">${isActive ? `Otorga +${data.effort} EVs al derrotarlo` : 'No da EVs'}</span>
            `;
            container.appendChild(item);
        });
    },

    renderTrainingConfig(pokemon) {
        const configSection = document.getElementById('training-config');
        Helpers.showElement(configSection);

        this.resetTargetStats();
        this.renderStatInputs(pokemon);
        this.updateEvRemaining();
    },

    renderStatInputs(pokemon) {
        const container = document.getElementById('stats-inputs');
        container.innerHTML = '';

        Object.keys(this.targetStats).forEach(stat => {
            const evYield = pokemon.stats[stat]?.effort || 0;
            const group = document.createElement('div');
            group.className = 'stat-input-group';

            const statName = STAT_NAMES_ES[stat];
            const evYieldInfo = evYield > 0 ? ` (+${evYield}/KO)` : '';

            group.innerHTML = `
                <label for="stat-${stat}">${statName}${evYieldInfo}</label>
                <input 
                    type="number" 
                    id="stat-${stat}" 
                    min="0" 
                    max="252" 
                    value="0"
                    data-stat="${stat}"
                >
            `;

            const input = group.querySelector('input');
            input.addEventListener('input', (e) => this.handleStatInput(e, stat));

            container.appendChild(group);
        });
    },

    handleStatInput(event, stat) {
        let value = parseInt(event.target.value) || 0;
        
        if (value > 252) {
            value = 252;
            event.target.value = 252;
        }
        if (value < 0) {
            value = 0;
            event.target.value = 0;
        }

        this.targetStats[stat] = value;

        if (value === 252) {
            event.target.classList.add('max-ev');
        } else {
            event.target.classList.remove('max-ev');
        }

        this.updateEvRemaining();
    },

    resetTargetStats() {
        STAT_KEYS.forEach(stat => {
            this.targetStats[stat] = 0;
        });
    },

    updateEvRemaining() {
        const total = Calculator.calculateTotalEvs(this.targetStats);
        const remaining = MAX_TOTAL_EV - total;

        document.getElementById('ev-remaining').textContent = remaining;
        
        const generateBtn = document.getElementById('generate-plan');
        generateBtn.disabled = remaining < 0 || total === 0;

        if (remaining < 0) {
            document.getElementById('ev-remaining').style.color = 'var(--danger)';
        } else {
            document.getElementById('ev-remaining').style.color = remaining === 0 ? 'var(--success)' : 'var(--text-secondary)';
        }
    },

    generatePlan() {
        if (!this.currentPokemon) return;

        const errors = Calculator.validateEvs(this.targetStats);
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        const plan = Trainer.generatePlan(this.currentPokemon, this.targetStats, {
            useVitamins: true,
            usePowerItem: true
        });

        this.renderNatureRecommendation(plan.nature);
        this.renderTrainingPlan(plan);
        this.renderResetInfo(plan.reset);
    },

    renderNatureRecommendation(nature) {
        const section = document.getElementById('nature-section');
        
        if (!nature) {
            Helpers.hideElement(section);
            return;
        }

        Helpers.showElement(section);
        
        const container = document.getElementById('recommended-nature');
        container.innerHTML = `
            <div class="nature-card">
                <span class="nature-icon">${nature.icon}</span>
                <div class="nature-info">
                    <div class="nature-name">${nature.name}</div>
                    <div class="nature-effects">
                        <span class="nature-effect positive">↑ ${nature.statPlus}</span>
                        <span class="nature-effect negative">↓ ${nature.statMinus}</span>
                    </div>
                </div>
            </div>
        `;
    },

    renderTrainingPlan(plan) {
        const section = document.getElementById('training-plan');
        
        if (plan.steps.length === 0) {
            Helpers.hideElement(section);
            return;
        }

        Helpers.showElement(section);

        const container = document.getElementById('plan-steps');
        container.innerHTML = plan.steps.map(step => `
            <div class="plan-step">
                <span class="step-icon">${step.icon}</span>
                <div class="step-content">
                    <div class="step-title">${step.title}</div>
                    <div class="step-detail">${step.detail}</div>
                </div>
            </div>
        `).join('');
    },

    renderResetInfo(reset) {
        const section = document.getElementById('reset-section');
        
        if (reset.length === 0) {
            Helpers.hideElement(section);
            return;
        }

        Helpers.showElement(section);

        const container = document.getElementById('reset-info');
        container.innerHTML = reset.map(r => `
            <div class="reset-item">
                <span class="reset-icon">🍇</span>
                <div class="reset-text">
                    <span class="reset-stat">${STAT_NAMES_ES[r.stat]}</span>
                    <span class="reset-amount">-${r.reduce} EVs → ${r.berries}x ${r.berryName}</span>
                </div>
            </div>
        `).join('');
    },

    loadRecentSearches() {
        const recent = this.cache.getRecentSearches();
        
        if (recent.length > 0) {
            Helpers.showElement(document.getElementById('recent-searches'));
            this.renderRecentSearches();
        }
    },

    renderRecentSearches() {
        const recent = this.cache.getRecentSearches();
        const container = document.getElementById('recent-list');
        
        if (recent.length === 0) {
            Helpers.hideElement(document.getElementById('recent-searches'));
            return;
        }

        Helpers.showElement(document.getElementById('recent-searches'));
        
        container.innerHTML = recent.map(name => 
            `<li data-name="${name}">${Helpers.capitalizeWords(name)}</li>`
        ).join('');

        container.querySelectorAll('li').forEach(li => {
            li.addEventListener('click', () => {
                document.getElementById('pokemon-search').value = li.dataset.name;
                this.handleSearch();
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
