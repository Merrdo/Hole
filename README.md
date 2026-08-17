# Sessizliğin Sesi — PWA Kurulum Rehberi

Bu klasör, uygulamayı GitHub Pages üzerinden yayınlayıp telefonunuzda "ana ekrana ekle" ile
kurabilmeniz için gereken tüm dosyaları içerir:

```
index.html          → Ana uygulama dosyası
manifest.json        → PWA kimlik/ikon bilgisi
service-worker.js    → Çevrimdışı çalışma / önbellekleme
icons/icon-192.png
icons/icon-512.png
icons/icon-512-maskable.png
.nojekyll             → GitHub Pages'in dosyaları olduğu gibi sunması için
```

## 1) GitHub'a yükleme

1. GitHub'da yeni bir repo oluşturun (örnek: `sessizligin-sesi`).
2. Bu klasördeki **tüm dosyaları** (index.html, manifest.json, service-worker.js, icons/ klasörü,
   .nojekyll) repo'nun kök dizinine yükleyin. En kolay yol: repo sayfasında
   **Add file → Upload files**, tüm dosyaları sürükleyip **Commit changes**.
   - `icons` klasörünü yüklerken tarayıcı bazen klasör yapısını korumayabilir; bu durumda
     GitHub Desktop veya `git` komut satırını kullanmanız daha güvenlidir.

## 2) GitHub Pages'i açma

1. Repo → **Settings → Pages**.
2. **Source** kısmından **Deploy from a branch** seçin.
3. **Branch**: `main` (veya kullandığınız dal), klasör olarak **/ (root)** seçin → **Save**.
4. Birkaç dakika içinde adresiniz şu şekilde yayında olur:
   `https://kullaniciadiniz.github.io/repo-adi/`

## 3) Telefonda ana ekrana ekleme

**iPhone (Safari):**
1. Yukarıdaki adresi Safari'de açın.
2. Paylaş simgesine dokunun (alt ortadaki kare + ok).
3. **Ana Ekrana Ekle**'yi seçin → **Ekle**.

**Android (Chrome):**
1. Adresi Chrome'da açın.
2. Sağ üstteki ⋮ menüsüne dokunun.
3. **Ana ekrana ekle** / **Uygulamayı yükle**'yi seçin.

Kurulumdan sonra uygulama, tarayıcı çubuğu olmadan tam ekran (standalone) açılır ve
service worker sayesinde bir kez ziyaret edildikten sonra internetsizken de açılabilir.

## Önemli notlar

- `manifest.json` içindeki `start_url` ve `scope` göreli (`./`) olarak ayarlandı; bu sayede
  hem `kullaniciadiniz.github.io/repo-adi/` gibi bir proje sayfasında hem de kök domain'de
  sorunsuz çalışır.
- Uygulamada bir güncelleme yapıp tekrar yüklediğinizde, kullanıcıların eski sürümü görmemesi
  için `service-worker.js` içindeki `CACHE_ADI` değerini artırın (`cache-v1` → `cache-v2`).
  Aksi halde service worker eski dosyaları önbellekten sunmaya devam edebilir.
- İkon olarak basit bir "S" monogramı oluşturuldu (uygulamanın krem/kahverengi renk paletiyle
  uyumlu). Kendi logonuz varsa `icons/icon-192.png`, `icons/icon-512.png` ve
  `icons/icon-512-maskable.png` dosyalarını aynı isimlerle değiştirmeniz yeterli — başka hiçbir
  yeri güncellemenize gerek yok.
- Site HTTPS üzerinden sunulmalı; GitHub Pages bunu otomatik sağlar, bu yüzden service worker
  ve "ana ekrana ekle" sorunsuz çalışır.
