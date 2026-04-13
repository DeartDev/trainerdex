const Trainer = {
    generatePlan(pokemon, targetStats, options = {}) {
        const { useVitamins = true, usePowerItem = true } = options;
        
        const plan = {
            reset: [],
            items: [],
            vitamins: {},
            battles: {},
            pokemonToFight: {},
            nature: null,
            steps: [],
            warnings: []
        };

        const currentEvs = {
            hp: 0, attack: 0, defense: 0,
            sp_atk: 0, sp_def: 0, speed: 0
        };

        const resetPlan = Calculator.calculateResetPlan(currentEvs, targetStats);
        if (resetPlan.length > 0) {
            plan.reset = resetPlan;
            plan.warnings.push('Se requiere reset de EVs');
        }

        const mainStat = this.getMainStat(targetStats);
        if (mainStat) {
            plan.nature = this.getRecommendedNature(mainStat);
        }

        STAT_KEYS.forEach(stat => {
            const target = targetStats[stat] || 0;
            if (target <= 0) return;

            const evYield = pokemon.stats[stat]?.effort || 0;
            
            if (usePowerItem && evYield > 0) {
                const powerItem = POWER_ITEM_STATS[stat] ? ITEMS.powerItems[POWER_ITEM_STATS[stat]] : null;
                if (powerItem) {
                    plan.items.push(powerItem);
                }
            }

            const calculation = usePowerItem && evYield > 0
                ? Calculator.calculateEvsNeededWithPowerItem(0, target, evYield)
                : Calculator.calculateEvsNeeded(0, target, evYield);

            if (calculation.vitamins > 0) {
                const vitaminKey = VITAMIN_STATS[stat];
                if (vitaminKey) {
                    plan.vitamins[stat] = calculation.vitamins;
                }
            }

            if (calculation.battles > 0) {
                plan.battles[stat] = calculation.battles;
                
                const location = LOCATIONS_SV[stat]?.[0];
                if (location) {
                    plan.pokemonToFight[stat] = {
                        pokemon: location.pokemon,
                        location: location.location,
                        evYield: location.ev
                    };
                }
            }
        });

        plan.steps = this.generateSteps(plan);

        return plan;
    },

    getMainStat(targetStats) {
        let maxEv = 0;
        let mainStat = null;

        STAT_KEYS.forEach(stat => {
            const ev = targetStats[stat] || 0;
            if (ev > maxEv) {
                maxEv = ev;
                mainStat = stat;
            }
        });

        return maxEv > 0 ? mainStat : null;
    },

    getRecommendedNature(mainStat) {
        const recommended = RECOMMENDED_NATURES[mainStat];
        if (!recommended || recommended.length === 0) return null;

        const natureName = recommended[0];
        const nature = NATURES_ES[natureName];

        if (!nature) return null;

        return {
            name: nature.nombre,
            key: natureName,
            plus: nature.plus,
            minus: nature.minus,
            icon: nature.icono,
            statPlus: STAT_NAMES_ES[nature.plus],
            statMinus: STAT_NAMES_ES[nature.minus]
        };
    },

    generateSteps(plan) {
        const steps = [];

        if (plan.reset.length > 0) {
            steps.push({
                icon: '🔄',
                title: 'Reset de EVs',
                detail: plan.reset.map(r => 
                    `${r.berries}x ${r.berryName} para ${STAT_NAMES_ES[r.stat]}`
                ).join(', ')
            });
        }

        if (plan.items.length > 0) {
            steps.push({
                icon: '🎒',
                title: 'Equipar objetos',
                detail: plan.items.map(i => i.name).join(', ')
            });
        }

        if (Object.keys(plan.vitamins).length > 0) {
            const vitaminDetails = Object.entries(plan.vitamins).map(([stat, count]) => {
                const vitamin = ITEMS.vitamins[VITAMIN_STATS[stat]];
                return `${count}x ${vitamin?.name || 'Vitamina'}`;
            });
            
            steps.push({
                icon: '💊',
                title: 'Usar vitaminas',
                detail: vitaminDetails.join(', ')
            });
        }

        if (Object.keys(plan.battles).length > 0) {
            const battleDetails = Object.entries(plan.battles).map(([stat, count]) => {
                const pokemonInfo = plan.pokemonToFight[stat];
                return `${count}x contra ${pokemonInfo?.pokemon || 'Pokémon'} (${STAT_NAMES_ES[stat]})`;
            });

            steps.push({
                icon: '⚔️',
                title: 'Derrotar Pokémon',
                detail: battleDetails.join(', ')
            });
        }

        if (plan.nature) {
            steps.push({
                icon: '🌿',
                title: 'Naturaleza recomendada',
                detail: `${plan.nature.name} (+${plan.nature.statPlus} / -${plan.nature.statMinus})`
            });
        }

        return steps;
    },

    getTrainingSummary(plan) {
        let totalVitamins = 0;
        let totalBattles = 0;

        Object.values(plan.vitamins).forEach(v => totalVitamins += v);
        Object.values(plan.battles).forEach(b => totalBattles += b);

        return {
            vitamins: totalVitamins,
            battles: totalBattles,
            hasReset: plan.reset.length > 0,
            hasItems: plan.items.length > 0,
            hasNature: plan.nature !== null
        };
    }
};

window.Trainer = Trainer;
