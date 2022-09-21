const datatable = document.getElementById("table");

async function fetchdata() {
  let url =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  let promise = await fetch(url);
  let dataJSON = await promise.json();
  let stringJSON = JSON.stringify(dataJSON);
  let json = JSON.parse(stringJSON);
  let municipalities = Object.values(
    json.dataset.dimension.Alue.category.label
  );
  console.log(municipalities);
  let populations = json.dataset.value;
  let length = json.dataset.value.length;
  console.log(json);

  url = "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";
  promise = await fetch(url);
  dataJSON = await promise.json();
  stringJSON = JSON.stringify(dataJSON);
  json = JSON.parse(stringJSON);
  let employees = json.dataset.value;

  for (let i = 0; i < length; i++) {
    let tr = document.createElement("tr");
    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");
    let cell3 = document.createElement("td");
    let cell4 = document.createElement("td");

    cell1.innerText = municipalities[i];
    cell2.innerText = populations[i];
    cell3.innerText = employees[i];
    let emp_percent = (employees[i] / populations[i]) * 100;
    emp_percent = emp_percent.toFixed(2);
    cell4.innerText = emp_percent;
    if (emp_percent > 45) {
      cell4.style.backgroundColor = "#abffbd";
    } else if (emp_percent < 25) {
      cell4.style.backgroundColor = "#ff9e9e";
    }

    tr.appendChild(cell1);
    tr.appendChild(cell2);
    tr.appendChild(cell3);
    tr.appendChild(cell4);
    datatable.appendChild(tr);
  }
}

fetchdata();
