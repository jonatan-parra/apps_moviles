var app = {
	inicio: function () {
		DIAMETRO_BOLA = 50;
		alto  = document.documentElement.clientHeight;
		ancho = document.documentElement.clientWidth;

		app.vigilaSensores();
		app.iniciaJuego();
	},	
	
	iniciaJuego: function () {

		function preload() {
			game.stage.backgroundColor = '#f27d0c';
			game.load.image('bola', 'assets/bola.png');
		}

		function create() {
			game.add.sprite(app.inicioX(), app.inicioY(), 'bola');
		}

		var estados = { preload: preload, create: create};
		var game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'phaser', estados);
		
	},

	inicioX: function(){
		return app.numeroAleatorioHasta(ancho - DIAMETRO_BOLA);
	}

	navigator.accelerometer.watchAcceleration(this.onSuccess, onError, {frequency: 1000});
	},

	onSuccess: function (datosAceleracion) {
		app.detectaAgitacion(datosAceleracion);
		app.representaValores(datosAceleracion);
	},

	detectaAgitacion: function (datosAceleracion) {
		agitacionX = datosAceleracion.x > 10;
		agitacionY = datosAceleracion.y > 10;

		if(agitacionX || agitacionY){
			document.body.className = 'agitado';
		} else {
			document.body.className = '';
		}
	},

	representaValores: function (datosAceleracion) {
		app.representa(datosAceleracion.x, '#valorx');
		app.representa(datosAceleracion.y, '#valory');
		app.representa(datosAceleracion.z, '#valorz');
	},

	representa: function (dato, elementoHTML) {
		redondeo = Math.round(dato * 100) /100;
		document.querySelector(elementoHTML).innerHTML = redondeo;
	}

};

if('addEventListener' in document){
	document.addEventListener('deviceready', function () {
		app.inicio();
	}, false);
}