// Chuỗi phép tính đang nhập, ví dụ "12+8×3"
var bieuThuc = "";
// true khi vừa bấm "=", lần bấm số tiếp theo sẽ bắt đầu phép tính mới
var vuaTinhXong = false;

var phepTinh = document.getElementById("phepTinh");
var ketQua = document.getElementById("ketQua");
var cacPhepToan = "+−×÷%";

// Hiển thị phép tính lên màn hình, thêm khoảng trắng quanh dấu cho dễ đọc
function capNhatManHinh() {
  var hienThi = "";
  for (var i = 0; i < bieuThuc.length; i++) {
    var kyTu = bieuThuc[i];
    if ("+−×÷".indexOf(kyTu) != -1) {
      hienThi += " " + kyTu + " ";
    } else {
      hienThi += kyTu;
    }
  }
  // &nbsp; để dòng phép tính không bị co lại khi rỗng
  phepTinh.innerHTML = hienThi || "&nbsp;";
}

// Thêm một ký tự (số, dấu chấm hoặc phép toán) vào phép tính
function themKyTu(kyTu) {
  var kyTuCuoi = bieuThuc.slice(-1);
  var laPhepToan = cacPhepToan.indexOf(kyTu) != -1;

  // Vừa bấm "=": bấm số thì làm phép tính mới, bấm phép toán thì tính tiếp từ kết quả
  if (vuaTinhXong) {
    bieuThuc = laPhepToan ? ketQua.textContent : "";
    vuaTinhXong = false;
  }

  if (laPhepToan) {
    // Chưa có số thì chỉ cho phép dấu trừ (số âm)
    if (bieuThuc == "" && kyTu != "−") return;
    // Hai phép toán liền nhau: thay dấu cũ bằng dấu mới
    if (cacPhepToan.indexOf(kyTuCuoi) != -1) {
      bieuThuc = bieuThuc.slice(0, -1);
    }
  }

  // Không cho một số có hai dấu chấm
  if (kyTu == ".") {
    var soDangNhap = bieuThuc.split(/[+−×÷%()]/).pop();
    if (soDangNhap.indexOf(".") != -1) return;
  }

  bieuThuc += kyTu;
  capNhatManHinh();
}

// Nút ( ): mở ngoặc nếu chưa có ngoặc mở hoặc ngay sau phép toán, ngược lại đóng ngoặc
function themNgoac() {
  if (vuaTinhXong) {
    bieuThuc = "";
    vuaTinhXong = false;
  }
  var soMo = bieuThuc.split("(").length - 1;
  var soDong = bieuThuc.split(")").length - 1;
  var kyTuCuoi = bieuThuc.slice(-1);

  if (soMo == soDong || kyTuCuoi == "" || kyTuCuoi == "(" || cacPhepToan.indexOf(kyTuCuoi) != -1) {
    bieuThuc += "(";
  } else {
    bieuThuc += ")";
  }
  capNhatManHinh();
}

// Nút =: đổi ký hiệu hiển thị sang ký hiệu JavaScript rồi tính
function tinhKetQua() {
  if (bieuThuc == "") return;

  // Tự đóng các ngoặc còn thiếu
  var soMo = bieuThuc.split("(").length - 1;
  var soDong = bieuThuc.split(")").length - 1;
  for (var i = soDong; i < soMo; i++) {
    bieuThuc += ")";
  }

  var bieuThucJS = bieuThuc
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/%/g, "/100"); // 50% = 50/100

  // Chỉ cho phép số, dấu chấm, ngoặc và + - * / trước khi tính
  if (!/^[0-9.+\-*/()]+$/.test(bieuThucJS)) {
    ketQua.textContent = "Lỗi";
    return;
  }

  var giaTri;
  try {
    giaTri = Function("return (" + bieuThucJS + ")")();
  } catch (loi) {
    giaTri = NaN;
  }

  capNhatManHinh();
  if (!isFinite(giaTri)) {
    // Chia cho 0 hoặc phép tính sai cú pháp
    ketQua.textContent = "Lỗi";
  } else {
    // Làm tròn để tránh 0.1 + 0.2 = 0.30000000000000004
    ketQua.textContent = parseFloat(giaTri.toFixed(10));
  }
  vuaTinhXong = true;
}

// Nút C: xoá hết
function xoaHet() {
  bieuThuc = "";
  vuaTinhXong = false;
  ketQua.textContent = "0";
  capNhatManHinh();
}

// Gắn sự kiện click cho từng nút
var cacNut = document.querySelectorAll(".nut");
for (var i = 0; i < cacNut.length; i++) {
  cacNut[i].addEventListener("click", function () {
    var lenh = this.dataset.lenh;
    if (lenh == "xoa") xoaHet();
    else if (lenh == "bang") tinhKetQua();
    else if (lenh == "ngoac") themNgoac();
    else themKyTu(this.dataset.giaTri);
  });
}
