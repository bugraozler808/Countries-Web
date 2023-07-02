let sehirler = "";

window.onload = function () {
  tumUlkeleriAl();
};

const tumUlkeleriAl = async () => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/all`);
    if (!res.ok) {
      renderError(`Bağlanırken Hata Oluştu: ${res.status}`);
      throw new Error();
    }
    const data = await res.json();
    sehirIsimleri(data);
  } catch (error) {
    console.log(error);
  }
};

const sehirIsimleri = (data) => {
  sehirler = data;
  sehirler.sort((a, b) => {
    if (a.name.common < b.name.common) return -1;
    // if (a.name.common > b.name.common) return 1;
    return 0;
  });
  sehirler.forEach((sehir) => {
    const secim = document.querySelector(".form-select");
    secim.innerHTML += `<option value="${sehir.name.common}">${sehir.name.common}</option>`;
  });
};
const domaHataBas = (err) => {
  const sehirler = document.querySelector(".countries");
  sehirler.innerHTML = `
        <h3 class="text-danger">${err}</h3>
        <img src="./404.png" alt=""/>
    `;
};

document.querySelector(".form-select").addEventListener("change", () => {
  const sehirIsmi = document.querySelector(".form-select").value;

  if (sehirIsmi) {
    const sehirSec = sehirler.filter(
      (sehir) => sehir.name.common === sehirIsmi
    );
    sehirleriCardOlarakDomaBas(sehirSec[0]);
  }
});

const sehirleriCardOlarakDomaBas = (sehir) => {
  // console.log(sehir);
  const {
    name: { common },
    capital,
    region,
    flags: { svg },
    languages,
    currencies,
    population,
    borders,
    maps,
  } = sehir;

  console.log(maps.googleMaps);
  const sehirler = document.querySelector(".countries");

  sehirler.innerHTML = `
  <div class="card shadow-lg" style="width: 22rem">
  <img src="${svg}" class="card-img-top shadow" alt="..." />
  <div >
    <h5 class="p-2 text-center">${common}</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">
      <i class="fa-solid fa-earth-oceania"></i><span class="fw-bold"> Bölge:</span> ${region}
    </li>
    <li class="list-group-item">
      <i class="fas fa-lg fa-landmark"></i>
      <span class="fw-bold"> Başkent:</span> ${capital}
    </li>
    <li class="list-group-item">
      <i class="fas fa-lg fa-comments"></i>
      <span class="fw-bold"> Diller:</span> ${Object.values(languages)}
    </li>
    <li class="list-group-item">
      <i class="fas fa-lg fa-money-bill-wave"></i>
      <span class="fw-bold"> Para Birimi:</span> ${
        Object.values(currencies)[0].name
      },
      ${Object.values(currencies)[0].symbol}
    </li>
    <li class="list-group-item">
    <i class="fa-solid fa-people-group"></i></i>
    <span class="fw-bold"> Nüfusu:</span> ${population.toLocaleString("en-US")}
  </li>
    <li class="list-group-item">
    <i class="fa-sharp fa-solid fa-road-barrier"></i>
    <span class="fw-bold"> Komşuları:</span>  ${borders ? borders : "None"}
  </li>
  </li>
  <li class="list-group-item">
    <i class="fa-solid fa-map-location-dot"></i><span class="fw-bold"> Harita:</span> <a href=${
      maps.googleMaps
    } target='_blank'> Go to google map</a> </li>
  </ul>
</div>
  `;
};
