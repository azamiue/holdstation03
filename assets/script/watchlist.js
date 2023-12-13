var userInput = [];
var api =
  "https://gateway.holdstation.com/services/launchpad/api/staking/wallets?list=";

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
});

// Tạo header cho bảng
var headerRow = document.createElement("tr");

var IndexHeader = document.createElement("th");
IndexHeader.textContent = "Index";
headerRow.appendChild(IndexHeader);

var addressHeader = document.createElement("th");
addressHeader.textContent = "Address";
headerRow.appendChild(addressHeader);

var buttonHeader = document.createElement("th");
buttonHeader.textContent = "";
headerRow.appendChild(buttonHeader);

var searchHeader = document.createElement("th");
searchHeader.textContent = "";
headerRow.appendChild(searchHeader);

// var buttonHeader = document.createElement("button");
// buttonHeader.textContent = "Click me";
// headerRow.appendChild(buttonHeader);

watchlist.appendChild(headerRow);

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

function addAddressToLocalStorage(address) {
  // Lấy danh sách các địa chỉ từ localStorage
  let storedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];

  // Kiểm tra xem địa chỉ đã tồn tại trong danh sách chưa
  if (!storedAddresses.includes(address)) {
    // Thêm địa chỉ vào danh sách
    storedAddresses.push(address);

    // Cập nhật localStorage với danh sách mới
    localStorage.setItem("addresses", JSON.stringify(storedAddresses));

    console.log(`Add ${address} to localStorage.`);
  } else {
    console.log(`${address} already exist in localStorage.`);
  }
}

// Hàm để xóa một địa chỉ khỏi danh sách và cập nhật localStorage
function removeAddressFromLocalStorage(address) {
  // Lấy danh sách các địa chỉ từ localStorage
  let storedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];

  // Xác định vị trí của địa chỉ trong danh sách
  const addressIndex = storedAddresses.indexOf(address);

  // Kiểm tra xem địa chỉ có tồn tại trong danh sách không
  if (addressIndex !== -1) {
    // Xóa địa chỉ khỏi danh sách
    storedAddresses.splice(addressIndex, 1);

    // Cập nhật localStorage với danh sách mới
    localStorage.setItem("addresses", JSON.stringify(storedAddresses));
  } else {
  }
}

// Lấy dữ liệu trong local storage
const storedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
console.log(storedAddresses.length);

for (var i = 0; i < storedAddresses.length; i++) {
  var dataRow = document.createElement("tr");

  var indexCell = document.createElement("td");
  indexCell.textContent = i;
  dataRow.appendChild(indexCell);

  var addressCell = document.createElement("td");
  addressCell.textContent = storedAddresses[i];
  dataRow.appendChild(addressCell);

  // Create a table cell for the button
  var buttonCell = document.createElement("td");

  // Create a button element
  var buttonRow = document.createElement("button");
  // Create an img element for the button content
  var iconImg = document.createElement("img");
  iconImg.src = "./assets/img/trash-can.svg"; // Replace with the path to your trash icon image
  iconImg.alt = "TrashIcon";

  // Add a class to the button

  buttonRow.classList.add(storedAddresses[i]); // Replace "yourClassName" with the desired class name
  buttonRow.onclick = deletearr;
  buttonRow.appendChild(iconImg);
  // Append the button to the buttonCell
  buttonCell.appendChild(buttonRow);

  // Append the buttonCell to the dataRow
  dataRow.appendChild(buttonCell);

  // Create a table cell for the button search
  var searchCell = document.createElement("td");

  // Create a table cell for the button
  var buttonCell = document.createElement("td");

  // Create a button element
  var buttonRow = document.createElement("button");
  // Create an img element for the button content
  var iconImg = document.createElement("img");
  iconImg.src = "./assets/img/search-icon.svg"; // Replace with the path to your trash icon image
  iconImg.alt = "SearchIcon";

  // Add a class to the button

  buttonRow.classList.add(storedAddresses[i]); // Replace "yourClassName" with the desired class name
  buttonRow.onclick = searcharr;
  buttonRow.appendChild(iconImg);
  // Append the button to the buttonCell
  buttonCell.appendChild(buttonRow);

  // Append the buttonCell to the dataRow
  dataRow.appendChild(buttonCell);

  watchlist.appendChild(dataRow);
}

async function returnText_wlist() {
  var input = document.getElementById("UserInput").value;
  var inputArray = input.split(",");

  for (let key of inputArray) {
    var api_key = api + key;
    try {
      const res = await fetch(api_key);
      if (res.status == 200) {
        const data = await res.json();
        if (storedAddresses.includes(key)) {
          alert(`${key} already exist`);
        } else {
          // lưu vào localstorage
          addAddressToLocalStorage(data[0].address);
          // savedItemindex = storedAddresses.length;

          // var dataRow = document.createElement("tr");

          // var indexCell = document.createElement("td");
          // indexCell.textContent = savedItemindex;
          // dataRow.appendChild(indexCell);

          // savedItemindex++;

          // var addressCell = document.createElement("td");
          // addressCell.textContent = key;
          // dataRow.appendChild(addressCell);

          // // Create a table cell for the button
          // var buttonCell = document.createElement("td");

          // // Create a button element
          // var buttonRow = document.createElement("button");
          // // Create an img element for the button content
          // var iconImg = document.createElement("img");
          // iconImg.src = "trash-can.svg"; // Replace with the path to your trash icon image
          // iconImg.alt = "TrashIcon";

          // // Add a class to the button
          // buttonRow.classList.add(i); // Replace "yourClassName" with the desired class name
          // buttonRow.onclick = deletearr;
          // buttonRow.appendChild(iconImg);
          // // Append the button to the buttonCell
          // buttonCell.appendChild(buttonRow);

          // // Append the buttonCell to the dataRow
          // dataRow.appendChild(buttonCell);

          // // Append the button to the buttonCell
          // buttonCell.appendChild(buttonRow);

          // // Append the buttonCell to the dataRow
          // dataRow.appendChild(buttonCell);
        }
      } else {
        alert(`Could not find address: ${key}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  location.reload(true);
  console.log("All requests completed");
}

async function refresh() {
  watchlist.innerHTML = "";
  // Tạo header cho bảng
  var headerRow = document.createElement("tr");

  var IndexHeader = document.createElement("th");
  IndexHeader.textContent = "Index";
  headerRow.appendChild(IndexHeader);

  var addressHeader = document.createElement("th");
  addressHeader.textContent = "Address";
  headerRow.appendChild(addressHeader);

  var pendingRewardHeader = document.createElement("th");
  pendingRewardHeader.textContent = "Pending Reward";
  headerRow.appendChild(pendingRewardHeader);

  var harvestedRewardHeader = document.createElement("th");
  harvestedRewardHeader.textContent = "Harvested Reward";
  headerRow.appendChild(harvestedRewardHeader);

  var buttonHeader = document.createElement("th");
  buttonHeader.textContent = "";
  headerRow.appendChild(buttonHeader);

  watchlist.appendChild(headerRow);

  for (i = 0; i < storedAddresses.length; i++) {
    var api_key = api + storedAddresses[i];

    try {
      const res = await fetch(api_key);
      if (res.status == 200) {
        const data = await res.json();

        // Tạo dòng mới cho mỗi dữ liệu JSON
        var dataRow = document.createElement("tr");

        var IndexCell = document.createElement("td");
        IndexCell.textContent = i;
        dataRow.appendChild(IndexCell);

        var addressCell = document.createElement("td");
        addressCell.textContent = data[0].address;
        dataRow.appendChild(addressCell);

        var pendingRewardCell = document.createElement("td");
        pendingRewardCell.textContent = data[0].pendingReward;
        dataRow.appendChild(pendingRewardCell);

        var harvestedRewardCell = document.createElement("td");
        harvestedRewardCell.textContent = data[0].harvestedReward;
        dataRow.appendChild(harvestedRewardCell);

        // Create a table cell for the button
        var buttonCell = document.createElement("td");

        // Create a button element
        var buttonRow = document.createElement("button");
        // Create an img element for the button content
        var iconImg = document.createElement("img");
        iconImg.src = "./assets/img/trash-can.svg"; // Replace with the path to your trash icon image
        iconImg.alt = "TrashIcon";

        // Add a class to the button
        buttonRow.classList.add(data[0].address); // Replace "yourClassName" with the desired class name
        buttonRow.onclick = deletearr; // Replace "deletearr" with the name of your JavaScript function
        buttonRow.appendChild(iconImg);
        // Append the button to the buttonCell
        buttonCell.appendChild(buttonRow);

        // Append the buttonCell to the dataRow
        dataRow.appendChild(buttonCell);

        // Thêm dòng vào bảng
        watchlist.appendChild(dataRow);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}

// Define your JavaScript function
function deletearr() {
  var buttonClass = this.classList[0];
  removeAddressFromLocalStorage(buttonClass);
  location.reload(true);
}

// watchlist.js
function searcharr() {
  var buttonClass = this.classList[0];
  localStorage.setItem("global", buttonClass);

  // Check if the parent window has the parentReload function
  if (
    window.parent &&
    window.parent.parentReload &&
    typeof window.parent.parentReload === "function"
  ) {
    // Call the parentReload function if it's defined
    window.parent.parentReload(true);
  } else {
  }
}
