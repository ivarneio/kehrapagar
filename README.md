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
- Uudiskiri: soovija kirjutab e-posti, nimekiri on Zone'is, inimene koostab kirja ja saadab välja. Saatmine jääb Zone'i piiride sisse.
- Eemaldamine on kirja lõpu link. Skript kustutab selle aadressi võtme järgi.
- Kõike ei kuhjata ühte indexisse. Külastaja leht on üks. Tellimus, uudis ja andmed on eraldi failid.
- Mallist võetakse olemasolev luu: päis, jalus, keel, pildi side, galerii. Lehte ennast ei kopeerita.
- Visuaal on kandiline, taust jahune valge. Avamine on nagu ballonsis. Sulgemine on pehmem.

## Tellimus

Avamisel on tellimine kinnine plokk, sama kaaluga mis tootegrupp. Vajutus avab vormi. Vorm ei ole lehe avamisel lahti.

Plokk võib olla toodete all. Iga kringli juures on viide «Telli». See avab sama vormi, ja kringel on juba valitud.

Vormis on kaks teed. Valmis kringel on üks valik. Teine on fantaasiakringel: klient valib ise täidised. Täidiste nimekiri tuleb tabelist, mitte koodist. Suurus, päev, kellaaeg, nimi ja telefon jäävad. Märkeruut «Tahan uudiseid» ja e-post jäävad. «Helista ja telli» jääb vormi kõrvale.

Täidiste nimekiri ei ole veel lukus.

Ülejäänud kokkulepe on eelmises failis. See commit lisas tellimuse idee. Täisfail taastatakse, kui see jäi pooleli.
