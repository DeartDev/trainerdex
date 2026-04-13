const LOCATIONS_SV = {
    hp: [
        { pokemon: 'Lechonk', ev: 1, location: 'South Province (Area One)', level: '1-5', sandwich: 'normal' },
        { pokemon: 'Happiny', ev: 1, location: 'South Province (Area One, Four)', level: '1-10', sandwich: 'normal' },
        { pokemon: 'Azurill', ev: 1, location: 'South Province (Area One) - Río al sur de Los Platos', level: '5-15', sandwich: 'fairy' },
        { pokemon: 'Marill', ev: 2, location: 'South Province (Area Five) - Cerca de Levincia', level: '20-30', sandwich: 'fairy' },
        { pokemon: 'Chansey', ev: 2, location: 'Area Zero / South Province (Area One)', level: '30-50', sandwich: 'normal' },
        { pokemon: 'Snorlax', ev: 3, location: 'South Province (Area Four)', level: '35-45', sandwich: 'normal' },
        { pokemon: 'Blissey', ev: 3, location: 'Area Zero / South Province (Area Six)', level: '50-60', sandwich: 'normal' },
        { pokemon: 'Azumarill', ev: 3, location: 'Casseroya Lake', level: '35-45', sandwich: 'water' },
        { pokemon: 'Dondozo', ev: 3, location: 'Casseroya Lake', level: '40-50', sandwich: 'water' }
    ],
    attack: [
        { pokemon: 'Yungoos', ev: 1, location: 'South Province (Area One)', level: '3-8', sandwich: 'normal' },
        { pokemon: 'Shinx', ev: 1, location: 'South Province (Area Three) - Este de Mesagoza', level: '5-15', sandwich: 'electric' },
        { pokemon: 'Teddiursa', ev: 1, location: 'North Province (Area Two) - Fury Falls', level: '20-30', sandwich: 'normal' },
        { pokemon: 'Scyther', ev: 1, location: 'North Province (Area Two) - Fury Falls', level: '25-35', sandwich: 'grass' },
        { pokemon: 'Pawniard', ev: 1, location: 'North Province (Area Two) - Fury Falls', level: '25-35', sandwich: 'steel' },
        { pokemon: 'Lokix', ev: 2, location: 'Fury Falls - North Province (Area Two)', level: '30-40', sandwich: 'grass' },
        { pokemon: 'Heracross', ev: 2, location: 'Fury Falls - North Province (Area Two)', level: '35-45', sandwich: 'grass' },
        { pokemon: 'Bisharp', ev: 2, location: 'Fury Falls - North Province (Area Two)', level: '40-50', sandwich: 'steel' },
        { pokemon: 'Paldean Tauros', ev: 2, location: 'South of Levincia', level: '20-30', sandwich: 'normal' },
        { pokemon: 'Luxray', ev: 3, location: 'Fury Falls - North Province (Area Two)', level: '40-50', sandwich: 'electric' },
        { pokemon: 'Arcanine', ev: 2, location: 'North Province (Area Two)', level: '35-45', sandwich: 'fire' }
    ],
    defense: [
        { pokemon: 'Tarountula', ev: 1, location: 'South Province (Area One)', level: '3-8', sandwich: 'bug' },
        { pokemon: 'Scatterbug', ev: 1, location: 'South Province (Area One)', level: '3-8', sandwich: 'bug' },
        { pokemon: 'Silicobra', ev: 1, location: 'Asado Desert', level: '15-25', sandwich: 'ground' },
        { pokemon: 'Rolycoly', ev: 1, location: 'East Province (Area Three)', level: '10-20', sandwich: 'steel' },
        { pokemon: 'Rellor', ev: 1, location: 'Asado Desert', level: '15-25', sandwich: 'bug' },
        { pokemon: 'Hippopotas', ev: 1, location: 'Asado Desert', level: '20-30', sandwich: 'ground' },
        { pokemon: 'Carkol', ev: 2, location: 'East Province (Area Three)', level: '20-30', sandwich: 'steel' },
        { pokemon: 'Orthworm', ev: 2, location: 'Asado Desert', level: '25-35', sandwich: 'steel' },
        { pokemon: 'Sandaconda', ev: 2, location: 'Asado Desert', level: '30-40', sandwich: 'ground' },
        { pokemon: 'Hippowdon', ev: 2, location: 'Asado Desert', level: '35-45', sandwich: 'ground' },
        { pokemon: 'Glimmora', ev: 2, location: 'Asado Desert', level: '30-40', sandwich: 'rock' }
    ],
    sp_atk: [
        { pokemon: ' Mareep', ev: 1, location: 'South Province (Area One, Two, Five)', level: '5-15', sandwich: 'electric' },
        { pokemon: 'Psyduck', ev: 1, location: 'South Province (Area One) - Río al sur de Los Platos', level: '5-15', sandwich: 'water' },
        { pokemon: 'Gastly', ev: 1, location: 'South Province (Area One, Three) / West Province', level: '5-20', sandwich: 'ghost' },
        { pokemon: 'Fletchling', ev: 1, location: 'Varias zonas', level: '3-15', sandwich: 'normal' },
        { pokemon: 'Dratini', ev: 1, location: 'Area Zero - Rivers', level: '40-50', sandwich: 'water' },
        { pokemon: 'Golduck', ev: 2, location: 'West Province - Ríos', level: '20-30', sandwich: 'water' },
        { pokemon: 'Altaria', ev: 2, location: 'Casseroya Lake / Great Crater', level: '35-45', sandwich: 'dragon' },
        { pokemon: 'Fletchinder', ev: 2, location: 'West Province (Area Three) / South Province (Area Four)', level: '25-35', sandwich: 'fire' },
        { pokemon: 'Dragonair', ev: 2, location: 'Area Zero', level: '45-55', sandwich: 'dragon' }
    ],
    sp_def: [
        { pokemon: 'Swablu', ev: 1, location: 'South Province (Area Two, Five, Six)', level: '15-25', sandwich: 'normal' },
        { pokemon: 'Toedscool', ev: 1, location: 'Socarrat Trail - North Province', level: '20-30', sandwich: 'ground' },
        { pokemon: 'Misdreavus', ev: 1, location: 'North Province (Area One)', level: '25-35', sandwich: 'ghost' },
        { pokemon: 'Girafarig', ev: 2, location: 'East of Porto Marinada / Area Zero', level: '25-40', sandwich: 'psychic' },
        { pokemon: 'Sliggoo', ev: 2, location: 'Casseroya Lake / Area Zero', level: '35-50', sandwich: 'dragon' },
        { pokemon: 'Altaria', ev: 2, location: 'Casseroya Lake / Great Crater', level: '35-45', sandwich: 'dragon' },
        { pokemon: 'Goodra', ev: 3, location: 'Area Zero', level: '50-60', sandwich: 'dragon' },
        { pokemon: 'Cetitan', ev: 2, location: 'West Province (Area Three)', level: '35-45', sandwich: 'ice' }
    ],
    speed: [
        { pokemon: 'Fletchling', ev: 1, location: 'Varias zonas', level: '3-15', sandwich: 'normal' },
        { pokemon: 'Rookidee', ev: 1, location: 'Varias zonas', level: '3-15', sandwich: 'flying' },
        { pokemon: 'Wingull', ev: 1, location: 'South Province (Areas 1, 3, 5) / Costa', level: '5-20', sandwich: 'water' },
        { pokemon: 'Buizel', ev: 1, location: 'South Province - Costa', level: '10-20', sandwich: 'water' },
        { pokemon: 'Pelipper', ev: 1, location: 'Coastal areas', level: '15-25', sandwich: 'water' },
        { pokemon: 'Fletchinder', ev: 2, location: 'West Province (Area Three) / South Province (Area Four)', level: '25-35', sandwich: 'fire' },
        { pokemon: 'Talonflame', ev: 3, location: 'Great Crater of Paldea', level: '40-50', sandwich: 'fire' },
        { pokemon: 'Crobat', ev: 2, location: 'Various caves', level: '30-40', sandwich: 'poison' },
        { pokemon: 'Flutter Mane', ev: 3, location: 'Area Zero - Twilight', level: '60-65', sandwich: 'fairy' }
    ]
};

const BEST_LOCATIONS = {
    hp: {
        location: 'Casseroya Lake',
        area: 'North Province (Area Three)',
        pokemon: ['Dondozo (+3)', 'Azumarill (+3)', 'Chansey (+2)'],
        tips: 'Usa sandwich Normal para más encuentros',
        sandwich: 'normal'
    },
    attack: {
        location: 'Fury Falls',
        area: 'North Province (Area Two)',
        pokemon: ['Luxray (+3)', 'Lokix (+2)', 'Heracross (+2)', 'Bisharp (+2)'],
        tips: 'Usa sandwich Electric para más Shinx (nivel bajo)',
        sandwich: 'electric'
    },
    defense: {
        location: 'Asado Desert',
        area: 'East Province (Area Three)',
        pokemon: ['Orthworm (+2)', 'Hippowdon (+2)', 'Sandaconda (+2)', 'Carkol (+2)'],
        tips: 'Usa sandwich Steel para más encuentros de Steel',
        sandwich: 'steel'
    },
    sp_atk: {
        location: 'West Province - Ríos',
        area: 'West Province',
        pokemon: ['Golduck (+2)', 'Psyduck (+1)', 'Altaria (+2)'],
        tips: 'Usa sandwich Water cerca de ríos',
        sandwich: 'water'
    },
    sp_def: {
        location: 'Casseroya Lake',
        area: 'North Province (Area Three)',
        pokemon: ['Sliggoo (+2)', 'Altaria (+2)', 'Girafarig (+2)'],
        tips: 'Usa sandwich Psychic o Dragon',
        sandwich: 'psychic'
    },
    speed: {
        location: 'West Province (Area Three)',
        area: 'West Province',
        pokemon: ['Fletchinder (+2)', 'Talonflame (+3)', 'Fletchling (+1)'],
        tips: 'Usa sandwich Fire para más Fletchinder',
        sandwich: 'fire'
    }
};

const SANDWICH_GUIDE = {
    hp: { type: 'normal', locations: ['South Province', 'Casseroya Lake'] },
    attack: { type: 'electric', locations: ['South Province Area Three', 'Fury Falls'] },
    defense: { type: 'steel', locations: ['Asado Desert', 'East Province'] },
    sp_atk: { type: 'fire', locations: ['West Province', 'South Province'] },
    sp_def: { type: 'psychic', locations: ['Casseroya Lake', 'Porto Marinada'] },
    speed: { type: 'grass', locations: ['West Province Area Three', 'Great Crater'] }
};

window.LOCATIONS_SV = LOCATIONS_SV;
window.BEST_LOCATIONS = BEST_LOCATIONS;
window.SANDWICH_GUIDE = SANDWICH_GUIDE;
