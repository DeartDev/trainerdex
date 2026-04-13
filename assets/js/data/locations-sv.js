const LOCATIONS_SV = {
    hp: [
        { pokemon: 'Azurill', ev: 1, location: 'South Province (Area One) - Rio al sur de Los Platos', level: 'Bajo' },
        { pokemon: 'Chansey', ev: 2, location: 'Area Zero / South Province (Area One)', level: 'Medio-Alto' },
        { pokemon: 'Marill', ev: 2, location: 'South Province (Area Five) - Cerca de Levincia', level: 'Medio' },
        { pokemon: 'Blissey', ev: 3, location: 'Area Zero / South Province (Area Six)', level: 'Alto' },
        { pokemon: 'Dondozo', ev: 3, location: 'Casseroya Lake', level: 'Alto' },
        { pokemon: 'Azumarill', ev: 3, location: 'Casseroya Lake', level: 'Medio-Alto' },
        { pokemon: 'Snorlax', ev: 3, location: 'South Province (Area Four)', level: 'Alto' }
    ],
    attack: [
        { pokemon: 'Shinx', ev: 1, location: 'South Province (Area Three) - Este de Mesagoza', level: 'Bajo' },
        { pokemon: 'Yungoos', ev: 1, location: 'South Province (Area One)', level: 'Bajo' },
        { pokemon: 'Lokix', ev: 2, location: 'Fury Falls - North Province (Area Two)', level: 'Medio' },
        { pokemon: 'Luxray', ev: 3, location: 'Fury Falls - North Province (Area Two)', level: 'Alto' },
        { pokemon: 'Heracross', ev: 2, location: 'Fury Falls - North Province (Area Two)', level: 'Medio-Alto' },
        { pokemon: 'Bisharp', ev: 2, location: 'Fury Falls - North Province (Area Two)', level: 'Alto' },
        { pokemon: 'Paldean Tauros', ev: 2, location: 'South of Levincia', level: 'Medio' }
    ],
    defense: [
        { pokemon: 'Tarountula', ev: 1, location: 'South Province (Area One)', level: 'Bajo' },
        { pokemon: 'Scatterbug', ev: 1, location: 'South Province (Area One)', level: 'Bajo' },
        { pokemon: 'Silicobra', ev: 1, location: 'Asado Desert', level: 'Bajo' },
        { pokemon: 'Rolycoly', ev: 1, location: 'East Province (Area Three)', level: 'Bajo' },
        { pokemon: 'Carkol', ev: 2, location: 'East Province (Area Three)', level: 'Medio' },
        { pokemon: 'Orthworm', ev: 2, location: 'Asado Desert', level: 'Medio-Alto' },
        { pokemon: 'Hippowdon', ev: 2, location: 'Asado Desert', level: 'Alto' },
        { pokemon: 'Sandaconda', ev: 2, location: 'Asado Desert', level: 'Alto' }
    ],
    sp_atk: [
        { pokemon: 'Psyduck', ev: 1, location: 'South Province (Area One) - Río al sur de Los Platos', level: 'Bajo' },
        { pokemon: ' Mareep', ev: 1, location: 'South Province (Area One, Two, Five)', level: 'Bajo' },
        { pokemon: 'Gastly', ev: 1, location: 'South Province (Area One, Three) / West Province', level: 'Bajo' },
        { pokemon: 'Golduck', ev: 2, location: 'West Province - Río', level: 'Medio' },
        { pokemon: 'Fletchling', ev: 1, location: 'Varias zonas', level: 'Bajo' },
        { pokemon: 'Altaria', ev: 2, location: 'Casseroya Lake / Great Crater', level: 'Medio-Alto' }
    ],
    sp_def: [
        { pokemon: 'Swablu', ev: 1, location: 'South Province (Area Two, Five, Six)', level: 'Bajo' },
        { pokemon: 'Toedscool', ev: 1, location: 'Socarrat Trail - North Province', level: 'Bajo' },
        { pokemon: 'Sliggoo', ev: 2, location: 'Casseroya Lake / Area Zero', level: 'Medio-Alto' },
        { pokemon: 'Altaria', ev: 2, location: 'Casseroya Lake / Great Crater', level: 'Medio-Alto' },
        { pokemon: 'Girafarig', ev: 2, location: 'East of Porto Marinada / Area Zero', level: 'Medio' },
        { pokemon: 'Misdreavus', ev: 1, location: 'North Province (Area One)', level: 'Bajo' }
    ],
    speed: [
        { pokemon: 'Fletchling', ev: 1, location: 'Varias zonas', level: 'Bajo' },
        { pokemon: 'Rookidee', ev: 1, location: 'Varias zonas', level: 'Bajo' },
        { pokemon: 'Wingull', ev: 1, location: 'South Province (Areas 1, 3, 5) / Costa', level: 'Bajo' },
        { pokemon: 'Buizel', ev: 1, location: 'South Province - Costa', level: 'Bajo' },
        { pokemon: 'Fletchinder', ev: 2, location: 'West Province (Area Three) / South Province (Area Four)', level: 'Medio' },
        { pokemon: 'Talonflame', ev: 3, location: 'Great Crater of Paldea', level: 'Alto' }
    ]
};

const BEST_LOCATIONS = {
    hp: { location: 'Casseroya Lake', pokemon: ['Dondozo', 'Azumarill', 'Chansey'], evYield: '2-3' },
    attack: { location: 'Fury Falls - North Province (Area Two)', pokemon: ['Luxray', 'Lokix', 'Heracross'], evYield: '2-3' },
    defense: { location: 'Asado Desert', pokemon: ['Orthworm', 'Hippowdon', 'Sandaconda'], evYield: '2' },
    sp_atk: { location: 'West Province - Rivers', pokemon: ['Golduck', 'Psyduck'], evYield: '1-2' },
    sp_def: { location: 'Casseroya Lake', pokemon: ['Sliggoo', 'Altaria'], evYield: '2' },
    speed: { location: 'West Province (Area Three)', pokemon: ['Fletchinder', 'Talonflame'], evYield: '2-3' }
};

window.LOCATIONS_SV = LOCATIONS_SV;
window.BEST_LOCATIONS = BEST_LOCATIONS;
