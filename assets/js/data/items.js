const ITEMS = {
    vitamins: {
        hp_up: { name: 'HP Up', stat: 'hp', ev: 10, cost: 10000 },
        protein: { name: 'Protein', stat: 'attack', ev: 10, cost: 10000 },
        iron: { name: 'Iron', stat: 'defense', ev: 10, cost: 10000 },
        calcium: { name: 'Calcium', stat: 'sp_atk', ev: 10, cost: 10000 },
        zinc: { name: 'Zinc', stat: 'sp_def', ev: 10, cost: 10000 },
        carbos: { name: 'Carbos', stat: 'speed', ev: 10, cost: 10000 }
    },
    
    powerItems: {
        power_weight: { name: 'Power Weight', stat: 'hp', evBonus: 8, cost: 10000, location: 'Delibird Presents - Mesagoza, Levincia, Cascarrafa' },
        power_bracer: { name: 'Power Bracer', stat: 'attack', evBonus: 8, cost: 10000, location: 'Delibird Presents - Mesagoza, Levincia, Cascarrafa' },
        power_belt: { name: 'Power Belt', stat: 'defense', evBonus: 8, cost: 10000, location: 'Delibird Presents - Mesagoza, Levincia, Cascarrafa' },
        power_lens: { name: 'Power Lens', stat: 'sp_atk', evBonus: 8, cost: 10000, location: 'Delibird Presents - Mesagoza, Levincia, Cascarrafa' },
        power_band: { name: 'Power Band', stat: 'sp_def', evBonus: 8, cost: 10000, location: 'Delibird Presents - Mesagoza, Levincia, Cascarrafa' },
        power_anklet: { name: 'Power Anklet', stat: 'speed', evBonus: 8, cost: 10000, location: 'Delibird Presents - Mesagoza, Levincia, Cascarrafa' }
    },
    
    resetBerries: {
        pomeg: { name: 'Pomeg Berry', stat: 'hp', evReduce: 10 },
        kelpsy: { name: 'Kelpsy Berry', stat: 'attack', evReduce: 10 },
        qualot: { name: 'Qualot Berry', stat: 'defense', evReduce: 10 },
        hondew: { name: 'Hondew Berry', stat: 'sp_atk', evReduce: 10 },
        grepa: { name: 'Grepa Berry', stat: 'sp_def', evReduce: 10 },
        tamato: { name: 'Tamato Berry', stat: 'speed', evReduce: 10 }
    },

    mints: {
        adamant: { name: 'Adamant Mint', stat: 'attack', nature: 'adamant', cost: 1000 },
        bold: { name: 'Bold Mint', stat: 'defense', nature: 'bold', cost: 1000 },
        modest: { name: 'Modest Mint', stat: 'sp_atk', nature: 'modest', cost: 1000 },
        calm: { name: 'Calm Mint', stat: 'sp_def', nature: 'calm', cost: 1000 },
        jolly: { name: 'Jolly Mint', stat: 'speed', nature: 'jolly', cost: 1000 },
        timid: { name: 'Timid Mint', stat: 'speed', nature: 'timid', cost: 1000 },
        impish: { name: 'Impish Mint', stat: 'defense', nature: 'impish', cost: 1000 },
        careful: { name: 'Careful Mint', stat: 'sp_def', nature: 'careful', cost: 1000 }
    }
};

const SHOP_LOCATIONS = {
    vitamins: {
        name: 'Chansey Supply',
        locations: ['Mesagoza', 'Levincia', 'Cascarrafa'],
        price: '₽10,000 each',
        note: 'Cada vitamina da +10 EVs (máx 100 por stat)'
    },
    powerItems: {
        name: 'Delibird Presents',
        locations: ['Mesagoza (3 tiendas)', 'Levincia', 'Cascarrafa'],
        price: '₽10,000 each',
        note: 'Da +8 EVs adicionales por combate'
    },
    resetBerries: {
        name: 'Varias ubicaciones',
        locations: ['Asado Desert', 'West Province', 'Area Zero'],
        price: 'Gratis en naturaleza',
        note: 'Cada berry reduce -10 EVs'
    },
    mints: {
        name: 'Casual Branch',
        locations: ['Mesagoza (Centro)'],
        price: '₽1,000 each',
        note: 'Cambia la naturaleza sin modificar el comportamiento'
    },
    feathers: {
        name: 'Tera Raid Rewards',
        locations: ['Various Tera Raids'],
        price: 'Gratis como recompensa',
        note: 'Cada pluma da +1 EV (alternativa a vitaminas)'
    }
};

const SANDWICH_RECIPES = {
    normal: { name: 'Normal Sandwich', ingredients: 'Ham + Cheese', effect: 'Encounter Power: Normal Lv.1-2' },
    electric: { name: 'Electric Sandwich', ingredients: 'Hamberger + Tomato', effect: 'Encounter Power: Electric Lv.1-2' },
    fighting: { name: 'Fighting Sandwich', ingredients: 'Bacon + Lettuce', effect: 'Encounter Power: Fighting Lv.1-2' },
    fairy: { name: 'Fairy Sandwich', ingredients: 'Strawberry + Whipped Cream', effect: 'Encounter Power: Fairy Lv.1-2' },
    water: { name: 'Water Sandwich', ingredients: 'Salmon + Avocado', effect: 'Encounter Power: Water Lv.1-2' },
    grass: { name: 'Grass Sandwich', ingredients: 'Herba Syrup + Curry', effect: 'Encounter Power: Grass Lv.1-2' },
    fire: { name: 'Fire Sandwich', ingredients: 'Chili + Pepper', effect: 'Encounter Power: Fire Lv.1-2' },
    steel: { name: 'Steel Sandwich', ingredients: 'Noodles + Meat', effect: 'Encounter Power: Steel Lv.1-2' },
    psychic: { name: 'Psychic Sandwich', ingredients: 'Peanut + Butter', effect: 'Encounter Power: Psychic Lv.1-2' },
    ghost: { name: 'Ghost Sandwich', ingredients: 'Mystery Meat', effect: 'Encounter Power: Ghost Lv.1-2' }
};

const STAT_SANDWICHES = {
    hp: 'normal',
    attack: 'electric',
    defense: 'steel',
    sp_atk: 'fire',
    sp_def: 'psychic',
    speed: 'grass'
};

const VITAMIN_STATS = {
    hp: 'hp_up',
    attack: 'protein',
    defense: 'iron',
    sp_atk: 'calcium',
    sp_def: 'zinc',
    speed: 'carbos'
};

const POWER_ITEM_STATS = {
    hp: 'power_weight',
    attack: 'power_bracer',
    defense: 'power_belt',
    sp_atk: 'power_lens',
    sp_def: 'power_band',
    speed: 'power_anklet'
};

const RESET_BERRY_STATS = {
    hp: 'pomeg',
    attack: 'kelpsy',
    defense: 'qualot',
    sp_atk: 'hondew',
    sp_def: 'grepa',
    speed: 'tamato'
};

const STAT_KEYS = ['hp', 'attack', 'defense', 'sp_atk', 'sp_def', 'speed'];
const MAX_EV = 252;
const MAX_TOTAL_EV = 510;

window.ITEMS = ITEMS;
window.SHOP_LOCATIONS = SHOP_LOCATIONS;
window.SANDWICH_RECIPES = SANDWICH_RECIPES;
window.STAT_SANDWICHES = STAT_SANDWICHES;
window.VITAMIN_STATS = VITAMIN_STATS;
window.POWER_ITEM_STATS = POWER_ITEM_STATS;
window.RESET_BERRY_STATS = RESET_BERRY_STATS;
window.STAT_KEYS = STAT_KEYS;
window.MAX_EV = MAX_EV;
window.MAX_TOTAL_EV = MAX_TOTAL_EV;
