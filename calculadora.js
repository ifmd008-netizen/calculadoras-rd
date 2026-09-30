function formatoRD(valor) {
  return valor.toLocaleString("es-DO", { style: "currency", currency: "DOP" });
}

function calcular() {
  const salario = parseFloat(document.getElementById("salario").value);
  const anos = parseInt(document.getElementById("anos").value) || 0;
  const mesesExtra = parseInt(document.getElementById("meses").value) || 0;
  const mesesAno = parseInt(document.getElementById("mesesAno").value) || 0;
  const tipo = document.getElementById("tipo").value;
  const resultado = document.getElementById("resultado");

  const totalMeses = anos * 12 + mesesExtra;

  if (isNaN(salario) || salario <= 0 || totalMeses <= 0 ||
      mesesExtra < 0 || mesesExtra > 11 || mesesAno < 0 || mesesAno > 12) {
    resultado.innerHTML = "<p>Revisa los datos: salario, tiempo trabajado y meses deben ser válidos.</p>";
    return;
  }

  const salarioDiario = salario / 23.83;

  // Preaviso (Art. 76)
  let diasPreaviso = 0;
  if (totalMeses >= 60) diasPreaviso = 28;
  else if (totalMeses >= 12) diasPreaviso = 14;
  else if (totalMeses >= 6) diasPreaviso = 7;
  else if (totalMeses >= 3) diasPreaviso = 5;

  // Cesantía (Art. 80)
  let diasCesantia = 0;
  if (totalMeses >= 12) {
    const anosCompletos = Math.floor(totalMeses / 12);
    const fraccion = totalMeses % 12;
    const diasPorAno = totalMeses >= 60 ? 23 : 21;
    diasCesantia = anosCompletos * diasPorAno;
    if (fraccion > 6) diasCesantia += 13;
    else if (fraccion > 3) diasCesantia += 6;
  } else if (totalMeses >= 6) {
    diasCesantia = 13;
  } else if (totalMeses >= 3) {
    diasCesantia = 6;
  }

  // Vacaciones proporcionales (Arts. 177 y 180)
  let diasVacaciones = 0;
  if (totalMeses < 12) {
    if (totalMeses > 10) diasVacaciones = 11;
    else if (totalMeses > 9) diasVacaciones = 10;
    else if (totalMeses > 8) diasVacaciones = 9;
    else if (totalMeses > 7) diasVacaciones = 8;
    else if (totalMeses > 6) diasVacaciones = 7;
    else if (totalMeses > 5) diasVacaciones = 6;
  } else {
    const base = totalMeses >= 60 ? 18 : 14;
    diasVacaciones = base * (totalMeses % 12) / 12;
  }

  // Regalía pascual proporcional
  const regalia = salario * mesesAno / 12;

  let preaviso = diasPreaviso * salarioDiario;
  let cesantia = diasCesantia * salarioDiario;
  const vacaciones = diasVacaciones * salarioDiario;

  if (tipo === "renuncia") {
    preaviso = 0;
    cesantia = 0;
    diasPreaviso = 0;
    diasCesantia = 0;
  }

  const total = preaviso + cesantia + vacaciones + regalia;

  resultado.innerHTML = `
    <div class="fila"><span>Salario diario</span><span>${formatoRD(salarioDiario)}</span></div>
    <div class="fila"><span>Preaviso (${diasPreaviso} días)</span><span>${formatoRD(preaviso)}</span></div>
    <div class="fila"><span>Cesantía (${diasCesantia} días)</span><span>${formatoRD(cesantia)}</span></div>
    <div class="fila"><span>Vacaciones (${diasVacaciones.toFixed(2)} días)</span><span>${formatoRD(vacaciones)}</span></div>
    <div class="fila"><span>Regalía pascual</span><span>${formatoRD(regalia)}</span></div>
    <div class="fila total"><span>Total estimado</span><span>${formatoRD(total)}</span></div>
    <p class="aviso">Cálculo referencial. No sustituye la asesoría del Ministerio de Trabajo o de un abogado.</p>
  `;
}