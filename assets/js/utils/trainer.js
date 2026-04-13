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
            detailedSteps: [],
            warnings: [],
            targetStats: { ...targetStats },
            summary: {}
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
                    const existingIndex = plan.items.findIndex(i => i.stat === stat);
                    if (existingIndex === -1) {
                        plan.items.push(powerItem);
                    }
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
                        evYield: location.ev,
                        level: location.level,
                        sandwich: location.sandwich
                    };
                }
            }
        });

        plan.steps = this.generateSteps(plan);
        plan.detailedSteps = this.generateDetailedSteps(plan);
        plan.summary = this.getTrainingSummary(plan);

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
                title: 'Objetos de Poder',
                detail: plan.items.map(i => `${i.name} (+${i.evBonus} ${STAT_NAMES_ES[i.stat]}/KO)`).join(', ')
            });
        }

        if (Object.keys(plan.vitamins).length > 0) {
            const vitaminDetails = Object.entries(plan.vitamins).map(([stat, count]) => {
                const vitamin = ITEMS.vitamins[VITAMIN_STATS[stat]];
                return `${count}x ${vitamin?.name || 'Vitamina'}`;
            });
            
            steps.push({
                icon: '💊',
                title: 'Vitaminas',
                detail: vitaminDetails.join(', ')
            });
        }

        if (Object.keys(plan.battles).length > 0) {
            const battleDetails = Object.entries(plan.battles).map(([stat, count]) => {
                const pokemonInfo = plan.pokemonToFight[stat];
                return `${count}x vs ${pokemonInfo?.pokemon || 'Pokémon'} (${STAT_NAMES_ES[stat]})`;
            });

            steps.push({
                icon: '⚔️',
                title: 'Batallas',
                detail: battleDetails.join(', ')
            });
        }

        if (plan.nature) {
            steps.push({
                icon: '🌿',
                title: 'Naturaleza',
                detail: `${plan.nature.name} (+${plan.nature.statPlus} / -${plan.nature.statMinus})`
            });
        }

        return steps;
    },

    generateDetailedSteps(plan) {
        const detailedSteps = [];

        if (plan.reset.length > 0) {
            const resetInfo = Instructions.getResetInstructions(plan.reset);
            if (resetInfo) {
                detailedSteps.push({
                    type: 'reset',
                    ...resetInfo
                });
            }
        }

        if (plan.items.length > 0) {
            const powerInfo = Instructions.getPowerItemInstructions(plan.items);
            if (powerInfo) {
                detailedSteps.push({
                    type: 'powerItems',
                    ...powerInfo
                });
            }
        }

        if (Object.keys(plan.vitamins).length > 0) {
            const vitaminInfo = Instructions.getVitaminInstructions(plan.vitamins);
            if (vitaminInfo) {
                detailedSteps.push({
                    type: 'vitamins',
                    ...vitaminInfo
                });
            }
        }

        if (Object.keys(plan.battles).length > 0) {
            const trainingInfo = Instructions.getTrainingInstructions(
                plan.battles, 
                plan.pokemonToFight, 
                plan.targetStats
            );
            if (trainingInfo) {
                detailedSteps.push({
                    type: 'training',
                    ...trainingInfo
                });
            }
        }

        if (plan.nature) {
            const natureInfo = Instructions.getNatureInstructions(plan.nature);
            if (natureInfo) {
                detailedSteps.push({
                    type: 'nature',
                    ...natureInfo
                });
            }
        }

        return detailedSteps;
    },

    getTrainingSummary(plan) {
        let totalVitamins = 0;
        let totalBattles = 0;
        let totalCost = 0;

        Object.values(plan.vitamins || {}).forEach(v => totalVitamins += v);
        Object.values(plan.battles || {}).forEach(b => totalBattles += b);

        Object.values(plan.vitamins || {}).forEach((count, stat) => {
            const vitaminKey = VITAMIN_STATS[stat];
            const vitamin = ITEMS.vitamins[vitaminKey];
            if (vitamin) totalCost += count * vitamin.cost;
        });

        (plan.items || []).forEach(item => {
            totalCost += item.cost;
        });

        const totalEvs = Object.values(plan.targetStats || {}).reduce((a, b) => a + b, 0);

        return {
            vitamins: totalVitamins,
            battles: totalBattles,
            totalCost: totalCost,
            totalEvs: totalEvs,
            hasReset: plan.reset.length > 0,
            hasItems: plan.items.length > 0,
            hasNature: plan.nature !== null
        };
    }
};

window.Trainer = Trainer;
