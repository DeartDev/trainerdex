const Trainer = {
    generatePlan(pokemon, targetStats, options = {}) {
        const { useVitamins = true, usePowerItem = true } = options;
        
        const selectedStats = this.getSelectedStats(targetStats);
        const sortedStats = this.sortStatsByPriority(targetStats);
        const natureRecommendations = this.getRecommendedNatures(targetStats);
        
        const plan = {
            sortedStats: sortedStats,
            selectedStats: selectedStats,
            natureRecommendations: natureRecommendations,
            statPlans: {},
            reset: [],
            items: [],
            vitamins: {},
            battles: {},
            pokemonToFight: {},
            nature: natureRecommendations[0] || null,
            steps: [],
            detailedSteps: [],
            warnings: [],
            targetStats: { ...targetStats },
            summary: {}
        };

        const currentEvs = { hp: 0, attack: 0, defense: 0, sp_atk: 0, sp_def: 0, speed: 0 };
        const resetPlan = Calculator.calculateResetPlan(currentEvs, targetStats);
        if (resetPlan.length > 0) {
            plan.reset = resetPlan;
            plan.warnings.push('Se requiere reset de EVs');
        }

        sortedStats.forEach(({ stat, value, priority }) => {
            const target = value;
            if (target <= 0) return;

            const pokemonEvYield = pokemon.stats[stat]?.effort || 0;
            const evYield = pokemonEvYield > 0 ? pokemonEvYield : 1;
            
            let powerItemAdded = false;
            if (usePowerItem) {
                const powerItem = POWER_ITEM_STATS[stat] ? ITEMS.powerItems[POWER_ITEM_STATS[stat]] : null;
                if (powerItem) {
                    const existingIndex = plan.items.findIndex(i => i.stat === stat);
                    if (existingIndex === -1) {
                        plan.items.push(powerItem);
                    }
                    powerItemAdded = true;
                }
            }

            const calculation = usePowerItem
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
                
                const availablePokemon = LOCATIONS_SV[stat] || [];
                const topPokemon = availablePokemon.slice(0, 3);
                
                const battlesWithPower = calculation.withPowerItem ? 8 : 0;
                
                let remainingEvs = target - (calculation.vitaminEvs || 0);
                const pokemonDetails = topPokemon.map(p => {
                    const pokemonEv = p.ev + battlesWithPower;
                    const battlesNeeded = remainingEvs > 0 ? Math.ceil(remainingEvs / pokemonEv) : 0;
                    const actualBattles = Math.min(battlesNeeded, calculation.battles);
                    remainingEvs -= actualBattles * pokemonEv;
                    
                    return {
                        name: p.pokemon,
                        evYield: p.ev,
                        evPerBattle: pokemonEv,
                        location: p.location,
                        level: p.level,
                        sandwich: p.sandwich,
                        sandwichName: SANDWICH_RECIPES[p.sandwich]?.name || null,
                        battlesNeeded: actualBattles,
                        totalEvFromPokemon: actualBattles * pokemonEv
                    };
                }).filter(p => p.battlesNeeded > 0);

                if (pokemonDetails.length > 0) {
                    plan.pokemonToFight[stat] = pokemonDetails;
                } else {
                    plan.pokemonToFight[stat] = [{
                        name: 'Cualquier Pokémon',
                        evYield: battlesWithPower > 0 ? battlesWithPower : 1,
                        evPerBattle: battlesWithPower > 0 ? battlesWithPower : 1,
                        location: 'Cualquier zona con Pokémon salvajes',
                        level: 'Nivel recomendado según tu equipo',
                        sandwich: null,
                        sandwichName: null,
                        battlesNeeded: calculation.battles,
                        totalEvFromPokemon: calculation.battles * (battlesWithPower > 0 ? battlesWithPower : 1)
                    }];
                }
            }

            plan.statPlans[stat] = {
                priority: priority,
                powerItem: powerItemAdded ? (POWER_ITEM_STATS[stat] ? ITEMS.powerItems[POWER_ITEM_STATS[stat]] : null) : null,
                vitamins: plan.vitamins[stat] || 0,
                battles: plan.battles[stat] || 0,
                pokemonToFight: plan.pokemonToFight[stat] || [],
                evYield: evYield
            };
        });

        plan.steps = this.generateSteps(plan);
        plan.detailedSteps = this.generateDetailedSteps(plan);
        plan.summary = this.getTrainingSummary(plan);

        return plan;
    },

    getSelectedStats(targetStats) {
        return STAT_KEYS.filter(stat => (targetStats[stat] || 0) > 0);
    },

    sortStatsByPriority(targetStats) {
        return STAT_KEYS
            .filter(stat => (targetStats[stat] || 0) > 0)
            .map(stat => ({
                stat: stat,
                value: targetStats[stat],
                priority: this.getPriorityLevel(targetStats[stat])
            }))
            .sort((a, b) => b.value - a.value);
    },

    getPriorityLevel(value) {
        if (value >= 252) return 'principal';
        if (value >= 100) return 'secundario';
        return 'bajo';
    },

    getPriorityColor(priority, theme = 'dark') {
        const colors = {
            dark: {
                principal: '#4ADE80',
                secundario: '#FDE047',
                bajo: '#6B7280'
            },
            light: {
                principal: '#22C55E',
                secundario: '#F59E0B',
                bajo: '#94A3B8'
            }
        };
        return colors[theme]?.[priority] || colors[theme].bajo;
    },

    getPriorityLabel(priority) {
        return {
            principal: '⭐ Principal',
            secundario: '🔶 Secundario',
            bajo: '🔹 Bajo'
        }[priority] || '';
    },

    getRecommendedNatures(targetStats) {
        const natures = [];
        const usedNatures = new Set();
        
        const selectedStats = Object.entries(targetStats)
            .filter(([_, value]) => value > 0)
            .sort((a, b) => b[1] - a[1]);

        selectedStats.forEach(([stat, evValue]) => {
            if (natures.length >= 2) return;
            
            const recommended = RECOMMENDED_NATURES[stat];
            if (!recommended) return;
            
            for (const natureKey of recommended) {
                if (natures.length >= 2) break;
                if (usedNatures.has(natureKey)) continue;
                
                const nature = NATURES_ES[natureKey];
                if (!nature) continue;
                
                const statMinus = nature.minus;
                const isMinusStatTrained = selectedStats.some(([s]) => s === statMinus);
                
                if (isMinusStatTrained) continue;
                
                usedNatures.add(natureKey);
                natures.push({
                    name: nature.nombre,
                    key: natureKey,
                    plus: nature.plus,
                    minus: nature.minus,
                    icon: nature.icono,
                    statPlus: STAT_NAMES_ES[nature.plus],
                    statMinus: STAT_NAMES_ES[nature.minus],
                    recommendedFor: STAT_NAMES_ES[stat],
                    recommendedForKey: stat,
                    evValue: evValue
                });
                
                break;
            }
        });
        
        return natures;
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
                return `${count}x vs ${pokemonInfo?.[0]?.name || 'Pokémon'} (${STAT_NAMES_ES[stat]})`;
            });

            steps.push({
                icon: '⚔️',
                title: 'Batallas',
                detail: battleDetails.join(', ')
            });
        }

        if (plan.natureRecommendations?.length > 0) {
            steps.push({
                icon: '🌿',
                title: 'Naturalezas',
                detail: plan.natureRecommendations.map(n => n.name).join(', ')
            });
        }

        return steps;
    },

    generateDetailedSteps(plan) {
        const detailedSteps = [];

        if (plan.reset.length > 0) {
            const resetInfo = Instructions.getResetInstructions(plan.reset);
            if (resetInfo) {
                detailedSteps.push({ type: 'reset', ...resetInfo });
            }
        }

        const theme = document.documentElement?.getAttribute('data-theme') || 'dark';
        
        plan.sortedStats.forEach(({ stat, value, priority }) => {
            const statPlan = plan.statPlans[stat];
            if (!statPlan) return;
            
            if (statPlan.powerItem) {
                detailedSteps.push({
                    type: 'powerItem',
                    stat: stat,
                    statKey: stat,
                    priority: priority,
                    value: value,
                    icon: '🎒',
                    title: `Objeto de Poder - ${STAT_NAMES_ES[stat]}`,
                    powerItem: statPlan.powerItem,
                    description: `Equipa ${statPlan.powerItem.name} para obtener +${statPlan.powerItem.evBonus} EVs adicionales por combate`
                });
            }

            if (statPlan.vitamins > 0) {
                const vitaminKey = VITAMIN_STATS[stat];
                const vitamin = ITEMS.vitamins[vitaminKey];
                detailedSteps.push({
                    type: 'vitamin',
                    stat: stat,
                    statKey: stat,
                    priority: priority,
                    value: value,
                    icon: '💊',
                    title: `Vitaminas - ${STAT_NAMES_ES[stat]}`,
                    vitamin: vitamin,
                    count: statPlan.vitamins,
                    evTotal: statPlan.vitamins * 10,
                    description: `Usa ${statPlan.vitamins}x ${vitamin.name} (+${statPlan.vitamins * 10} EVs)`
                });
            }

            if (statPlan.battles > 0 && statPlan.pokemonToFight.length > 0) {
                const location = LOCATIONS_SV[stat]?.[0];
                detailedSteps.push({
                    type: 'battle',
                    stat: stat,
                    statKey: stat,
                    priority: priority,
                    value: value,
                    icon: '⚔️',
                    title: `Entrenamiento - ${STAT_NAMES_ES[stat]}`,
                    battles: statPlan.battles,
                    pokemon: statPlan.pokemonToFight,
                    location: location,
                    description: `Derrota ${statPlan.battles} Pokémon para obtener los ${value} EVs restantes`
                });
            }
        });

        if (plan.natureRecommendations?.length > 0) {
            detailedSteps.push({
                type: 'natures',
                icon: '🌿',
                title: 'Naturalezas Recomendadas',
                natures: plan.natureRecommendations,
                description: 'Las mejores naturalezas para tus stats principales'
            });
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
            natureRecommendations: plan.natureRecommendations,
            hasReset: plan.reset.length > 0,
            hasItems: plan.items.length > 0,
            hasNatures: plan.natureRecommendations?.length > 0
        };
    }
};

window.Trainer = Trainer;