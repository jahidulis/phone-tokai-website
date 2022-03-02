const searchFood = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    console.log(searchText);
    searchField.value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayResult(data.data));
  };
  
  const displayResult = (data) => {
    data.forEach((data) => console.log(data));
    console.log(data.length);
    if (data.length <= 20) {
      data.forEach((data) => {
        creatElement(data);
      });
    } else {
      data.slice(0, 20).forEach((data) => {
        creatElement(data);
      });
      const remove = document.getElementById("show-more");
      remove.classList.remove("d-none");
      remove.addEventListener("click", function () {
        data.forEach((data) => {
          creatElement(data);
          remove.classList.add("d-none");
        });
      });
    }
  };
  const creatElement = (data) => {
    const searchResult = document.getElementById("search-result");
    const div = document.createElement("div");
    div.classList.add("col");
  
    div.innerHTML = `<div class="card h-100 mx-auto" >
          <img src="${data.image}" class="card-img-top" alt="..."  />
          <div class="card-body text-center">
            <h5 class="card-title">${data.phone_name}</h5>
            <p class="card-text">
              <h3>${data.brand}</h3>
            </p>
            <button onclick = "mealDetail('${data.slug}')" class="btn btn-primary">Details</button>
          </div>
        </div>`;
  
    searchResult.appendChild(div);
  };
  
  const mealDetail = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => loadDetail(data.data));
  };
  
  const loadDetail = (phone_detail) => {
    const showDetails = document.getElementById("show-details");
    const div = document.createElement("div");
    div.classList.add("row");
    div.classList.add("g-0");
    let release = "No release date found";
    if (phone_detail.releaseDate != "") {
      release = `${phone_detail.releaseDate}`;
    }
  
    div.innerHTML = innerHTMLset(
      phone_detail.image,
      phone_detail.name,
      phone_detail.brand,
      release
    );
  
    showDetails.appendChild(div);
    console.log(phone_detail);
    const mainFeature = phone_detail.mainFeatures;
    // console.log(Object.entries(mainFeature));
    const others = phone_detail.others;
    console.log(others);
  
    for (let [key, value] of Object.entries(mainFeature)) {
      key = key.toUpperCase();
      if (typeof value == "object") {
        let ul = document.createElement("ul");
        let liStr = "";
        for (const element of value) {
          let li = `<li>${element}</li>`;
          liStr = liStr + li;
        }
        const tr = document.createElement("tr");
        tr.innerHTML = `<td scope="row"><strong>${key}</strong></td>
      <td>${liStr}</td>`;
        document.getElementById("features").append(tr);
      } else {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td scope="row"><strong>${key}</strong></td>
      <td>${value}</td>`;
        document.getElementById("features").append(tr);
      }
    }
    if (others != "") {
      let tbody = document.getElementById("features");
      let tr2 = document.createElement("tr");
      tr2.classList.add("bg-dark");
      tr2.classList.add("opacity-25");
      tr2.classList.add("text-white");
      tr2.innerHTML = "<td colspan='2'><h3 class='text-center'>Others</h3></td>";
  
      tbody.appendChild(tr2);
  
      for (let [key, value] of Object.entries(others)) {
        key = key.toUpperCase();
        const tr = document.createElement("tr");
        tr.innerHTML = `<td scope="row"><strong>${key}</strong></td>
        <td>${value}</td>`;
        document.getElementById("features").append(tr);
      }
    }
  };
  const mainInnerHtml = (key, value) => {};
  const innerHTMLset = (img, name, brand, releaseDate) => {
    return `<div class="col-md-4">
    <img class="d-block mx-auto" src="${img}" class="img-fluid rounded-start" alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body text-center">
      <h3 class="card-title">${name}</h3>
      <p class="card-text"><h4>${brand}</h4> </p>
      <p class="card-text"><small class="text-muted">${releaseDate}</small></p>
    </div>
  </div>`;
  };