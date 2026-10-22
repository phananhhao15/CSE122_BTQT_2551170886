var formThem = document.getElementById("formThem");
var oNhap = document.getElementById("oNhap");
var danhSach = document.getElementById("danhSach");
var demViec = document.getElementById("demViec");

// Tạo một thẻ <li> cho việc mới và thêm vào cuối danh sách
function themViec(ten, daXong) {
  var viec = document.createElement("li");
  viec.className = "viec";
  if (daXong) viec.classList.add("xong");

  var oDanhDau = document.createElement("span");
  oDanhDau.className = "o-danh-dau";
  oDanhDau.textContent = daXong ? "✓" : "";

  var tenViec = document.createElement("span");
  tenViec.className = "ten-viec";
  // textContent (không dùng innerHTML) để người dùng gõ thẻ HTML cũng chỉ hiện ra chữ
  tenViec.textContent = ten;

  var nutXoa = document.createElement("button");
  nutXoa.type = "button";
  nutXoa.className = "nut-xoa";
  nutXoa.textContent = "Xoá";

  // Bấm vào việc: đổi trạng thái hoàn thành
  viec.addEventListener("click", function () {
    viec.classList.toggle("xong");
    oDanhDau.textContent = viec.classList.contains("xong") ? "✓" : "";
    capNhatSoViec();
  });

  // Bấm Xoá: xoá việc khỏi danh sách.
  // stopPropagation để cú bấm không lan lên <li> và đổi trạng thái
  nutXoa.addEventListener("click", function (suKien) {
    suKien.stopPropagation();
    viec.remove();
    capNhatSoViec();
  });

  viec.appendChild(oDanhDau);
  viec.appendChild(tenViec);
  viec.appendChild(nutXoa);
  danhSach.appendChild(viec);
  capNhatSoViec();
}

// Đếm số việc chưa có class "xong"
function capNhatSoViec() {
  var tongSo = danhSach.querySelectorAll(".viec").length;
  var conLai = danhSach.querySelectorAll(".viec:not(.xong)").length;

  if (tongSo == 0) {
    demViec.textContent = "Chưa có việc nào. Hãy thêm việc mới!";
  } else if (conLai == 0) {
    demViec.textContent = "Đã hoàn thành tất cả công việc 🎉";
  } else {
    demViec.textContent = "Còn " + conLai + " việc chưa hoàn thành";
  }
}

// Bấm Thêm hoặc Enter
formThem.addEventListener("submit", function (suKien) {
  suKien.preventDefault(); // chặn form tải lại trang
  var ten = oNhap.value.trim();
  if (ten == "") {
    oNhap.focus();
    return;
  }
  themViec(ten, false);
  oNhap.value = "";
  oNhap.focus();
});

// Vài việc mẫu giống hình minh hoạ
themViec("Đọc chương HTML5 cơ bản", true);
themViec("Làm bài tập CSS Grid", false);
themViec("Quay video OBS nộp bài", false);
