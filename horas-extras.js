function formatoRD(valor) {
  return valor.toLocaleString("es-DO", { style: "currency", currency: "DOP" });
}

function calcularHorasExtras() {
  const salario = parseFloat(document.getElementById("salario").value);
  const horas = parseFloat(document.getElementById("horas").value);
  const turno = document.getElementById("turno").value;
  const feriado = parseFloat(document.getElementById("feriado").value) || 0;
  const resultado = document.getElementById("resultado");

  if (isNaN(salario) || isNaN(horas) || salario <= 0 || horas < 0 || feriado < 0) {
    resultado.innerHTML = "<p>Escribe un salario y unas horas válidas.</p>";
    return;
  }

  let horaNormal = salario / 23.83 / 8;
  if (turno === "nocturno") horaNormal *= 1.15;

  const horas35 = Math.max(0, Math.min(horas, 68) - 44);
  const horas100 = Math.max(0, horas - 68);

  const pago35 = horas35 * horaNormal * 1.35;
  const pago100 = horas100 * horaNormal * 2;
  const pagoFeriado = feriado * horaNormal * 2;
  const total = pago35 + pago100 + pagoFeriado;

  resultado.innerHTML = `
    <div class="fila"><span>Valor de la hora normal</span><span>${formatoRD(horaNormal)}</span></div>
    <div class="fila"><span>Horas extras al 35% (${horas35} h)</span><span>${formatoRD(pago35)}</span></div>
    <div class="fila"><span>Horas extras al 100% (${horas100} h)</span><span>${formatoRD(pago100)}</span></div>
    <div class="fila"><span>Feriado o descanso (${feriado} h)</span><span>${formatoRD(pagoFeriado)}</span></div>
    <div class="fila total"><span>Total por horas extras</span><span>${formatoRD(total)}</span></div>
    <p class="aviso">Estimado. Las primeras 44 horas semanales están incluidas en el salario mensual.</p>
  `;
}