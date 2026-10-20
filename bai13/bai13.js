var thuMucAnh = "Anh/Bai13/";
function anhSo(chuSo) {
  return '<img src="' + thuMucAnh + "0" + chuSo + '.gif" alt="' + chuSo + '">';
}
function doiSoThanhAnh(so) {
  var hangChuc = Math.floor(so / 10);
  var hangDonVi = so % 10;
  return anhSo(hangChuc) + anhSo(hangDonVi);
}
var haiCham = '<img src="' + thuMucAnh + 'haicham.gif" alt=":">';
function capNhatDongHo() {
  var bayGio = new Date();
  var gio = bayGio.getHours();
  var phut = bayGio.getMinutes();
  var giay = bayGio.getSeconds();
  document.getElementById("dongHo").innerHTML =
    doiSoThanhAnh(gio) +
    haiCham +
    doiSoThanhAnh(phut) +
    haiCham +
    doiSoThanhAnh(giay);
  var loichao;
  if (gio < 12) loichao = "Chao buoi sang";
  else if (gio < 18) loiChao = "Chào buổi chiều";
  else loiChao = "Chào buổi tối";
  document.getElementById("loiChao").innerHTML = loiChao;
}

capNhatDongHo();
setInterval(capNhatDongHo, 1000);
