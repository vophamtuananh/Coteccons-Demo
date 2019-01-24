const LoaiXe = {
    TAI: 'Tải',
    CAU_THUNG: 'Cầu Thùng',
    DAU_KEO: 'Đầu Kéo'
}

class PhuongTien {
	constructor(loaiXe, met, tan, soXe) {
		this.loaiXe = loaiXe;
		this.met = met;
		this.tan = tan;
		this.soXe = soXe;
	}
}