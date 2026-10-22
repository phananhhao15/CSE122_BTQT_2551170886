var formDangKy = document.getElementById("formDangKy");
var hoTen = document.getElementById("hoTen");
var email = document.getElementById("email");
var matKhau = document.getElementById("matKhau");
var xacNhan = document.getElementById("xacNhan");
var ketQua = document.getElementById("ketQua");

// Biểu thức chính quy cho email: có phần tên, dấu @, tên miền và đuôi (vd: .vn)
var mauEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Hiện kết quả cho một ô: loiGap rỗng nghĩa là hợp lệ.
// Trả về true nếu ô hợp lệ
function hienKetQua(oNhap, idThongBao, loiGap) {
  var thongBao = document.getElementById(idThongBao);
  oNhap.classList.remove("loi", "hop-le");
  thongBao.classList.remove("loi", "hop-le");

  if (loiGap) {
    oNhap.classList.add("loi");
    thongBao.classList.add("loi");
    thongBao.textContent = "✗ " + loiGap;
    return false;
  }
  oNhap.classList.add("hop-le");
  thongBao.classList.add("hop-le");
  thongBao.textContent = "✓ Hợp lệ";
  return true;
}

// Các hàm kiểm tra từng ô: trả về câu báo lỗi, hoặc "" nếu đúng
function kiemTraHoTen() {
  if (hoTen.value.trim() == "") return "Họ và tên không được để trống";
  return "";
}

function kiemTraEmail() {
  var giaTri = email.value.trim();
  if (giaTri == "") return "Email không được để trống";
  if (giaTri.indexOf("@") == -1) return "Email không hợp lệ (thiếu dấu @)";
  if (!mauEmail.test(giaTri)) return "Email không hợp lệ (thiếu tên miền)";
  return "";
}

function kiemTraMatKhau() {
  if (matKhau.value.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự";
  return "";
}

function kiemTraXacNhan() {
  if (xacNhan.value == "") return "Vui lòng nhập lại mật khẩu";
  if (xacNhan.value != matKhau.value) return "Mật khẩu xác nhận không khớp";
  return "";
}

// Bấm Đăng ký: kiểm tra cả 4 ô
formDangKy.addEventListener("submit", function (suKien) {
  // Gọi đủ 4 hàm (không dùng && ngắn mạch) để ô nào sai cũng hiện lỗi
  var hopLe1 = hienKetQua(hoTen, "loiHoTen", kiemTraHoTen());
  var hopLe2 = hienKetQua(email, "loiEmail", kiemTraEmail());
  var hopLe3 = hienKetQua(matKhau, "loiMatKhau", kiemTraMatKhau());
  var hopLe4 = hienKetQua(xacNhan, "loiXacNhan", kiemTraXacNhan());

  // Bài tập không có máy chủ nhận dữ liệu nên luôn chặn gửi;
  // nếu dữ liệu đúng thì báo đăng ký thành công
  suKien.preventDefault();

  if (hopLe1 && hopLe2 && hopLe3 && hopLe4) {
    ketQua.textContent = "Đăng ký thành công! Chào mừng " + hoTen.value.trim() + ".";
  } else {
    ketQua.textContent = "";
  }
});

// Kiểm tra lại ngay khi người dùng sửa một ô đang báo lỗi
hoTen.addEventListener("input", function () {
  if (hoTen.classList.contains("loi")) hienKetQua(hoTen, "loiHoTen", kiemTraHoTen());
});
email.addEventListener("input", function () {
  if (email.classList.contains("loi")) hienKetQua(email, "loiEmail", kiemTraEmail());
});
matKhau.addEventListener("input", function () {
  if (matKhau.classList.contains("loi")) hienKetQua(matKhau, "loiMatKhau", kiemTraMatKhau());
});
xacNhan.addEventListener("input", function () {
  if (xacNhan.classList.contains("loi")) hienKetQua(xacNhan, "loiXacNhan", kiemTraXacNhan());
});
