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
- Tootegrupid on üksteise all ka desktopis. Kõrvuti võrku ei ole.
- Valitud grupp tõuseb üles ja lükkab teised alla, nagu `ivarneio/balloons`. Liikumine on 0,8 sekundit. Sulgemine toob kaardi oma kohale tagasi.
- Iga grupp avab horisontaalse pisipiltide rea. Pildid ilmuvad ükshaaval, tõusva ja kahaneva sammuga, pärast seda kui rida on näha. Hiire rullik rea peal liigutab rida vasakule ja paremale. Rea otsas läheb kerimine lehele edasi. Telefonis peeglit ei ole.
- Pisipilt avab suure vaate. Mitu kuju, näiteks 1 kg ja 0,5 kg, on koos. Sulgemine on rist või Esc.
- Küpsised on oma grupp.

## Järgmine

- Kui eesti teksti muudetakse, käib samm 2–6 enne, kui muudatus lehele jääb.
- Google'i tabel ja makro on hilisem tõste. Testleht ei oota seda. Seni on allikas `tekstid.json`.

## Tehtud

- Keelefail ja nupud. 2026-10-06. Sünk: eesti võtmed said ru ja en samas failis.
- Firmast ja Kauplus oma lehtedena. 2026-10-06. Eesti teksti ei muudetud, seega ru ja en jäid puutumata.
- Teemad üksteise alla ja balloonsi liikumine. 2026-10-06. Eesti teksti ei muudetud, tõlget üle ei kirjutatud.
- Horisontaalne rida, suur pilt ja küpsised. 2026-10-06. Sünk: uued võtmed `grupp_kypsised` ja `sulge`. Teisi ridu üle ei kirjutatud.
- Liikumised poole aeglasemad. Pildid ilmuvad ükshaaval alles siis, kui rida on lahti. 2026-10-06. Eesti teksti ei muudetud.

## Märkused

- Eesti silt «Tee» on tõlgitud «Вариант» ja «Choice». See on valik, mitte jook. Reliisi ei peatatud.
- Tootenimed Jussike, Kaeraküpsis ja Piparkook on näidis, mitte tabelist. Neid ei tõlgitud.
- Piltide efekt jäi enne nähtamatuks, sest see jõudis läbi enne rea avanemist. See ei olnud reliisi peatus.
