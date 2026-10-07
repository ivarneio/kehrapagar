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
- Firma sõrmejälg on genereeritud rõhtne ribamuster, mitte foto. Värvid on sinine, oranž ja valge.

## Sõrmejälg

Praeguse logo taga on püstised ribad, punane ja helesinine, eri pikkusega. Meie lehel on suund rõhtne. Püstist rippu ei kopeerita.

Riba ei ole foto ega joonistatud fail. See genereeritakse. Värvid on sinine, oranž ja valge, ja need on vahetatavad. Valge on vahe: taust paistab läbi, et muster ei muutuks kastiks. Paksus ja vahe on igal pool samad. Pikkus ei ole kõigil ribadel sama.

See on firma sõrmejälg. Sama muster tuleb päises, tootegrupil ja mujal ühest kohast. Teksti riba peal ei ole.

Suletud tootegrupil on õhuke rõhtne ripp. Kui grupp saab valitud, liiguvad ribad üles päisesse ja samal ajal paremale, ilma tekstita. Aktiivse grupi kohale jääb pikk rõhtne riba.

## Visuaal

Kinnitatud. Sai on ülar, kaart on kandiline. Helirännaku ümaraid nurki ei võeta.

Taust on jahune valge, mitte ekraani valge. Kergelt soe, nagu paber või jahu. Küpsetis paistab selle peal välja. Linane ja hallikas jäid kõrvale. Grupp ei ole eraldi teema, vaid viide samal taustal. Valik tõstab selle üles.

Avamine on nagu ballonsis. Valitud kaart tõuseb ja lükkab teised alla, umbes 0,4 sekundit. Sulgemine ei ole sama hüpe: kaart langeb oma kohale ja teised tulevad tagasi, ilma et rida kokku hüppaks.

Ülejäänud kokkulepe on eelmises versioonis. Kui see commit jäi lühikeseks, taastatakse täisfail.
