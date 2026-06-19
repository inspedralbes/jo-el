# JOEL → Moodle Sync

Script de Tampermonkey per facilitar el traspàs de qualificacions entre JO-EL i Moodle.

## Característiques

- 📤 Exportació de notes des de JO-EL.
- 📊 Conversió automàtica dels problemes resolts a una nota sobre 10.
- 🔢 Arrodoniment automàtic a 1 decimal.
- 📥 Importació automàtica de les notes a Moodle.
- 🎯 Assignació de notes a partir de l'usuari institucional (part anterior a la `@` del correu).
- 🟢 Ressaltat visual dels alumnes modificats.
- 💾 Emmagatzematge temporal de les notes al navegador mitjançant Tampermonkey.
- 🔄 Actualitzacions automàtiques del script a través de GitHub.

## Requisits

- Navegador compatible amb extensions (Chrome, Edge, Firefox, Brave...)
- Extensió Tampermonkey instal·lada

Tampermonkey:

- Chrome / Edge / Brave: https://www.tampermonkey.net/
- Firefox: https://www.tampermonkey.net/

## Instal·lació

### Instal·lació directa

👉 **[Instal·lar l'script](https://raw.githubusercontent.com/inspedralbes/jo-el/main/scripts/joel-moodle-sync.user.js)**

Si Tampermonkey està instal·lat, s'obrirà automàticament la pantalla d'instal·lació.

## Funcionament

### 1. Exportar notes des de JO-EL

Obre la pàgina d'estadístiques de JO-EL corresponent a l'activitat.

Apareixerà un botó:

```text
📤 Exportar JO-EL
```

En prémer-lo:

- Es llegeixen els usuaris de la taula.
- Es calcula la nota sobre 10.
- Es guarden les notes al navegador.

### 2. Importar notes a Moodle

Obre la pàgina de qualificació de la tasca a Moodle.

Apareixerà un botó:

```text
📥 Importar JO-EL
```

En prémer-lo:

- Es recuperen les notes exportades.
- Es localitza cada alumne pel seu correu institucional.
- S'omple automàticament el camp de qualificació ràpida.
- Es ressalten les files modificades.

### 3. Guardar les qualificacions

Després de la importació, utilitza el botó habitual de Moodle:

```text
Desa tots els canvis de qualificació ràpida
```

per fer efectius els canvis.

## Compatibilitat

Actualment provat amb:

- JO-EL (`jo-el.es`)
- Moodle de l'Institut Pedralbes (`campus.institutpedralbes.cat`)

## Limitacions

- L'alumne ha de tenir el mateix identificador a JO-EL que al correu institucional de Moodle (part anterior a `@`).
- Si canvia l'estructura de les taules de JO-EL o Moodle, pot ser necessari actualitzar el script.

## Versions

### v1.0.0
- Primera versió pública.
- Exportació de notes des de JO-EL.
- Conversió automàtica de problemes resolts a nota sobre 10.
- Importació de notes a Moodle.
- Arrodoniment a 1 decimal.
- Ressaltat dels alumnes modificats.

## Actualitzacions

El script comprova automàticament si hi ha versions noves gràcies a Tampermonkey.

Per actualitzar manualment:

1. Obre el Tauler de Tampermonkey.
2. Selecciona **Check for userscript updates**.
3. Instal·la la nova versió si està disponible.

## Llicència

MIT License
