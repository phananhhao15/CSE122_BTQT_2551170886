var tenThu = [
  "Chủ nhật",
  "Thứ Hai",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
];
function inLich() {
  var ngay = parseInt(document.getElementById("oNgay").value);
  var thang = parseInt(document.getElementById("oThang").value);
  var nam = parseInt(document.getElementById("oNam").value);
  var d = new Date(nam, thang - 1, ngay);
}
if (
  isNaN(ngay) ||
  isNaN(thang) ||
  isNaN(nam) ||
  d.getFullYear() != nam ||
  d.getMonth() != thang - 1 ||
  d.getDate() != ngay
) {
  alert("Ngay khong hop le! Vui long nhap lai.");
  return;
}
document.getElementById("nam").innerHTML = nam;
document.getElementById("thang").innerHTML = "Tháng " + (d.getMonth() + 1);
document.getElementById("ngay").innerHTML = ngay;
document.getElementById("thu").innerHTML = tenThu[d.getDay()];

var gio = new Date().getHours();
var loichao;
if (gio < 12) {
  loichao = "Chao buoi sang";
} else if (gio < 18) {
  loichao = "Chào buoi chieu";
} else {
  loichao = "Chao buoi toi";
  document.getElementById("loichao").innerHTML = loichao;
}
document.getElementById("nutInLich").addEventListener("click", inLich);
var homNay = new Date();
document.getElementById("oNgay").value = homNay.getDate();
document.getElementById("oThang").value = homNay.getMonth() + 1;
document.getElementById("oNam").value = homNay.getFullYear();
inLich();
