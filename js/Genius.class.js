class Genius{

	constructor(){
		this.cores = [];
		this.coresJogador = [];
	}
	
	findIndexCorJogador(cor){
		for(var i in this.cores){
			if(this.cores[i] == cor){
				return i;
			}
		}
		return -1;
	}
	
	addCor(cor){
		this.cores.push(cor);
	}
	
	addCorJogador(cor){
		this.coresJogador.push(cor);
	}
	
	removeCor(cor){
		let index = this.findIndexCorJogador(cor);
		if(index <0) return;
		this.coresJogador.splice(index,1);
	}
	
	sorteiaCor(){
		this.addCor(Math.floor((Math.random() * 4) + 0));
	}
	
}