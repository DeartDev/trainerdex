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
        this.renderDetailedTrainingPlan(plan);
        this.renderResetInfo(plan.reset);
        this.renderSummary(plan.summary);
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
                    <div class="nature-instructions">
                        <span class="instruction-label">Cómo cambiar:</span>
                        <span class="instruction-text">Usa Menta ${nature.name} en PC (₽1,000) - Casual Branch Mesagoza</span>
                    </div>
                </div>
            </div>
        `;
    },

    renderDetailedTrainingPlan(plan) {
        const section = document.getElementById('training-plan');
        
        if (plan.detailedSteps.length === 0) {
            Helpers.hideElement(section);
            return;
        }

        Helpers.showElement(section);

        const container = document.getElementById('plan-steps');
        container.innerHTML = '';

        plan.detailedSteps.forEach(step => {
            const stepEl = document.createElement('div');
            stepEl.className = 'detailed-step';
            
            if (step.type === 'reset') {
                stepEl.innerHTML = this.renderResetStep(step);
            } else if (step.type === 'powerItems') {
                stepEl.innerHTML = this.renderPowerItemsStep(step);
            } else if (step.type === 'vitamins') {
                stepEl.innerHTML = this.renderVitaminsStep(step);
            } else if (step.type === 'training') {
                stepEl.innerHTML = this.renderTrainingStep(step);
            } else if (step.type === 'nature') {
                stepEl.innerHTML = this.renderNatureStep(step);
            }

            container.appendChild(stepEl);
        });
    },

    renderResetStep(step) {
        return `
            <div class="step-section reset-section-style">
                <div class="step-header">
                    <span class="step-icon">${step.icon}</span>
                    <span class="step-title">${step.title}</span>
                </div>
                <p class="step-description">${step.description}</p>
                <div class="step-items">
                    ${step.items.map(item => `
                        <div class="detail-item">
                            <span class="item-stat">${item.stat}</span>
                            <span class="item-detail">${item.berries}x ${item.berryName}</span>
                            <span class="item-note">${item.note}</span>
                            <span class="item-locations">📍 ${item.locations}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="step-total">Total: ${step.totalBerries} berries necesarias</div>
            </div>
        `;
    },

    renderPowerItemsStep(step) {
        return `
            <div class="step-section power-items-style">
                <div class="step-header">
                    <span class="step-icon">${step.icon}</span>
                    <span class="step-title">${step.title}</span>
                </div>
                <p class="step-description">${step.description}</p>
                <div class="step-items">
                    ${step.items.map(item => `
                        <div class="detail-item">
                            <span class="item-stat">${item.stat}</span>
                            <span class="item-name">${item.name}</span>
                            <span class="item-bonus">${item.bonus}</span>
                            <span class="item-price">💰 ₽${item.price.toLocaleString()}</span>
                            <span class="item-locations">📍 ${item.locations}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="step-tip">💡 ${step.tip}</div>
            </div>
        `;
    },

    renderVitaminsStep(step) {
        return `
            <div class="step-section vitamins-style">
                <div class="step-header">
                    <span class="step-icon">${step.icon}</span>
                    <span class="step-title">${step.title}</span>
                </div>
                <p class="step-description">${step.description}</p>
                <div class="step-items">
                    ${step.items.map(item => `
                        <div class="detail-item">
                            <span class="item-stat">${item.stat}</span>
                            <span class="item-name">${item.count}x ${item.vitaminName}</span>
                            <span class="item-ev">+${item.evTotal} EVs</span>
                            <span class="item-price">💰 ₽${item.totalCost.toLocaleString()}</span>
                            <span class="item-locations">📍 ${item.locations}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="step-tip">💡 ${step.tip}</div>
                <div class="step-total">Costo total: ₽${step.totalCost.toLocaleString()}</div>
            </div>
        `;
    },

    renderTrainingStep(step) {
        return `
            <div class="step-section training-style">
                <div class="step-header">
                    <span class="step-icon">${step.icon}</span>
                    <span class="step-title">${step.title}</span>
                </div>
                <p class="step-description">${step.description}</p>
                ${step.items.map(item => `
                    <div class="training-stat-section">
                        <div class="training-stat-header">
                            <span class="stat-badge">${item.stat}</span>
                            <span class="target-evs">Objetivo: ${item.targetEvs} EVs</span>
                        </div>
                        
                        <div class="ev-breakdown">
                            <span class="ev-from-vitamins">💊 Vitamins: +${item.evFromVitamins} EVs</span>
                            <span class="ev-from-battles">⚔️ Batallas: +${item.remainingEvs} EVs</span>
                        </div>
                        
                        ${item.hasPowerItem ? `
                            <div class="power-item-info">
                                <span class="power-badge">🎒 Con ${ITEMS.powerItems[POWER_ITEM_STATS[item.statKey]]?.name || 'Power Item'}: +${item.powerBonus} EVs/batalla</span>
                            </div>
                        ` : ''}
                        
                        <div class="battles-summary">
                            <span class="battles-total">Total: ${item.totalBattles} batallas necesarias</span>
                        </div>
                        
                        <div class="pokemon-section">
                            <span class="section-label">🐾 Pokémon a derrotar para ${item.stat}:</span>
                            <div class="pokemon-grid">
                                ${item.pokemonOptions.map((p, index) => `
                                    <div class="pokemon-card">
                                        <div class="pokemon-header-row">
                                            <span class="pokemon-name">${p.name}</span>
                                            <span class="pokemon-ev-badge">+${p.evYield} EVs</span>
                                        </div>
                                        <div class="pokemon-details">
                                            <span class="pokemon-battles">⚔️ ${p.battlesNeeded} KOs</span>
                                            <span class="pokemon-total-ev">(${p.totalEvFromPokemon} EVs gained)</span>
                                        </div>
                                        <div class="pokemon-location">
                                            📍 ${p.location}
                                        </div>
                                        <div class="pokemon-level">
                                            📊 Nivel: ${p.level}
                                        </div>
                                        ${p.sandwichName ? `
                                            <div class="pokemon-sandwich">
                                                🥪 ${p.sandwichName}
                                            </div>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        ${item.bestLocation ? `
                            <div class="best-location-info">
                                <span class="location-title">⭐ Mejor ubicación recomendada:</span>
                                <span class="location-name">${item.bestLocation.location}</span>
                                <span class="location-area">(${item.bestLocation.area})</span>
                            </div>
                        ` : ''}
                        
                        ${item.sandwichRecipe ? `
                            <div class="sandwich-recommendation">
                                <span class="sandwich-icon">🥪</span>
                                <span class="sandwich-name">${item.sandwichRecipe.name}</span>
                                <span class="sandwich-effect">${item.sandwichRecipe.effect}</span>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
                <div class="step-tip">💡 ${step.tip}</div>
            </div>
        `;
    },

    renderNatureStep(step) {
        return `
            <div class="step-section nature-style">
                <div class="step-header">
                    <span class="step-icon">${step.icon}</span>
                    <span class="step-title">${step.title}</span>
                </div>
                
                <div class="nature-info-detailed">
                    <div class="nature-main">
                        <span class="nature-name-large">${step.natureName}</span>
                        <span class="nature-effects">
                            <span class="positive">↑ ${step.statPlus}</span>
                            <span class="negative">↓ ${step.statMinus}</span>
                        </span>
                    </div>
                    
                    <div class="how-to-change">
                        <span class="how-to-title">🔧 Cómo cambiar la naturaleza:</span>
                        <span class="how-to-text">${step.howToUse}</span>
                    </div>
                    
                    <div class="mint-info">
                        <span class="mint-name">${step.mintName}</span>
                        <span class="mint-price">💰 ₽${step.mintPrice.toLocaleString()}</span>
                        <span class="mint-location">📍 ${step.mintLocation}</span>
                    </div>
                    
                    <div class="nature-note">💡 ${step.note}</div>
                </div>
            </div>
        `;
    },

    renderSummary(summary) {
        const summaryEl = document.getElementById('training-summary');
        if (!summaryEl) return;

        if (summary.totalEvs === 0) {
            Helpers.hideElement(summaryEl);
            return;
        }

        Helpers.showElement(summaryEl);
        summaryEl.innerHTML = `
            <div class="summary-card">
                <h3 class="summary-title">📊 Resumen del Entrenamiento</h3>
                <div class="summary-stats">
                    <div class="summary-item">
                        <span class="summary-icon">💊</span>
                        <span class="summary-label">Vitaminas:</span>
                        <span class="summary-value">${summary.vitamins}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-icon">⚔️</span>
                        <span class="summary-label">Batallas:</span>
                        <span class="summary-value">${summary.battles}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-icon">💰</span>
                        <span class="summary-label">Costo estimado:</span>
                        <span class="summary-value">₽${summary.totalCost.toLocaleString()}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-icon">⚡</span>
                        <span class="summary-label">EVs totales:</span>
                        <span class="summary-value">${summary.totalEvs}/510</span>
                    </div>
                </div>
            </div>
        `;
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
