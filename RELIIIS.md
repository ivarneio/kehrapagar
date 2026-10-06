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
- Firmast, Kauplus ja Kontakt ei ole pealehe kerimises. Päis avab oma lehe. Jaluses jääb lühike kontakt.
- Tootegrupid on üksteise all ka desktopis. Kõrvuti võrku ei ole.
- Valitud grupp tõuseb üles ja lükkab teised alla. Liikumine on 0,8 sekundit.
- Iga tootegrupp avab sama lindi. Lint sõidab sisse paremalt vasakule, kordub, otsa ei ole. Kursori all leht edasi ei keri.
- Pisipilt avab suure vaate. Sulgemine on vajutus samal pildil, rist või Esc. Kerimine ei sulge. Mitu kuju jääb keritavaks.
- Kõigil gruppidel on näidispildid, et linti hinnata.
- Facebook ja Instagram on päises, samad ümargused märgid nagu Helirännakul. Päis on nagu Helirännakul: logo vasakul, menüü keskel, ikoonid paremal.

- Paneelid on taustaga ühte värvi. Serva ega varju ei ole.

## Järgmine

- Kui eesti teksti muudetakse, käib samm 2–6 enne, kui muudatus lehele jääb.
- Google'i tabel ja makro on hilisem tõste. Testleht ei oota seda. Seni on allikas `tekstid.json`.

## Tehtud

- Keelefail ja nupud. 2026-10-06.
- Firmast ja Kauplus oma lehtedena. 2026-10-06.
- Teemad üksteise alla ja balloonsi liikumine. 2026-10-06.
- Horisontaalne rida, suur pilt ja küpsised. 2026-10-06. Sünk: `grupp_kypsised` ja `sulge`.
- Liikumised poole aeglasemad. 2026-10-06.
- Filmilint. Ringil otsa ei ole. 2026-10-06.
- Sama avamine kõigil tootegruppidel. 2026-10-06. Eesti teksti ei muudetud, nimesid ei tõlgitud.
- Suur pilt sulgub vajutusest. Rist ja Esc jäävad. Kerimine ei sulge. 2026-10-06. Eesti teksti ei muudetud.
- Sotsiaallingid päris aadressidega ja Helirännaku ikoonidega. 2026-10-06. Eesti teksti ei muudetud.
- Päis pandud Helirännaku ritta. Logo vasakul, menüü keskel, ikoonid paremal. 2026-10-06.
- Kontakt oma lehena. Sünk: uus võti `kontakt_pikem`. 2026-10-06.

- Paneelid on taustaga ühte värvi, serva ega varju ei ole. Kinnitatud 2026-10-06. Eesti teksti ei muudetud.

- Testpealeht: pildid/pealeht.jpg on näidispilt, mitte päris pood. 2026-10-06.

- Testlehe avaldamine jäi 2026-10-06 kinni. Uus katse käivitatud.

- Seaded on `seaded.json`: telefon, aadress, Facebook, Instagram. Leht loeb sealt. 2026-10-06. Eesti teksti ei muudetud.

## Märkused

- Eesti silt «Tee» on tõlgitud «Вариант» ja «Choice». Reliisi ei peatatud.
- Uued tootenimed on näidised, mitte tabelist. Neid ei tõlgitud.
- Näidisnimi «Räimemarja pirukas» on kohmakas. Õigem oleks «Räimepirukas». Reliisi ei peatatud.
