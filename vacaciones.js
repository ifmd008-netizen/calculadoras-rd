function formatoRD(valor) {
  return valor.toLocaleString("es-DO", { style: "currency", currency: "DOP" });
}

function calcularVacaciones() {
  const salario = parseFloat(document.getElementById("salario").value);
  const anos = parseInt(document.getElementById("anos").value) || 0;
  const mesesExtra = parseInt(document.getElementById("meses").value) || 0;
  const tipo = document.getElementById("tipo").value;
  const resultado = document.getElementById("resultado");

  if (isNaN(salario) || salario <= 0 || anos < 0 || mesesExtra < 0 || mesesExtra > 11) {
    resultado.innerHTML = "<p>Revisa los datos: salario y tiempo trabajado deben ser válidos.</p>";
    return;
  }

  const salarioDiario = salario / 23.83;
  let dias = 0;

  if (tipo === "anual") {
    if (anos < 1) {
      resultado.innerHTML = "<p>Para vacaciones anuales necesitas al menos 1 año completo de servicio. Prueba la opción de vacaciones proporcionales.</p>";
      return;
    }
    dias = anos >= 5 ? 18 : 14;
  } else {
    const totalMeses = anos * 12 + mesesExtra;
    if (totalMeses <= 0) {
      resultado.innerHTML = "<p>Escribe el tiempo trabajado.</p>";
      return;
    }
    if (totalMeses < 12) {
      if (totalMeses > 10) dias = 11;
      else if (totalMeses > 9) dias = 10;
      else if (totalMeses > 8) dias = 9;
      else if (totalMeses > 7) dias = 8;
      else if (totalMeses > 6) dias = 7;
      else if (totalMeses > 5) dias = 6;
    } else {
      const base = totalMeses >= 60 ? 18 : 14;
      dias = base * (totalMeses % 12) / 12;
    }
  }

  const pago = dias * salarioDiario;

  resultado.innerHTML = `
    <div class="fila"><span>Salario diario</span><span>${formatoRD(salarioDiario)}</span></div>
    <div class="fila"><span>Días de vacaciones</span><span>${dias.toFixed(2)} días</span></div>
    <div class="fila total"><span>Pago de vacaciones</span><span>${formatoRD(pago)}</span></div>
    <p class="aviso">Estimado. Los días son laborables, no de calendario.</p>
  `;
}