function formatoRD(valor) {
  return valor.toLocaleString("es-DO", { style: "currency", currency: "DOP" });
}

function calcularRegalia() {
  const salario = parseFloat(document.getElementById("salario").value);
  const meses = parseFloat(document.getElementById("meses").value);
  const resultado = document.getElementById("resultado");

  if (isNaN(salario) || isNaN(meses) || salario <= 0 || meses <= 0 || meses > 12) {
    resultado.innerHTML = "<p>Escribe un salario válido y entre 1 y 12 meses trabajados.</p>";
    return;
  }

  const totalDevengado = salario * meses;
  const regalia = totalDevengado / 12;

  resultado.innerHTML = `
    <div class="fila"><span>Salario devengado en el año</span><span>${formatoRD(totalDevengado)}</span></div>
    <div class="fila total"><span>Regalía pascual</span><span>${formatoRD(regalia)}</span></div>
    <p class="aviso">Fecha límite de pago: 20 de diciembre.</p>
  `;
}