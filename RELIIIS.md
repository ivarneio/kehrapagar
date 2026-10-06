# Reliis

Siin on sammud, mis käivad reliisi ajal. Koodi see fail ei muuda. Külastaja seda ei loe.

Sünk ei käi taustal. Sünk ei käi ka siis, kui klient lehe avab. Selle käivitab reliis, käsitsi. Praegu teen selle sammu siin vestluses, kui eesti tekst on muutunud. Hiljem teeb sama Google'i makro, mis kleebitakse kontole. Siit vestlusest makrot ei käivitata.

## Sammud

1. Eesti tekst on allikas. Inimene muudab ainult seda. Praegu on allikas `tekstid.json` võti `et`. Hiljem on allikas Google'i tabeli eesti veerg.
2. Võrdle eesti teksti eelmise reliisiga. Võti, mis ei muutunud, jääb puutumata. Vene ja inglise seda rida ei kirjutata üle.
3. Muutunud eesti rida tõlgitakse uuesti vene ja inglise keelde. Tulemus kirjutatakse samasse faili, võtmete `ru` ja `en` alla.
4. Kui tõlget pole, näitab leht eesti teksti. Leht ei tõlgi ise.
5. Kirjavead raporteeritakse eraldi märkusena. Parandatud kirjaviga ei ole reliisi ebaõnnestumine.
6. Valmis fail kopeeritakse lehele. Testis on see see repo. Hiljem on see Zone'i koopia. Külastaja loeb ainult seda koopiat.
7. Kui real on märge «ära tõlgi üle», jäetakse vene ja inglise alles. See on toidunime ja allergeeni jaoks.

Tellimused, uudiskiri ja pildid ei ole selle süngi osa. Tellimus ei lähe tõlkefaili.

## Mis on juba lehel

- Keelevalik loeb `tekstid.json`. `?keel=ru` ja `?keel=en` avavad vastava keele. Valik jääb meelde.
- Tootenimed ja täidised ei vahetu. Need tulevad hiljem sisufailist.
- Firmast ja Kauplus ei ole pealehe kerimises. Päis avab `firmast.html` ja `kauplus.html`. Kontakt jääb pealehele.

## Järgmine

- Kui eesti teksti muudetakse, käib samm 2–6 enne, kui muudatus lehele jääb.
- Google'i tabel ja makro on hilisem tõste. Testleht ei oota seda. Seni on allikas `tekstid.json`.

## Tehtud

- Keelefail ja nupud. 2026-10-06. Sünk: eesti võtmed said ru ja en samas failis. Uusi võtmeid hiljem ei lisandunud.
- Firmast ja Kauplus oma lehtedena. 2026-10-06. Eesti teksti ei muudetud, seega ru ja en jäid puutumata.

## Märkused

- Eesti silt «Tee» on tõlgitud «Вариант» ja «Choice». See on valik, mitte jook. Reliisi ei peatatud.
