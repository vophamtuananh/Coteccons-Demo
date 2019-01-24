class Gia {
	constructor(khuVucDi, khuVucDen, gias) {
		this.khuVucDi = khuVucDi;
		this.khuVucDen = khuVucDen;
		this.gias = gias;
	}

	gia(phuongTien) {
		switch(phuongTien.loaiXe){
		    case LoaiXe.DAU_KEO:
		    	return this.gias[2];
		    case LoaiXe.CAU_THUNG:
		    	switch(phuongTien.met) {
		    		case 6:
		    			return this.gias[0];
		    		case 9:
		    			return this.gias[1];
		    		default:
		    			return this.gias[2];
		    	}
		    default:
		    	switch(phuongTien.met) {
		    		case 4.5:
		    			return this.gias[0];
		    		case 6:
		    			return this.gias[0];
		    		default:
		    			return this.gias[1];
		    	}
		}
	}
}