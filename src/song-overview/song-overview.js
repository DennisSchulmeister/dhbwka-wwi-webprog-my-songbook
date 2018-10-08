/*
 * My Songbook - Beispielanwendung der Anleitung zur Entwicklung einer Browser App
 *
 * © 2018 Dennis Schulmeister-Zimolong <dhbw@windows3.de>
 * Lizenz: Creative Commons Namensnennung 4.0 International
 *
 * Sie dürfen:
 *
 *     Teilen — das Material in jedwedem Format oder Medium vervielfältigen
 *     und weiterverbreiten
 *
 *     Bearbeiten — das Material remixen, verändern und darauf aufbauen
 *     und zwar für beliebige Zwecke, sogar kommerziell.
 *
 * Unter folgenden Bedingungen:
 *
 *     Namensnennung — Sie müssen angemessene Urheber- und Rechteangaben
 *     machen, einen Link zur Lizenz beifügen und angeben, ob Änderungen
 *     vorgenommen wurden. Diese Angaben dürfen in jeder angemessenen Art
 *     und Weise gemacht werden, allerdings nicht so, dass der Eindruck
 *     entsteht, der Lizenzgeber unterstütze gerade Sie oder Ihre Nutzung
 *     besonders.
 *
 *     Keine weiteren Einschränkungen — Sie dürfen keine zusätzlichen Klauseln
 *     oder technische Verfahren einsetzen, die anderen rechtlich irgendetwas
 *     untersagen, was die Lizenz erlaubt.
 *
 * Es werden keine Garantien gegeben und auch keine Gewähr geleistet.
 * Die Lizenz verschafft Ihnen möglicherweise nicht alle Erlaubnisse,
 * die Sie für die jeweilige Nutzung brauchen. Es können beispielsweise
 * andere Rechte wie Persönlichkeits- und Datenschutzrechte zu beachten
 * sein, die Ihre Nutzung des Materials entsprechend beschränken.
 */
"use strict";

import stylesheet from "./song-overview.css";
import Database from "../database.js";

/**
 * View mit der Übersicht der vorhandenen Songs.
 */
class SongOverview {
    /**
     * Konstruktor,
     * @param {Objekt} app Zentrales App-Objekt der Anwendung
     */
    constructor(app) {
        this._app = app;

        // Test der Datenbankklasse für Songtexte
        let test = async () => {
            let songtexts = new Database.Songtexts();
            await songtexts.clear();

            let songs = await songtexts.search();
            console.log("Alle Songs:", songs);

            if (songs.length === 0) {
                console.log("Bisher noch keine Songs vorhanden, lege deshalb Testdaten an");

                await Promise.all([
                    songtexts.saveNew({
                        artist: "Queen",
                        title: "I Want To Break Free",
                        format: "html",
                        data: "HTML-Code für <b>I Want To Break Free</b> von <b>Queen</b>",
                    }),
                    songtexts.saveNew({
                        artist: "Queen",
                        title: "Radio Ga Ga",
                        format: "html",
                        data: "HTML-Code für <b>Radio Ga Ga</b> von <b>Queen</b>",
                    }),
                    songtexts.saveNew({
                        artist: "Michael Jackson",
                        title: "Billie Jean",
                        format: "html",
                        data: "HTML-Code für <b>Billie Jean</b> von <b>Michael Jackson</b>",
                    }),
                ]);

                let songs = await songtexts.search();
                console.log("Gespeicherte Songs:", songs);
            }

            songs = await songtexts.search("queen");
            console.log('Suche nach dem Begriff "queen":', songs);
        }

        test();
        // Ende des Testcodes
    }

    /**
     * Von der Klasse App aufgerufene Methode, um die Seite anzuzeigen. Die
     * Methode gibt daher ein passendes Objekt zurück, das an die Methode
     * _switchVisibleContent() der Klasse App übergeben werden kann, um ihr
     * die darzustellenden DOM-Elemente mitzuteilen.
     *
     * @return {Object} Darzustellende DOM-Elemente gemäß Beschreibung der
     * Methode App._switchVisibleContent()
     */
    onShow() {
        let section = document.querySelector("#song-overview").cloneNode(true);

        return {
            className: "song-overview",
            topbar: section.querySelectorAll("header > *"),
            main: section.querySelectorAll("main > *"),
        };
    }

    /**
     * Von der Klasse App aufgerufene Methode, um festzustellen, ob der Wechsel
     * auf eine neue Seite erlaubt ist. Wird hier true zurückgegeben, wird der
     * Seitenwechsel ausgeführt.
     *
     * @param  {Function} goon Callback, um den Seitenwechsel zu einem späteren
     * Zeitpunkt fortzuführen, falls wir hier false zurückgeben
     * @return {Boolean} true, wenn der Seitenwechsel erlaubt ist, sonst false
     */
    onLeave(goon) {
        return true;
    }

    /**
     * @return {String} Titel für die Titelzeile des Browsers
     */
    get title() {
        return "Übersicht";
    }
}

export default SongOverview;
