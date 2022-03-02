// spinne >>>>>
const toggleSpinner = (displayApply, displayRemove) => {
    document.getElementById("spinner").classList.remove(displayRemove);
    document.getElementById("spinner").classList.add(displayApply);
  };
  // search result >>>>
  const toggleSearchResult = (displayRemove, displayApply) => {
    document.getElementById("search").classList.remove(displayRemove);
    document.getElementById("search").classList.add(displayApply);
  };
  //input field >>>>
  const searchMobile = async () => {
    toggleSpinner("d-block", "d-none");
    toggleSearchResult("d-block", "d-none");
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
  
    searchField.value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    if (searchText != "") {
      const response = await fetch(url);
      const data = await response.json().then((data) => {
        if (data.status == true) {
          displayResult(data.data);
        } else {
          clearSearch();
          toggleSpinner("d-none", "d-block");
  
          alert("Sorry We don't have this Item Search Another One :)");
        }
      });
    } else {
      toggleSpinner("d-none", "d-block");
      clearSearch();
      alert("Please Enter a Value");
    }
  };
  // result >>>>
  const displayResult = (data) => {
    clearSearch();
    const showMore = document.getElementById("show-more");
    showMore.classList.add("d-none");
    // data limit 20 >>>>
    if (data.length <= 20) {
      data.forEach((data) => {
        creatElement(data);
      });
    } else {
      data.slice(0, 20).forEach((data) => {
        creatElement(data);
      });
      const showMore = document.getElementById("show-more");
      showMore.classList.remove("d-none");
      showMore.addEventListener("click", function() {
        clearSearch();
        data.forEach((data) => {
          creatElement(data);
          showMore.classList.add("d-none");
        });
      });
    }
    toggleSpinner("d-none", "d-block");
    toggleSearchResult("d-none", "d-block");
  };
  const creatElement = (data) => {
    const searchResult = document.getElementById("search-result");
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `<div class="card h-100 mx-auto" >
          <img src="${data.image}" class="card-img-top" alt="..."  />
          <div class="card-body rounded rounded-1 text-center">
            <h5 class="card-title">${data.phone_name}</h5>
            <p class="card-text">
              <h3>${data.brand}</h3>
            </p>
            <button onclick = "mobileDetail('${data.slug}')" class="btn btn-primary">Details</button>
          </div>
        </div>`;
  
    searchResult.appendChild(div);
  };
  const mobileDetail = async (id) => {
    clearFeature();
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    loadDetail(data.data);
  };
  const loadDetail = (phone_detail) => {
    const showDetails = document.getElementById("show-details");
    const div = document.createElement("div");
    div.classList.add("row");
    div.classList.add("g-0");
    // Release date >>>>
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
  
    document.getElementById("specification").classList.remove("d-none");
    const mainFeature = phone_detail.mainFeatures;
    const other = phone_detail.others;
  
    let tbody = document.getElementById("features");
    let tr1 = document.createElement("tr");
    tr1.classList.add("bg-dark");
    tr1.classList.add("opacity-25");
    tr1.classList.add("text-white");
    tr1.innerHTML =
      "<td colspan='2'><h3 class='text-center'>Main Features</h3></td>";
  
    tbody.appendChild(tr1);
  
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
    if (other != "" && other != undefined) {
      let tbody = document.getElementById("features");
      let tr2 = document.createElement("tr");
      tr2.classList.add("bg-dark");
      tr2.classList.add("opacity-25");
      tr2.classList.add("text-white");
      tr2.innerHTML = "<td colspan='2'><h3 class='text-center'>Others</h3></td>";
  
      tbody.appendChild(tr2);
  
      for (let [key, value] of Object.entries(other)) {
        key = key.toUpperCase();
        const tr = document.createElement("tr");
        tr.innerHTML = `<td scope="row"><strong>${key}</strong></td>
        <td>${value}</td>`;
        document.getElementById("features").append(tr);
      }
    }
  };
  const mainInnerHtml = (key, value) => {};
  //Card >>>>
  const innerHTMLset = (img, name, brand, releaseDate) => {
    return `<div class="col-md-4">
    <img class="d-block mx-auto" src="${img}" class="img-fluid rounded-start" alt="...">
    </div>
     <div class="col-md-8">
    <div class="card-body text-center">
      <h3 class="card-title ps-2">${name}</h3>
      <p class="card-text"><h4>${brand}</h4> </p>
      <p class="card-text"><small class="text-muted">${releaseDate}</small></p>
    </div>
  </div>`;
  };
  // Clear Item & fetures >>>>
  function clearFeature() {
    const showDetails = document.getElementById("show-details");
    showDetails.textContent = "";
    document.getElementById("specification").classList.add("d-none");
    let tbody = document.getElementById("features");
    tbody.textContent = "";
  }
  //Clear Search Things >>>>
  function clearSearch() {
    const showMore = document.getElementById("show-more");
    showMore.classList.add("d-none");
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";
  
    clearFeature();
  }