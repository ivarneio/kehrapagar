# Kehra Pagar

https://ivarneio.github.io/kehrapagar/

Uus koduleht asendab WordPressi lehe kehrapagar.ee. See fail on kokkulepe, mitte kood. Siia kirjutame, mis on otsustatud. Muudatus käib siin, enne kui midagi ehitatakse.

Testversioon on see repo. Lõplik leht ja tellimused elavad Zone'i serveris. GitHubi külastaja ei loe.

Lehe vaade on üleval link. Kui see annab tühja lehe, on Pages veel kinni: Settings, Pages, allikas main ja juurkaust.

## Mis on otsustatud

- WordPressi ei kasutata. Leht on kerge ja kiire, telefonile esimene, eesti keel on põhikeel.
- Eesmärgid: tooted, sotsiaalmeedia kampaaniad, kringlitellimused.
- Tellimus on ainult kohapealne järeletulemine ja kohapealne maksmine. Ettemaksu ei ole.
- Lehel on suur nupp «Helista ja telli». Telefonis avab see kõne.
- Tellimine on avamisel kinnine plokk. Vormis saab valida valmis kringli või panna kokku fantaasiakringli täidistest.
- Tellimus salvestub Zone'i. Igast tellimusest läheb e-kiri pagarikotta.
- Pagaril on lihtne telefonivaade. Sinna saab kirja panna ka telefonitellimuse, et kõik tellimused oleks ühes kohas. Pagarivaade on eesti keeles.
- Igal kampaanial on lühike link. `?keel=ru` või `?keel=en` avab sama lehe teises keeles.
- Muudatused on tagasikeeratavad. Eelmise versiooni failid jäävad alles.
- Ivar ei kirjuta koodi. Muudatus käib lihtsa juhisega.
- Pildid ja tekstid on Google'is. Reliisi osa on sealne makro või skript. Külastaja Google'it ei loe.
- Testleht töötab isiklikul Google'i kontol. Pildid ja tabel lähevad sinna. Toodangu konto on hilisem tõste.
- ZoneCloud ei ole andmehoidla. Sealt ei ole reliisi ajal ligipääsu.
- Foto ja tekst seotakse failinimega. Tunnus on püsiv, nimi ja rea järjekord ei seo.
- Drive'is on kataloog `tooted`. Tootegrupid võivad olla selle all kataloogidena.
- Tootegrupid on Kringlid, Pagaritooted, Kondiitritooted, Tordid. Grupp on tabeli rida. Lisamine ja eemaldamine ei ole kood.
- Toote valik avab toote alla paneeli. Tutvustus on peidus. Pilt avaneb täisekraanil.
- Paneeli neli pisipilti on ühes reas, mitte üksteise all.
- Jalus on kogu aeg näha. Seal on firma kontaktandmed.
- Päis on nagu Helirännakul: üleval menüü ja sotsiaalmeedia.
- Avaleht on `pealeht/pealeht.jpg`. Kui faili ei ole, on tavaline avaleht. Cron kopeerib.
- Uuenduse teeb Zone'i cron, mitte leht. Skripte on mitu. Aadressid on seadetes.
- Uudiskiri: soovija kirjutab e-posti, nimekiri on Zone'is, inimene koostab kirja ja saadab välja. Saatmine jääb Zone'i piiride sisse.
- Eemaldamine on kirja lõpu link. Skript kustutab selle aadressi võtme järgi.
- Kõike ei kuhjata ühte indexisse. Külastaja leht on üks. Tellimus, uudis ja andmed on eraldi failid.
- Mallist võetakse olemasolev luu: päis, jalus, keel, pildi side, galerii. Lehte ennast ei kopeerita.
- Visuaal on kandiline, taust jahune valge. Avamine on nagu ballonsis. Sulgemine on pehmem.
- Firma sõrmejälg on genereeritud rõhtne ribamuster. Värvireeglid on allpool, jaotises Sõrmejälg.
- Backup on kohustuslik enne tõlget. Koopia läheb kausta `backup` ja püsib vähemalt 30 päeva. Tõlge käib käsitsi, mitte nupuga.

## Protsessi reeglid

Need on kohustuslikud. Kui siit vaatad, on backup enne tõlget reegel, mitte soovitus.

- Tõlge ei käi automaatselt ega nupuga. Kui tabelis on uus või muutunud eesti tekst, ütleb tellija ja tõlge tehakse siin vestluses. Muudatusi ei ole tihti.
- Nimi ei tõlgita. Tõlgitakse alaliik ja tekst: `alaliik_et` → `alaliik_ru` / `alaliik_en`, `tekst_et` → `tekst_ru` / `tekst_en`.
- Backup on kohustuslik enne tõlget. Enne kui tõlke veergu kirjutatakse, tehakse tabelist koopia kausta `backup`. Ilma backupita tõlget ei kirjutata.
- Kolmas pool täidab ainult eesti veerud. Tõlke veerge ta ei puutu. Parandus käib alati eesti tekstist.
- Automaatikat (ajakava, webhook) ei ole. Protsess on käsitsi, sest tekste ei muudeta iga päev.
