const Calculator = {
    calculateEvsNeeded(currentEv, targetEv, evYield) {
        const needed = targetEv - currentEv;
        if (needed <= 0) return { vitamins: 0, battles: 0, remaining: 0 };
        
        const vitamins = Math.min(Math.floor(needed / 10), 10);
        const vitaminEvs = vitamins * 10;
        const remaining = needed - vitaminEvs;
        
        let battles = 0;
        if (remaining > 0 && evYield > 0) {
            battles = Math.ceil(remaining / evYield);
        }
        
        return { vitamins, vitaminEvs, battles, remaining };
    },

    calculateEvsNeededWithPowerItem(currentEv, targetEv, evYield, powerItemBonus = 8) {
        const needed = targetEv - currentEv;
        if (needed <= 0) return { vitamins: 0, battles: 0, remaining: 0 };
        
        const vitamins = Math.min(Math.floor(needed / 10), 10);
        const vitaminEvs = vitamins * 10;
        const remaining = needed - vitaminEvs;
        
        let battles = 0;
        if (remaining > 0 && evYield + powerItemBonus > 0) {
            battles = Math.ceil(remaining / (evYield + powerItemBonus));
        }
        
        return { vitamins, vitaminEvs, battles, remaining, withPowerItem: true };
    },

    calculateTotalEvs(targetStats) {
        return Object.values(targetStats).reduce((sum, ev) => sum + (ev || 0), 0);
    },

    validateEvs(targetStats) {
        const errors = [];
        const total = this.calculateTotalEvs(targetStats);
        
        if (total > MAX_TOTAL_EV) {
            errors.push(`Has excedido el límite total de EVs (${total}/510)`);
        }
        
        STAT_KEYS.forEach(stat => {
            const ev = targetStats[stat] || 0;
            if (ev > MAX_EV) {
                errors.push(`${STAT_NAMES_ES[stat]} no puede exceder 252 EVs`);
            }
            if (ev < 0) {
                errors.push(`${STAT_NAMES_ES[stat]} no puede ser negativo`);
            }
        });
        
        return errors;
    },

    calculateResetPlan(currentEvs, targetEvs) {
        const reset = [];
        
        STAT_KEYS.forEach(stat => {
            const current = currentEvs[stat] || 0;
            const target = targetEvs[stat] || 0;
            
            if (current > target && target === 0) {
                const reduce = current - target;
                const berries = Math.ceil(reduce / 10);
                const berry = RESET_BERRY_STATS[stat];
                
                reset.push({
                    stat,
                    current,
                    target,
                    reduce,
                    berries,
                    berryName: ITEMS.resetBerries[berry]?.name || berry
                });
            }
        });
        
        return reset;
    },

    getTrainingRecommendation(stat, evYield) {
        const recommendation = {
            useVitamins: true,
            usePowerItem: true,
            bestLocation: BEST_LOCATIONS[stat],
            powerItem: POWER_ITEM_STATS[stat] ? ITEMS.powerItems[POWER_ITEM_STATS[stat]] : null,
            vitamin: VITAMIN_STATS[stat] ? ITEMS.vitamins[VITAMIN_STATS[stat]] : null
        };
        
        return recommendation;
    }
};

window.Calculator = Calculator;
