# TrainerDex 🐾

Herramienta de entrenamiento competitivo para **Pokémon Scarlet & Violet**. Permite buscar un Pokémon, configurar tus objetivos de EVs y generar un plan de entrenamiento paso a paso.

![TrainerDex](https://img.shields.io/badge/Version-1.0.0-blue)
![HTML5](https://img.shields.io/badge/HTML5-CSS3-JS-green)
![PokéAPI](https://img.shields.io/badge/Powered-PokéAPI-red)

## ✨ Características

- 🔍 **Búsqueda de Pokémon** - Consume la PokéAPI v2 para obtener datos
- 📊 **Stats Base** - Visualiza los stats base de cualquier Pokémon
- ⚡ **EV Yield** - Muestra cuántos EVs otorga cada Pokémon al derrotarlo
- 🎯 **Configuración de Entrenamiento** - Selecciona los stats objetivo (0-252 EVs)
- 💊 **Vitaminas** - Calcula cuántas vitaminas necesitas
- 🎒 **Power Items** - Recomienda objetos de poder (+8 EVs/combate)
- ⚔️ **Plan de Batallas** - Indica cuántos Pokémon derrotar y dónde
- 🌿 **Naturalezas** - Recomienda la mejor naturaleza según tu build
- 🔄 **Reset de EVs** - Calcula cuántas berries necesitas para reducir EVs
- 🌓 **Tema Oscuro/Claro** - Toggle para cambiar entre temas
- 💾 **Búsquedas Recientes** - Guarda tu historial de búsquedas

## 🚀 Uso

1. Abre `index.html` en tu navegador
2. Escribe el nombre de un Pokémon (ej: `charizard`, `pikachu`, `gengar`)
3. Presiona **Enter** o click en el botón de búsqueda
4. En el panel izquierdo, configura los EVs objetivo para cada stat
5. Click en **"Generar plan de entrenamiento"**
6. ¡Sigue las instrucciones en pantalla!

## 📁 Estructura del Proyecto

```
trainerdex/
├── index.html                 # Punto de entrada
├── README.md                  # Este archivo
├── assets/
│   ├── css/
│   │   ├── main.css          # Estilos globales
│   │   ├── components.css    # Componentes UI
│   │   └── themes.css        # Variables de tema
│   └── js/
│       ├── api/
│       │   ├── pokeapi.js    # Cliente PokéAPI
│       │   └── cache.js      # Cache localStorage
│       ├── data/
│       │   ├── natures.js    # Naturalezas (25)
│       │   ├── items.js      # Vitaminas, power items, berries
│       │   └── locations-sv.js # Ubicaciones SV
│       ├── utils/
│       │   ├── helpers.js    # Utilidades
│       │   ├── calculator.js # Calculadora de EVs
│       │   └── trainer.js    # Motor de planes
│       └── app.js            # Lógica principal
```

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Variables CSS, Flexbox, Grid
- **JavaScript ES6+** - Vanilla JS (sin frameworks)
- **PokéAPI v2** - Datos de Pokémon
- **LocalStorage** - Cache y búsquedas recientes

## 📋 Datos Incluidos

### Vitaminas (+10 EVs cada una)
| Stat | Vitamia |
|------|---------|
| HP | HP Up |
| Attack | Protein |
| Defense | Iron |
| Sp. Atk | Calcium |
| Sp. Def | Zinc |
| Speed | Carbos |

### Power Items (+8 EVs/combate)
| Stat | Objeto |
|------|--------|
| HP | Power Weight |
| Attack | Power Bracer |
| Defense | Power Belt |
| Sp. Atk | Power Lens |
| Sp. Def | Power Band |
| Speed | Power Anklet |

### Berries de Reset (-10 EVs cada una)
| Stat | Berry |
|------|-------|
| HP | Pomeg |
| Attack | Kelpsy |
| Defense | Qualot |
| Sp. Atk | Hondew |
| Sp. Def | Grepa |
| Speed | Tamato |

## 🌎 Despliegue en GitHub Pages

```bash
# 1. Crea el repositorio en GitHub (nombre: trainerdex)

# 2. Clona y sube los archivos
git init
git add .
git commit -m "TrainerDex v1.0"
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

## 📄 Licencia

MIT License - Puedes usar, modificar y distribuir este proyecto.

---

*Entrena inteligente, vence fácil* 🏆
