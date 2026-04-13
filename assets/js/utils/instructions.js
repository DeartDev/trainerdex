const Instructions = {
    getResetInstructions(resetPlan) {
        if (!resetPlan || resetPlan.length === 0) return null;

        const details = resetPlan.map(r => {
            const locations = this.getBerryLocations(r.stat);
            return {
                stat: STAT_NAMES_ES[r.stat],
                berries: r.berries,
                berryName: r.berryName,
                locations: locations,
                note: `Reduce ${r.reduce} EVs de ${r.current} a ${r.target}`
            };
        });

        return {
            title: 'Reset de EVs',
            icon: '🔄',
            description: 'Si tu Pokémon ya tiene EVs acumulados y quieres empezar de cero, usa estas berries:',
            items: details,
            totalBerries: resetPlan.reduce((sum, r) => sum + r.berries, 0)
        };
    },

    getBerryLocations(stat) {
        const berryInfo = {
            hp: { berry: 'Pomeg Berry', zones: ['Asado Desert', 'West Province'] },
            attack: { berry: 'Kelpsy Berry', zones: ['Asado Desert', 'South Province'] },
            defense: { berry: 'Qualot Berry', zones: ['Asado Desert', 'West Province'] },
            sp_atk: { berry: 'Hondew Berry', zones: ['West Province', 'Area Zero'] },
            sp_def: { berry: 'Grepa Berry', zones: ['West Province', 'Casseroya Lake'] },
            speed: { berry: 'Tamato Berry', zones: ['South Province', 'Various'] }
        };

        const info = berryInfo[stat];
        if (!info) return [];

        return `${info.berry}: ${info.zones.join(', ')}`;
    },

    getPowerItemInstructions(items) {
        if (!items || items.length === 0) return null;

        const details = items.map(item => {
            const shop = SHOP_LOCATIONS.powerItems;
            return {
                name: item.name,
                stat: STAT_NAMES_ES[item.stat],
                bonus: `+${item.evBonus} EVs por combate`,
                price: item.cost,
                locations: shop.locations.join(', '),
                note: `Equípalo para acelerar el entrenamiento de ${STAT_NAMES_ES[item.stat]}`
            };
        });

        return {
            title: 'Objetos de Poder',
            icon: '🎒',
            description: 'Estos objetos aumentan los EVs ganados por combate:',
            items: details,
            totalCost: items.reduce((sum, i) => sum + i.cost, 0),
            tip: 'Usa uno por cada stat que estés entrenando'
        };
    },

    getVitaminInstructions(vitamins) {
        if (!vitamins || Object.keys(vitamins).length === 0) return null;

        const details = [];
        let totalCost = 0;

        Object.entries(vitamins).forEach(([stat, count]) => {
            const vitaminKey = VITAMIN_STATS[stat];
            const vitamin = ITEMS.vitamins[vitaminKey];
            
            if (vitamin) {
                const evFromVitamins = count * vitamin.ev;
                details.push({
                    stat: STAT_NAMES_ES[stat],
                    vitaminName: vitamin.name,
                    count: count,
                    evTotal: evFromVitamins,
                    price: vitamin.cost,
                    totalCost: count * vitamin.cost,
                    locations: SHOP_LOCATIONS.vitamins.locations.join(', '),
                    note: `Máximo 100 EVs por stat con vitaminas (10 unidades)`
                });
                totalCost += count * vitamin.cost;
            }
        });

        return {
            title: 'Vitaminas',
            icon: '💊',
            description: 'Las vitaminas dan +10 EVs cada una (máx 100 por stat):',
            items: details,
            totalCost: totalCost,
            tip: 'Puedes combinar vitaminas con batallas para optimizar'
        };
    },

    getTrainingInstructions(battles, pokemonToFight, targetStats) {
        if (!battles || Object.keys(battles).length === 0) return null;

        const details = [];

        Object.entries(battles).forEach(([stat, count]) => {
            const pokemonList = LOCATIONS_SV[stat] || [];
            const bestLocation = BEST_LOCATIONS[stat];
            const target = targetStats[stat] || 0;

            const usedEvs = Object.keys(vitamins => {
                if (vitamins[stat]) return vitamins[stat] * 10;
                return 0;
            });

            const evYield = pokemonList[0]?.ev || 1;
            const evPerBattle = evYield + 8;
            const remainingAfterVitamins = Math.max(0, target - (Object.values(vitamins || {})[stat] || 0) * 10);
            const actualBattles = Math.ceil(remainingAfterVitamins / evPerBattle) || count;

            const pokemonOptions = pokemonList.slice(0, 5).map(p => ({
                name: p.pokemon,
                ev: p.ev,
                location: p.location,
                level: p.level,
                sandwich: p.sandwich ? SANDWICH_RECIPES[p.sandwich]?.name : null
            }));

            details.push({
                stat: STAT_NAMES_ES[stat],
                targetEvs: target,
                battlesNeeded: actualBattles,
                evPerBattle: evPerBattle,
                bestLocation: bestLocation,
                pokemonOptions: pokemonOptions,
                sandwich: bestLocation?.sandwich,
                sandwichRecipe: SANDWICH_RECIPES[bestLocation?.sandwich],
                tip: `Derrota ${actualBattles} Pokémon dando ${STAT_NAMES_ES[stat]} EVs`
            });
        });

        return {
            title: 'Entrenamiento por Batalla',
            icon: '⚔️',
            description: 'Derrota Pokémon salvajes para ganar EVs:',
            items: details,
            tip: 'Usa el sandwich del tipo correspondiente para encontrar más Pokémon del stat'
        };
    },

    getNatureInstructions(nature) {
        if (!nature) return null;

        const mintKey = nature.key;
        const mint = ITEMS.mints[mintKey];

        return {
            title: 'Naturaleza',
            icon: '🌿',
            natureName: nature.name,
            statPlus: `+${nature.statPlus} (+10%)`,
            statMinus: `-${nature.statMinus} (-10%)`,
            mintName: mint?.name || `${nature.name} Mint`,
            mintPrice: mint?.cost || 1000,
            mintLocation: SHOP_LOCATIONS.mints.locations.join(', '),
            howToUse: 'Usa la Menta en el PC de tu Pokémon para cambiar la naturaleza',
            note: 'La naturaleza afecta el crecimiento de stats, no el comportamiento'
        };
    },

    getSummaryInfo(plan) {
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

        return {
            totalVitamins,
            totalBattles,
            totalCost,
            totalEvs: Object.values(plan.targetStats || {}).reduce((a, b) => a + b, 0)
        };
    }
};

window.Instructions = Instructions;
