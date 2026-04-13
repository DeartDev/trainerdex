const NATURES_ES = {
    hardy: { nombre: 'Valiente', plus: 'attack', minus: 'sp_atk', icono: '⚔️' },
    lonely: { nombre: 'Aggressive', plus: 'attack', minus: 'defense', icono: '😠' },
    brave: { nombre: 'Audaz', plus: 'attack', minus: 'speed', icono: '🦁' },
    adamant: { nombre: 'Adament', plus: 'attack', minus: 'sp_atk', icono: '💪' },
    naughty: { nombre: 'Poker', plus: 'attack', minus: 'sp_def', icono: '😈' },
    bold: { nombre: 'Audaz', plus: 'defense', minus: 'attack', icono: '🛡️' },
    docile: { nombre: 'Dócil', plus: 'defense', minus: 'sp_atk', icono: '😇' },
    relaxed: { nombre: 'Relaxed', plus: 'defense', minus: 'speed', icono: '😴' },
    impish: { nombre: 'Juguetón', plus: 'defense', minus: 'sp_atk', icono: '🎭' },
    lax: { nombre: 'Alegre', plus: 'defense', minus: 'sp_def', icono: '😜' },
    timid: { nombre: 'Tímido', plus: 'speed', minus: 'attack', icono: '😰' },
    hasty: { nombre: 'Apresurado', plus: 'speed', minus: 'defense', icono: '🏃' },
    jolly: { nombre: 'Alegre', plus: 'speed', minus: 'sp_atk', icono: '😊' },
    naive: { nombre: 'Ingenuo', plus: 'speed', minus: 'sp_def', icono: '😝' },
    modest: { nombre: 'Modesto', plus: 'sp_atk', minus: 'attack', icono: '📚' },
    mild: { nombre: 'Suave', plus: 'sp_atk', minus: 'defense', icono: '🍵' },
    quiet: { nombre: 'Tranquilo', plus: 'sp_atk', minus: 'speed', icono: '🤫' },
    rash: { nombre: 'Alocado', plus: 'sp_atk', minus: 'sp_def', icono: '🤪' },
    calm: { nombre: 'Calmado', plus: 'sp_def', minus: 'attack', icono: '😌' },
    gentle: { nombre: 'Amable', plus: 'sp_def', minus: 'defense', icono: '💕' },
    sassy: { nombre: 'Grosero', plus: 'sp_def', minus: 'speed', icono: '😏' },
    careful: { nombre: 'Cuidadoso', plus: 'sp_def', minus: 'sp_atk', icono: '🔍' },
    quirky: { nombre: 'Raro', plus: 'sp_def', minus: 'defense', icono: '🤨' },
    bashful: { nombre: 'Tímido', plus: 'sp_def', minus: 'sp_atk', icono: '😊' },
    serious: { nombre: 'Serio', plus: 'speed', minus: 'defense', icono: '🤓' }
};

const STAT_NAMES_ES = {
    hp: 'PS',
    attack: 'Ataque',
    defense: 'Defensa',
    sp_atk: 'At. Esp.',
    sp_def: 'Def. Esp.',
    speed: 'Velocidad'
};

const RECOMMENDED_NATURES = {
    hp: ['bold', 'impish', 'relaxed'],
    attack: ['adamant', 'jolly', 'naughty'],
    defense: ['bold', 'impish', 'relaxed'],
    sp_atk: ['modest', 'timid', 'mild'],
    sp_def: ['calm', 'careful', 'gentle'],
    speed: ['jolly', 'timid', 'naive']
};

window.NATURES_ES = NATURES_ES;
window.STAT_NAMES_ES = STAT_NAMES_ES;
window.RECOMMENDED_NATURES = RECOMMENDED_NATURES;
