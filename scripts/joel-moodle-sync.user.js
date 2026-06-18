// ==UserScript==
// @name         JOEL → Moodle Auto Grades
// @namespace    https://github.com/el-teu-usuari/joel-moodle-sync
// @version      1.0.0
// @description  Importa notes de JOEL a Moodle
// @author       gerard-inspedralbes
// @match        https://jo-el.es/*
// @match        https://campus.institutpedralbes.cat/*
// @grant        GM_setValue
// @grant        GM_getValue
//
// @downloadURL  https://github.com/inspedralbes/jo-el/scripts/joel-moodle-sync.user.js
// @updateURL    https://github.com/inspedralbes/jo-el/scripts/joel-moodle-sync.user.js
// ==/UserScript==

(function () {
    'use strict';

    console.log("JOEL-Moodle script carregat");

    // =========================
    // 🔵 JO-EL: EXTRACCIÓ
    // =========================
    function llegirJoelStats() {
        const result = {};

        const rows = document.querySelectorAll("tr");

        rows.forEach(tr => {
            const cells = tr.querySelectorAll("td, th");
            if (cells.length < 2) return;

            const user = cells[0].textContent.trim();

            // filtrar usuaris tipus a25...
            if (!/^a\d+[a-z]+/.test(user)) return;

            // trobar columna "Problems Solved" de forma robusta
            let solved = null;

            for (let i = 0; i < cells.length; i++) {
                const text = cells[i].textContent.trim();
                const val = parseInt(text, 10);

                if (!isNaN(val)) {
                    solved = val;
                }
            }

            if (solved !== null) {
                result[user] = solved;
            }
        });

        return result;
    }

    function calcularNotes() {

        const stats = llegirJoelStats();

        const headerRow =
            document.querySelector("table thead tr") ||
            document.querySelector("table tr");

        const n = headerRow ? headerRow.querySelectorAll("th, td").length : 0;
        const max = n - 2;

        console.log("Stats:", stats);
        console.log("Columnes:", n, "Max:", max);

        const notes = {};

        for (const [usr, solved] of Object.entries(stats)) {
            let nota = (solved / max) * 10;

            if (!isFinite(nota)) nota = 0;

            // 1 decimal
            nota = Math.round(nota * 10) / 10;

            notes[usr] = nota;
        }

        GM_setValue("joelNotes", JSON.stringify(notes));

        alert(`✔ Notes guardades: ${Object.keys(notes).length}`);
        console.log("NOTES:", notes);
    }

    // =========================
    // 🟢 MOODLE: APLICAR
    // =========================
    function aplicarNotesMoodle() {

        const notes = JSON.parse(GM_getValue("joelNotes", "{}"));

        console.log("IMPORTANT NOTES:", notes);

        let count = 0;

        document.querySelectorAll("tr[id^='mod_assign_grading']").forEach(tr => {

            const email = tr.querySelector("td.email")?.textContent?.trim();
            if (!email) return;

            const user = email.split("@")[0];

            if (!(user in notes)) return;

            const input = tr.querySelector("input[id^='quickgrade_']");
            if (!input) return;

            const nota = notes[user];

            input.value = nota.toFixed(1);
            input.dispatchEvent(new Event("input", { bubbles: true }));

            tr.style.backgroundColor = "#d4ffd4";

            count++;
        });

        alert(`✔ Notes aplicades a ${count} alumnes`);
    }

    // =========================
    // 🧩 BOTONS UI
    // =========================

    function crearBoto(text, top, color, onClick) {
        const b = document.createElement("button");

        b.textContent = text;

        Object.assign(b.style, {
            position: "fixed",
            top: top,
            right: "10px",
            zIndex: 99999,
            padding: "10px",
            background: color,
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "6px",
            fontWeight: "bold"
        });

        b.onclick = onClick;

        document.body.appendChild(b);
    }

    // =========================
    // 🚦 EXECUCIÓ SEGONS PÀGINA
    // =========================

    if (location.hostname === "jo-el.es") {
        crearBoto("📤 Exportar JO-EL", "10px", "#2196F3", calcularNotes);
    }

    if (location.hostname.includes("campus")) {
        crearBoto("📥 Importar JO-EL", "10px", "#4CAF50", aplicarNotesMoodle);
    }

})();
