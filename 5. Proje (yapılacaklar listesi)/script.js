// Görev ekleme fonksiyonu
function gorevEkle() {
  const input = document.getElementById("yeniGorev");
  const gorevMetni = input.value.trim();

  if (gorevMetni === "") return;

  const li = document.createElement("li");
  li.textContent = gorevMetni;

  // Tıklayınca yapılmış olsun
  li.addEventListener("click", () => {
    li.classList.toggle("done");
  });

  // Silme butonu ekle
  const silBtn = document.createElement("button");
  silBtn.textContent = "Sil";
  silBtn.style.marginLeft = "10px";
  silBtn.style.backgroundColor = "#e74c3c";
  silBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Liste öğesinin 'done' olmasını engelle
    li.remove();
  });

  li.appendChild(silBtn);

  document.getElementById("liste").appendChild(li);
  input.value = ""; // kutuyu temizle
}

// Görevleri yükle (sayfa açılınca)
window.onload = function() {
  const kayitliGorevler = localStorage.getItem("gorevler");
  if (kayitliGorevler) {
    document.getElementById("liste").innerHTML = kayitliGorevler;
    // Sil butonlarına ve click olaylarına tekrar ekleme yapmalıyız:
    gorevEtkinlikleriEkle();
  }
};

// Görev ekleme fonksiyonu
function gorevEkle() {
  const input = document.getElementById("yeniGorev");
  const gorevMetni = input.value.trim();

  if (gorevMetni === "") return;

  const li = document.createElement("li");
  li.textContent = gorevMetni;

  li.addEventListener("click", () => {
    li.classList.toggle("done");
    localStorageKaydet();
  });

  const silBtn = document.createElement("button");
  silBtn.textContent = "Sil";
  silBtn.style.marginLeft = "10px";
  silBtn.style.backgroundColor = "#e74c3c";

  silBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    localStorageKaydet();
  });

  li.appendChild(silBtn);
  document.getElementById("liste").appendChild(li);
  input.value = "";

  localStorageKaydet();
}

// LocalStorage’a kaydetme fonksiyonu
function localStorageKaydet() {
  const gorevlerHTML = document.getElementById("liste").innerHTML;
  localStorage.setItem("gorevler", gorevlerHTML);
}

// Sil ve tamam işaretleme için eventleri tekrar ekleyen fonksiyon
function gorevEtkinlikleriEkle() {
  const listeElemanlari = document.querySelectorAll("#liste li");
  listeElemanlari.forEach(li => {
    li.addEventListener("click", () => {
      li.classList.toggle("done");
      localStorageKaydet();
    });

    const silBtn = li.querySelector("button");
    if (silBtn) {
      silBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        localStorageKaydet();
      });
    }
  });
}
