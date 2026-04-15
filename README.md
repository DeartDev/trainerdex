# TrainerDex 🐾

Herramienta de entrenamiento competitivo para **Pokémon Scarlet & Violet**. Permite buscar un Pokémon, configurar tus objetivos de EVs y generar un plan de entrenamiento paso a paso con recomendaciones detalladas.

Visita el sitio: https://deartdev.github.io/trainerdex/

![TrainerDex](https://img.shields.io/badge/Version-2.1.0-blue)
![HTML5](https://img.shields.io/badge/HTML5-CSS3-JS-green)
![PokéAPI](https://img.shields.io/badge/Powered-PokéAPI-red)

## ✨ Características

- 🔍 **Búsqueda de Pokémon** - Consume la PokéAPI v2 para obtener datos
- 📊 **Stats Base** - Visualiza los stats base de cualquier Pokémon con colores por stat
- ⚡ **EV Yield** - Muestra cuántos EVs otorga cada Pokémon al derrotarlo
- 🎯 **Configuración de Entrenamiento** - Selecciona los stats objetivo (0-252 EVs)
- 💊 **Vitaminas** - Calcula cuántas vitaminas necesitas, dónde comprarlas y costo
- 🎒 **Power Items** - Recomienda objetos de poder (+8 EVs/combate) con ubicación
- ⚔️ **Plan de Batallas Detallado** - Por cada stat: 2-3 Pokémon recomendados, ubicación, nivel, cuántos defeat
- 🥪 **Sandwiches** - Recomienda sandwiches para encontrar más Pokémon del tipo deseado
- 🌿 **Naturalezas** - Recomienda la mejor naturaleza + cómo cambiarla (Mentas)
- 🔄 **Reset de EVs** - Calcula cuántas berries necesitas y dónde conseguirlas
- 🌓 **Tema Oscuro/Claro** - Toggle para cambiar entre temas
- 💾 **Búsquedas Recientes** - Guarda tu historial de búsquedas

## 🎨 Sistema de Colores

### Tema OSCURO (Dark Mode)

#### Paleta Principal

| Elemento  | Color     | Uso                           |
| --------- | --------- | ----------------------------- |
| Primary   | `#60A5FA` | Botones, enlaces, acciones    |
| Secondary | `#FDE047` | Hover, highlights, selección  |
| Accent    | `#FB7185` | Alertas, acciones importantes |

#### Neutrales

| Elemento      | Color     |
| ------------- | --------- |
| Background    | `#0B1120` |
| Surface       | `#111827` |
| Elevated Card | `#1F2937` |
| Border        | `#334155` |

#### Texto

| Elemento       | Color     |
| -------------- | --------- |
| Primary text   | `#E5E7EB` |
| Secondary text | `#9CA3AF` |
| Muted          | `#6B7280` |

#### Estados

| Estado  | Color     |
| ------- | --------- |
| Success | `#4ADE80` |
| Warning | `#FBBF24` |
| Error   | `#F87171` |

---

### Tema CLARO (Light Mode)

#### Paleta Principal

| Elemento  | Color     | Uso                           |
| --------- | --------- | ----------------------------- |
| Primary   | `#3B82F6` | Botones principales, enlaces  |
| Secondary | `#FACC15` | Hover, highlights             |
| Accent    | `#F43F5E` | Alertas, acciones importantes |

#### Neutrales

| Elemento      | Color     |
| ------------- | --------- |
| Background    | `#F8FAFC` |
| Surface       | `#F1F5F9` |
| Elevated Card | `#E2E8F0` |
| Border        | `#E2E8F0` |

#### Texto

| Elemento       | Color     |
| -------------- | --------- |
| Primary text   | `#0F172A` |
| Secondary text | `#475569` |
| Muted          | `#94A3B8` |

#### Estados

| Estado  | Color     |
| ------- | --------- |
| Success | `#22C55E` |
| Warning | `#F59E0B` |
| Error   | `#EF4444` |

---

### Colores por Stat

| Stat    | Dark Mode | Light Mode |
| ------- | --------- | ---------- |
| HP      | `#4ADE80` | `#22C55E`  |
| Attack  | `#F87171` | `#EF4444`  |
| Defense | `#60A5FA` | `#3B82F6`  |
| Sp. Atk | `#FACC15` | `#F59E0B`  |
| Sp. Def | `#A78BFA` | `#8B5CF6`  |
| Speed   | `#FB7185` | `#F43F5E`  |

---

### Reglas de Uso

**Jerarquía clara:**

- 1 color dominante → Primary (botones, acciones principales)
- 1 color de acción → Secondary (hover, selección)
- 1 color de alerta → Accent (errores, advertencias)

**No mezcles todo o parecerá carnaval.**

**Ejemplo en la app:**

- Botón "Generar plan" → Primary
- Stat seleccionado (252 EVs) → Secondary
- Error EV overflow → Accent

**UX clave:**

- Cada stat tiene su propio color (verde HP, rojo Attack, etc.)
- El usuario entiende sin leer

## 🚀 Uso

1. Abre `index.html` en tu navegador
2. Escribe el nombre de un Pokémon (ej: `charizard`, `pikachu`, `gengar`)
3. Presiona **Enter** o click en el botón de búsqueda
4. Verás los stats base y EV yield del Pokémon
5. En el panel izquierdo, configura los EVs objetivo para cada stat
6. Click en **"Generar plan de entrenamiento"**
7. ¡Sigue las instrucciones detalladas en pantalla!

## 📁 Estructura del Proyecto

```
trainerdex/
├── index.html                 # Punto de entrada
├── README.md                  # Este archivo
├── assets/
│   ├── css/
│   │   ├── main.css          # Estilos globales
│   │   ├── components.css    # Componentes UI
│   │   └── themes.css        # Variables de tema + colores por stat
│   └── js/
│       ├── api/
│       │   ├── pokeapi.js    # Cliente PokéAPI
│       │   └── cache.js      # Cache localStorage
│       ├── data/
│       │   ├── natures.js    # Naturalezas (25) + ments
│       │   ├── items.js      # Vitaminas, power items, berries, mints
│       │   └── locations-sv.js # Ubicaciones SV + sandwiches
│       ├── utils/
│       │   ├── helpers.js    # Utilidades
│       │   ├── calculator.js # Calculadora de EVs
│       │   ├── instructions.js # Generación de instrucciones detalladas
│       │   └── trainer.js    # Motor de planes
│       └── app.js            # Lógica principal + UI
```

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Variables CSS, Flexbox, Grid, colores por stat
- **JavaScript ES6+** - Vanilla JS (sin frameworks)
- **PokéAPI v2** - Datos de Pokémon
- **LocalStorage** - Cache y búsquedas recientes

## 📋 Datos Incluidos

### Vitaminas (+10 EVs cada una)

| Stat    | Vitamia | Ubicación      | Precio  |
| ------- | ------- | -------------- | ------- |
| HP      | HP Up   | Chansey Supply | ₽10,000 |
| Attack  | Protein | Chansey Supply | ₽10,000 |
| Defense | Iron    | Chansey Supply | ₽10,000 |
| Sp. Atk | Calcium | Chansey Supply | ₽10,000 |
| Sp. Def | Zinc    | Chansey Supply | ₽10,000 |
| Speed   | Carbos  | Chansey Supply | ₽10,000 |

### Power Items (+8 EVs/combate)

| Stat    | Objeto       | Ubicación         | Precio  |
| ------- | ------------ | ----------------- | ------- |
| HP      | Power Weight | Delibird Presents | ₽10,000 |
| Attack  | Power Bracer | Delibird Presents | ₽10,000 |
| Defense | Power Belt   | Delibird Presents | ₽10,000 |
| Sp. Atk | Power Lens   | Delibird Presents | ₽10,000 |
| Sp. Def | Power Band   | Delibird Presents | ₽10,000 |
| Speed   | Power Anklet | Delibird Presents | ₽10,000 |

### Berries de Reset (-10 EVs cada una)

| Stat    | Berry        | Ubicación                     |
| ------- | ------------ | ----------------------------- |
| HP      | Pomeg Berry  | Asado Desert, West Province   |
| Attack  | Kelpsy Berry | Asado Desert, South Province  |
| Defense | Qualot Berry | Asado Desert, West Province   |
| Sp. Atk | Hondew Berry | West Province, Area Zero      |
| Sp. Def | Grepa Berry  | West Province, Casseroya Lake |
| Speed   | Tamato Berry | South Province                |

### Mentas para Cambiar Naturaleza

| Naturaleza | Menta        | Precio | Ubicación                |
| ---------- | ------------ | ------ | ------------------------ |
| Adamant    | Adamant Mint | ₽1,000 | Casual Branch (Mesagoza) |
| Jolly      | Jolly Mint   | ₽1,000 | Casual Branch (Mesagoza) |
| Bold       | Bold Mint    | ₽1,000 | Casual Branch (Mesagoza) |
| Modest     | Modest Mint  | ₽1,000 | Casual Branch (Mesagoza) |
| Timid      | Timid Mint   | ₽1,000 | Casual Branch (Mesagoza) |
| Calm       | Calm Mint    | ₽1,000 | Casual Branch (Mesagoza) |

## 🎯 Ejemplo de Plan de Entrenamiento

Para un Pokémon con Attack 252 EVs y Speed 252 EVs:

### Por cada stat verás:

1. **Desglose de EVs**: Vitaminas + Batallas
2. **Power Item**: Si está equipado (+8 EVs/batalla)
3. **Total de batallas** necesarias
4. **2-3 Pokémon** recomendados con:
   - Nombre y EVs que otorgan
   - Cantidad de KOs necesarios
   - Ubicación exacta
   - Nivel recomendado
   - Sandwich recomendado

## 🌎 Despliegue en GitHub Pages

```bash
# 1. Crea el repositorio en GitHub (nombre: trainerdex)

# 2. Clona y sube los archivos
git init
git add .
git commit -m "TrainerDex v2.0"
git remote add origin https://github.com/TU_USUARIO/trainerdex.git
git push -u origin main

# 3. Configura GitHub Pages:
#    Settings → Pages → Source: Deploy from a branch
#    Branch: main, Folder: / (root)
#    Click Save

# 4. Accede a: https://TU_USUARIO.github.io/trainerdex/
```

## 📝 Notas

- Los datos de EV Yield provienen de la PokéAPI (campo `effort`)
- Las ubicaciones de entrenamiento están basadas en guías de Scarlet & Violet
- El límite de EVs es 252 por stat y 510 en total
- Las vitaminas dan máximo 100 EVs por stat (10 unidades)
- Los power items se compran en Delibird Presents (Mesagoza, Levincia, Cascarrafa)
- Las mentas se compran en Casual Branch (Mesagoza)
- Los sandwiches potencian los encuentros del tipo especificado

## 📄 Licencia

MIT License - Puedes usar, modificar y distribuir este proyecto.

---

_Entrena inteligente, vence fácil_ 🏆 - TerWorks - DeartDev

