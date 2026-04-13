const Tests = {
    results: [],
    
    runAll() {
        console.log('🧪 Ejecutando tests de TrainerDex...\n');
        
        this.testHelpers();
        this.testCalculator();
        this.testTrainer();
        this.testNatures();
        this.testItems();
        
        this.printResults();
    },
    
    assert(condition, message) {
        if (!condition) {
            throw new Error(message);
        }
    },
    
    runTest(name, fn) {
        try {
            fn();
            this.results.push({ name, passed: true });
            console.log(`✅ ${name}`);
        } catch (e) {
            this.results.push({ name, passed: false, error: e.message });
            console.log(`❌ ${name}: ${e.message}`);
        }
    },
    
    printResults() {
        const passed = this.results.filter(r => r.passed).length;
        const failed = this.results.filter(r => !r.passed).length;
        console.log(`\n📊 Resultados: ${passed} passed, ${failed} failed`);
        
        if (failed > 0) {
            console.log('\n❌ Tests fallidos:');
            this.results.filter(r => !r.passed).forEach(r => {
                console.log(`  - ${r.name}: ${r.error}`);
            });
        }
    },
    
    testHelpers() {
        this.runTest('Helpers.capitalize', () => {
            this.assert(Helpers.capitalize('pikachu') === 'Pikachu', 'capitalize failed');
            this.assert(Helpers.capitalize('') === '', 'empty string failed');
        });
        
        this.runTest('Helpers.capitalizeWords', () => {
            this.assert(Helpers.capitalizeWords('charizard-mega') === 'Charizard Mega', 'capitalizeWords failed');
            this.assert(Helpers.capitalizeWords('mr-mime') === 'Mr Mime', 'mr-mime failed');
        });
        
        this.runTest('Helpers.getTypeColor', () => {
            this.assert(Helpers.getTypeColor('fire') === '#F08030', 'fire color failed');
            this.assert(Helpers.getTypeColor('water') === '#6890F0', 'water color failed');
        });
        
        this.runTest('Helpers.formatStatName', () => {
            this.assert(Helpers.formatStatName('hp') === 'PS', 'hp failed');
            this.assert(Helpers.formatStatName('attack') === 'Ataque', 'attack failed');
            this.assert(Helpers.formatStatName('sp_atk') === 'At. Esp.', 'sp_atk failed');
        });
        
        this.runTest('Helpers.getStatBarWidth', () => {
            this.assert(Helpers.getStatBarWidth(127, 255) === 50, '50% failed');
            this.assert(Helpers.getStatBarWidth(255, 255) === 100, '100% failed');
            this.assert(Helpers.getStatBarWidth(300, 255) === 100, 'overflow failed');
        });
    },
    
    testCalculator() {
        this.runTest('Calculator.calculateTotalEvs', () => {
            const result = Calculator.calculateTotalEvs({ hp: 252, attack: 252, speed: 6 });
            this.assert(result === 510, 'total should be 510');
        });
        
        this.runTest('Calculator.calculateEvsNeeded', () => {
            const result = Calculator.calculateEvsNeeded(0, 252, 2);
            this.assert(result.vitamins === 10, 'vitamins should be 10 (max)');
            this.assert(result.remaining === 2, 'remaining should be 2');
            this.assert(result.battles === 1, 'battles should be 1');
        });
        
        this.runTest('Calculator.calculateEvsNeededWithPowerItem', () => {
            const result = Calculator.calculateEvsNeededWithPowerItem(0, 252, 2, 8);
            this.assert(result.vitamins === 10, 'vitamins should be 10');
            this.assert(result.withPowerItem === true, 'should have power item');
            this.assert(result.battles === 3, 'battles should be 3 with power item (10 remaining / 10 per KO)');
        });
        
        this.runTest('Calculator.validateEvs - invalid total', () => {
            const errors = Calculator.validateEvs({ hp: 300, attack: 200, defense: 10, sp_atk: 0, sp_def: 0, speed: 0 });
            this.assert(errors.length > 0, 'should have errors');
            this.assert(errors[0].includes('510'), 'should mention 510');
        });
        
        this.runTest('Calculator.validateEvs - invalid single stat', () => {
            const errors = Calculator.validateEvs({ hp: 253, attack: 0, defense: 0, sp_atk: 0, sp_def: 0, speed: 0 });
            this.assert(errors.length > 0, 'should have errors');
            this.assert(errors[0].includes('252'), 'should mention 252');
        });
        
        this.runTest('Calculator.calculateResetPlan', () => {
            const result = Calculator.calculateResetPlan({ attack: 120 }, { attack: 0 });
            this.assert(result.length === 1, 'should have 1 reset item');
            this.assert(result[0].berries === 12, 'should need 12 berries');
            this.assert(result[0].berryName === 'Kelpsy Berry', 'should be Kelpsy Berry');
        });
        
        this.runTest('Calculator.getTrainingRecommendation', () => {
            const result = Calculator.getTrainingRecommendation('attack', 2);
            this.assert(result.useVitamins === true, 'should use vitamins');
            this.assert(result.usePowerItem === true, 'should use power item');
            this.assert(result.powerItem !== null, 'should have power item');
            this.assert(result.powerItem.name === 'Power Bracer', 'should be Power Bracer');
        });
    },
    
    testTrainer() {
        const mockPokemon = {
            name: 'charizard',
            stats: {
                hp: { base: 78, effort: 0 },
                attack: { base: 104, effort: 2 },
                defense: { base: 78, effort: 0 },
                sp_atk: { base: 109, effort: 3 },
                sp_def: { base: 85, effort: 0 },
                speed: { base: 100, effort: 2 }
            }
        };
        
        this.runTest('Trainer.getMainStat', () => {
            const result = Trainer.getMainStat({ hp: 0, attack: 252, defense: 0, sp_atk: 0, sp_def: 0, speed: 0 });
            this.assert(result === 'attack', 'should return attack');
        });
        
        this.runTest('Trainer.getRecommendedNature', () => {
            const result = Trainer.getRecommendedNature('attack');
            this.assert(result !== null, 'should return nature');
            this.assert(result.plus === 'attack', 'should boost attack');
            this.assert(result.statPlus === 'Ataque', 'should have stat name');
        });
        
        this.runTest('Trainer.generatePlan', () => {
            const plan = Trainer.generatePlan(mockPokemon, { attack: 252, speed: 252 });
            
            this.assert(plan.nature !== null, 'should have nature');
            this.assert(plan.vitamins.attack === 10, 'should have 10 vitamins for attack');
            this.assert(plan.vitamins.speed === 10, 'should have 10 vitamins for speed');
            this.assert(plan.items.length > 0, 'should have items');
            this.assert(plan.steps.length > 0, 'should have steps');
        });
        
        this.runTest('Trainer.getTrainingSummary', () => {
            const plan = Trainer.generatePlan(mockPokemon, { attack: 252 });
            const summary = Trainer.getTrainingSummary(plan);
            
            this.assert(summary.vitamins > 0, 'should have vitamins');
            this.assert(summary.hasItems === true, 'should have items');
            this.assert(summary.hasNature === true, 'should have nature');
        });
    },
    
    testNatures() {
        this.runTest('NATURES_ES has all natures', () => {
            this.assert(Object.keys(NATURES_ES).length === 25, 'should have 25 natures');
        });
        
        this.runTest('STAT_NAMES_ES has all stats', () => {
            this.assert(STAT_NAMES_ES.hp === 'PS', 'hp should be PS');
            this.assert(STAT_NAMES_ES.attack === 'Ataque', 'attack should be Ataque');
            this.assert(STAT_NAMES_ES.defense === 'Defensa', 'defense should be Defensa');
            this.assert(STAT_NAMES_ES.speed === 'Velocidad', 'speed should be Velocidad');
        });
        
        this.runTest('RECOMMENDED_NATURES', () => {
            this.assert(RECOMMENDED_NATURES.attack.includes('adamant'), 'should recommend adamant for attack');
            this.assert(RECOMMENDED_NATURES.speed.includes('jolly'), 'should recommend jolly for speed');
        });
    },
    
    testItems() {
        this.runTest('ITEMS.vitamins has all stats', () => {
            this.assert(ITEMS.vitamins.hp_up.ev === 10, 'HP Up should give 10 EVs');
            this.assert(ITEMS.vitamins.protein.stat === 'attack', 'Protein should be for attack');
            this.assert(ITEMS.vitamins.carbos.stat === 'speed', 'Carbos should be for speed');
        });
        
        this.runTest('ITEMS.powerItems has all stats', () => {
            this.assert(ITEMS.powerItems.power_bracer.evBonus === 8, 'Power Bracer should give +8');
            this.assert(ITEMS.powerItems.power_anklet.stat === 'speed', 'Power Anklet should be for speed');
        });
        
        this.runTest('ITEMS.resetBerries has all stats', () => {
            this.assert(ITEMS.resetBerries.pomeg.stat === 'hp', 'Pomeg should be for HP');
            this.assert(ITEMS.resetBerries.kelpsy.evReduce === 10, 'Kelpsy should reduce 10');
        });
        
        this.runTest('VITAMIN_STATS mapping', () => {
            this.assert(VITAMIN_STATS.attack === 'protein', 'attack should map to protein');
            this.assert(VITAMIN_STATS.speed === 'carbos', 'speed should map to carbos');
        });
        
        this.runTest('POWER_ITEM_STATS mapping', () => {
            this.assert(POWER_ITEM_STATS.attack === 'power_bracer', 'attack should map to power_bracer');
            this.assert(POWER_ITEM_STATS.speed === 'power_anklet', 'speed should map to power_anklet');
        });
        
        this.runTest('Constants', () => {
            this.assert(MAX_EV === 252, 'MAX_EV should be 252');
            this.assert(MAX_TOTAL_EV === 510, 'MAX_TOTAL_EV should be 510');
            this.assert(STAT_KEYS.length === 6, 'STAT_KEYS should have 6 stats');
        });
    }
};

window.Tests = Tests;
console.log('📝 Tests cargados. Ejecutar Tests.runAll() para validar.');
