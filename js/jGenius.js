let usuarioSeq = [],
	geniusSeq = [],
	id, nivel = 0,
	sonsBotoes = ["./audio/green.mp3", "./audio/red.mp3",
		"./audio/yellow.mp3", "./audio/blue.mp3"],
	strict = false,
	erro = false,
	gameOn = false;

const N_NIVEIS = 20;

$(document).ready(function () {
	$("#display").text("");
	$("#start").click(function () {
		strict = false;
		erro = false;
		nivel = 0;
		nivel++;
		usuarioSeq = [];
		geniusSeq = [];
		jogadaGenius();
	});
	$(".tile").each(function (i) {
		$(this).data("jid", i + 1);
	});
	$(".tile").click(function () {
		id = $(this).data("jid");
		jogadaUsuario();
	});
	$("#strict").click(function () {
		nivel = 0;
		nivel++;
		geniusSeq = []
		usuarioSeq = [];
		strict = true;
		jogadaGenius();
	});
	$("#switch").click(function () {
		gameOn = (gameOn == false) ? true : false;
		if (gameOn) {
			playSoundStart();
			$(".inner-switch").addClass("inner-inactive");
			$("#switch").addClass("outter-active");
			$("#display").text("00");
		}
		else {
			$(".inner-switch").removeClass("inner-inactive");
			$("#switch").removeClass("outter-active");
			$("#display").text("");
		}
	})
});

function jogadaUsuario() {
	usuarioSeq.push(id);
	addClassSound(id);
	if (!checkSeqUsuario()) {
		if (strict) {
			geniusSeq = [];
			nivel = 1;
		}
		erro = true;
		displayPerdeu();
		usuarioSeq = [];
		jogadaGenius();
	}
	else {
		if (usuarioSeq.length == geniusSeq.length && usuarioSeq.length < N_NIVEIS) {
			nivel++;
			usuarioSeq = [];
			erro = false;
			jogadaGenius();
		}
	}
	if (usuarioSeq.length == N_NIVEIS) {
		displayVenceu();
		resetGame();
	}
}

function jogadaGenius() {
	$("#display").text(nivel);
	if (!erro) {
		getRandomNum();
	}
	if (erro && strict) {
		getRandomNum();
	}
	let i = 0;
	let meuIntervalo = setInterval(
		function () {
			id = geniusSeq[i];
			addClassSound(id);
			i++;
			if (i == geniusSeq.length) {
				clearInterval(meuIntervalo);
			}
		}, 1000);
}

function getRandomNum() {
	let random = Math.floor((Math.random() * 4) + 1);
	geniusSeq.push(random);
}

function addClassSound(id) {
	$("#n" + id).addClass("n" + id + "-active");
	playSoundClick(id);
	setTimeout(function () {
		$("#n" + id).removeClass("n" + id + "-active");
	}, 500);
}

function checkSeqUsuario() {
	for (let i = 0; i < usuarioSeq.length; i++) {
		if (usuarioSeq[i] != geniusSeq[i]) {
			return false;
		}
	}
	return true;
}

function displayPerdeu() {
	let cont = 0;
	let meuErro = setInterval(function () {
		$("#display").text("Err");
		playSoundDerrota();
		cont++;
		if (cont == 3) {
			$("#display").text(nivel);
			clearInterval(meuErro);
			usuarioSeq = [];
			cont = 0;
		}
	}, 1500);
}

function displayVenceu() {
	let cont = 0;
	let venceuIntervalo = setInterval(function () {
		cont++;
		$("#display").text(":)");
		if (cont == 5) {
			clearInterval(venceuIntervalo);
			$("#display").text("00");
			cont = 0;
		}
	}, 500);
}

function playSoundStart() {
	let som = new Audio("./audio/inicio.mp3");
	som.play();
}

function playSoundClick(id) {
	let som = new Audio(sonsBotoes[id - 1]);
	som.play();
}

function playSoundDerrota() {
	let som = new Audio("./audio/erro.mp3");
	som.play();
}

function resetGame() {
	usuarioSeq = [];
	geniusSeq = [];
	nivel = 0;
	$("#display").text("00");
}