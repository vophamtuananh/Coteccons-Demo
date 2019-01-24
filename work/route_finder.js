function xuatGiaTruocKhiToiUu() {
	var sum = 0;
	for (var i = 0; i < hangHoas.length; i++) {
		var hangHoa = hangHoas[i];
		var phuongTien = phuongTienDiChuyen(hangHoa);
		var gia = giaDiChuyen(hangHoa, phuongTien);
		sum += gia;
	}
	document.getElementById('tong_gia').innerHTML = sum;
}

function xuatKetQuaDaToiUu() {

	var sum = 0;
	for (var i = 0; i < hangHoas.length; i++) {
		var hangHoa = hangHoas[i];
		var maChuyenHangTanDung = hangHoa.maChuyenHangTanDung;
		if (maChuyenHangTanDung == null) {
			var phuongTien = phuongTienDiChuyen(hangHoa);
			var gia = giaDiChuyen(hangHoa, phuongTien);
			sum += gia;
		} else {
			var hangHoaTanDung = layHangHoaTheoMa(maChuyenHangTanDung);
			var phuongTien = phuongTienDiChuyen(hangHoaTanDung);
			var gia = giaDiChuyen(hangHoa, phuongTien) * 0.7;
			sum += gia;
		}
	}
	document.getElementById('tong_gia').innerHTML = sum;
}

function taiKhoangCach() {
	for (var i = 0; i < distances.length; i++) {
		var distance = distances[i];
		var d = parseFloat(distance['distance'].split(" ")[0]);
		var khoangCach = new KhoangCach(distance['start'], distance['end'], d);
		khoangCachs.push(khoangCach);
	}
}

function taoHanhTrinh() {
	for (var i = 0; i < hangHoas.length; i++) {
		var hangHoaA = hangHoas[i];
		var giaTanDungTotNhat = null;
		var maChuyenHangTanDung = null;
		var vitriTanDung = -1;
		loop2:
		for (var j = 0; j < hangHoas.length; j++) {
			if (i != j) {
				var hangHoaB = hangHoas[j];
				if (hangHoaB.daDuocTanDung)
					continue loop2;
				var giaTanDung = giaCoTheTanDung(hangHoaA, hangHoaB);
				if (giaTanDung != -1) {
					if (giaTanDungTotNhat == null || giaTanDungTotNhat > giaTanDung) {
						giaTanDungTotNhat = giaTanDung;
						maChuyenHangTanDung = hangHoaB.id;
						vitriTanDung = j;
					}
				}
			}
		}
		if (maChuyenHangTanDung != null) {
			hangHoaA.maChuyenHangTanDung = maChuyenHangTanDung;
			hangHoas[vitriTanDung].daDuocTanDung = true;
		}
	}

	console.log(hangHoas);
}

function giaCoTheTanDung(hangHoaA, hangHoaB) {
	var khoangCach = tinhKhoangCach(hangHoaA.tenDiemDi, hangHoaB.tenDiemDen);
	if ((hangHoaA.tenDiemDi == hangHoaB.tenDiemDen || khoangCach <= 6) && hangHoaA.tenDiemDi != hangHoaB.tenDiemDi) {
		// can chack dieu kien cho duoc hang noi tiep
		var phuongTienCuaA = phuongTienDiChuyen(hangHoaA);
		var phuongTienCuaB = phuongTienDiChuyen(hangHoaB);
		if (phuongTienCuaB.met >= phuongTienCuaA.met && phuongTienCuaB.tan >= phuongTienCuaA.tan) {
			// kiem tra gia co re hon neu tan dung xe hay ko
			var giaPhuongTienA = giaDiChuyen(hangHoaA, phuongTienCuaA);
			var giaPhuongTienB = giaDiChuyen(hangHoaA, phuongTienCuaB) * 0.7;
			if (hangHoaA.tenDiemDi == "SG_Royal" && hangHoaB.tenDiemDen == "CTC_29 NGUYỄN ĐÌNH CHIỂU") {
				console.log(giaPhuongTienA + " - " + giaPhuongTienB);
			}
			if (giaPhuongTienA > giaPhuongTienB) {
				return giaPhuongTienB;
			}
		}
	}
	return -1;
}

function giaDiChuyen(hangHoa, phuongTien) {
	var diaDiemDi = layDiaDiem(hangHoa.tenDiemDi);
	var diaDiemDen = layDiaDiem(hangHoa.tenDiemDen);
	for (var i = 0; i < bangGias.length; i++) {
		var gia = bangGias[i];
		if (gia.khuVucDi == diaDiemDi.khuVuc && gia.khuVucDen == diaDiemDen.khuVuc)
			return gia.gia(phuongTien);
	}
	return -1;
}

function layDiaDiem(tenDiaDiem) {
	for (var i = 0; i < cacDiaDiemThat.length; i++) {
		var diaDiem = cacDiaDiemThat[i];
		if (diaDiem.ten == tenDiaDiem)
			return diaDiem;
	}
	return null;
}

function tinhKhoangCach(tenDiemA, tenDiemB) {
	for (var i = 0; i < khoangCachs.length; i++) {
		var khoangCach = khoangCachs[i];
		if ((khoangCach.tenDiemB == tenDiemA) && (khoangCach.tenDiemA == tenDiemB))
			return khoangCach.kms;
	}
	return -1;
}

function phuongTienDiChuyen(hangHoa) {
	return layPhuongTien(laySoXe(hangHoa));
}

function laySoXe(hangHoa) {
	if (hangHoa.soXeDuocXep != null)
		return hangHoa.soXeDuocXep;
	return hangHoa.soXeCan
}

function layPhuongTien(soXe) {
	for (var i = 0; i < phuongTiens.length; i++) {
		var phuongTien = phuongTiens[i];
		if (phuongTien.soXe == soXe)
			return phuongTien;
	}
	return null;
}

function layHangHoaTheoMa(maHangHoa) {
	for (var i = 0; i < hangHoas.length; i++) {
		var hangHoa = hangHoas[i];
		if (hangHoa.id == maHangHoa) {
			if (hangHoa.maChuyenHangTanDung != null)
				return layHangHoaTheoMa(hangHoa.maChuyenHangTanDung);
			return hangHoa;
		}
	}
	return null;
}



