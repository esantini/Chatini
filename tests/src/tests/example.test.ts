interface Calculator { 
	init(): void,
	add(): number
}
interface Window {
	calculator: Calculator; 
}

(function() {
	var calculator = {
		init: function() {
			console.log('calculator initialized');
		},
		add: function (): number {
			var a = parseInt((document.getElementById('x') as HTMLInputElement).value);
			var b = parseInt((document.getElementById('y') as HTMLInputElement).value);
			(document.getElementById('result')!).innerHTML = (a + b).toString();
			return a + b;
		}
	};

	window.calculator = calculator;

})();

describe('Calculator', function() {

	beforeEach(function() {
		var fixture = 
			'<div id="fixture">' +
				'<input id="x" type="text">' +
				'<input id="y" type="text">' +
				'<input id="btnCalcAdd" type="button" value="Add Numbers">' +
				'Result: <span id="result" />' +
			'</div>';

		document.body.insertAdjacentHTML('afterbegin', fixture);
		(document.getElementById('btnCalcAdd') as HTMLInputElement).addEventListener('click', window.calculator.add );

	});

	afterEach(function() {
		document.body.removeChild(document.getElementById('fixture') as Element);
	});

	it('should return 3 for 1 + 2', function() {

		(document.getElementById('x') as HTMLInputElement).value = "1";
		(document.getElementById('y') as HTMLInputElement).value = "2";
		(document.getElementById('btnCalcAdd') as HTMLInputElement).click();

		var result = document.getElementById('result')!.innerHTML;

		chai.expect(result).to.equal('3');

	});

});
