var userInput = [];
var api =
  "https://gateway.holdstation.com/services/launchpad/api/staking/wallets?list=";

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
});

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

async function returnText() {
  var input = document.getElementById("UserInput").value;
  var inputArray_cache = input.split(",");
  var inputArray = inputArray_cache.filter(onlyUnique);
  console.log(inputArray);

  var resultTable = document.getElementById("resultTable");
  resultTable.innerHTML = "";

  // Tạo header cho bảng
  var headerRow = document.createElement("tr");

  var addressHeader = document.createElement("th");
  addressHeader.textContent = "Address";
  headerRow.appendChild(addressHeader);

  var pendingRewardHeader = document.createElement("th");
  pendingRewardHeader.textContent = "Pending Reward";
  headerRow.appendChild(pendingRewardHeader);

  var harvestedRewardHeader = document.createElement("th");
  harvestedRewardHeader.textContent = "Harvested Reward";
  headerRow.appendChild(harvestedRewardHeader);

  // Thêm header vào bảng
  resultTable.appendChild(headerRow);

  for (let key of inputArray) {
    var api_key = api + key;
    console.log(key);

    try {
      const res = await fetch(api_key);
      if (res.status == 200) {
        const data = await res.json();
        // lưu vào localstorage
        addAddressToLocalStorage(data[0].address);

        // Tạo dòng mới cho mỗi dữ liệu JSON
        var dataRow = document.createElement("tr");

        var addressCell = document.createElement("td");
        addressCell.textContent = data[0].address;
        dataRow.appendChild(addressCell);

        var pendingRewardCell = document.createElement("td");
        pendingRewardCell.textContent = data[0].pendingReward;
        dataRow.appendChild(pendingRewardCell);

        var harvestedRewardCell = document.createElement("td");
        harvestedRewardCell.textContent = data[0].harvestedReward;
        dataRow.appendChild(harvestedRewardCell);

        // Thêm dòng vào bảng
        resultTable.appendChild(dataRow);
        var hasValidData = true;
        document
          .getElementById("watchlist-iframe")
          .contentWindow.location.reload(true);
      } else {
        alert(`Cannot to find address: ${key}`);
        // Kiểm tra flag và xóa headerRow nếu không có dữ liệu hợp lệ
        if (!hasValidData) {
          resultTable.innerHTML = "";
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  console.log("All requests completed");
}

async function SearchFromIframe(address) {
  var key = address;

  var api_key = api + key;
  console.log(key);

  try {
    const res = await fetch(api_key);
    if (res.status == 200) {
      // Tạo header cho bảng
      var headerRow = document.createElement("tr");

      var addressHeader = document.createElement("th");
      addressHeader.textContent = "Address";
      headerRow.appendChild(addressHeader);

      var pendingRewardHeader = document.createElement("th");
      pendingRewardHeader.textContent = "Pending Reward";
      headerRow.appendChild(pendingRewardHeader);

      var harvestedRewardHeader = document.createElement("th");
      harvestedRewardHeader.textContent = "Harvested Reward";
      headerRow.appendChild(harvestedRewardHeader);

      // Thêm header vào bảng
      resultTable.appendChild(headerRow);

      const data = await res.json();

      // Tạo dòng mới cho mỗi dữ liệu JSON
      var dataRow = document.createElement("tr");

      var addressCell = document.createElement("td");
      addressCell.textContent = data[0].address;
      dataRow.appendChild(addressCell);

      var pendingRewardCell = document.createElement("td");
      pendingRewardCell.textContent = data[0].pendingReward;
      dataRow.appendChild(pendingRewardCell);

      var harvestedRewardCell = document.createElement("td");
      harvestedRewardCell.textContent = data[0].harvestedReward;
      dataRow.appendChild(harvestedRewardCell);

      // Thêm dòng vào bảng
      resultTable.appendChild(dataRow);
      var hasValidData = true;
      document
        .getElementById("watchlist-iframe")
        .contentWindow.location.reload(true);
    } else {
    }
  } catch (error) {
    console.error(error.message);
  }
  console.log("All requests completed");
}
SearchFromIframe(localStorage.global);
localStorage.removeItem("global");

window.parentReload = function () {
  // Reload the page
  location.reload(true);
};
