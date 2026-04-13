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
    }
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
window.VITAMIN_STATS = VITAMIN_STATS;
window.POWER_ITEM_STATS = POWER_ITEM_STATS;
window.RESET_BERRY_STATS = RESET_BERRY_STATS;
window.STAT_KEYS = STAT_KEYS;
window.MAX_EV = MAX_EV;
window.MAX_TOTAL_EV = MAX_TOTAL_EV;
