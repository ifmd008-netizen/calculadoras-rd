function formatoRD(valor) {
  return valor.toLocaleString("es-DO", { style: "currency", currency: "DOP" });
}

function calcularNeto() {
  const bruto = parseFloat(document.getElementById("bruto").value);
  const resultado = document.getElementById("resultado");

  if (isNaN(bruto) || bruto <= 0) {
    resultado.innerHTML = "<p>Escribe un salario bruto válido.</p>";
    return;
  }

  // Topes de salario cotizable (verificar cada año en tss.gob.do)
  const TOPE_AFP = 464460;
  const TOPE_SFS = 232230;

  const afp = Math.min(bruto, TOPE_AFP) * 0.0287;
  const sfs = Math.min(bruto, TOPE_SFS) * 0.0304;
  const baseMensual = bruto - afp - sfs;
  const baseAnual = baseMensual * 12;

  // Escala ISR 2026 (DGII)
  let isrAnual = 0;
  if (baseAnual > 867123) {
    isrAnual = 79775.15 + (baseAnual - 867123) * 0.25;
  } else if (baseAnual > 624329) {
    isrAnual = 31216.35 + (baseAnual - 624329) * 0.20;
  } else if (baseAnual > 416220) {
    isrAnual = (baseAnual - 416220) * 0.15;
  }

  const isrMensual = isrAnual / 12;
  const neto = baseMensual - isrMensual;

  resultado.innerHTML = `
    <div class="fila"><span>Salario bruto</span><span>${formatoRD(bruto)}</span></div>
    <div class="fila"><span>AFP (2.87%)</span><span>- ${formatoRD(afp)}</span></div>
    <div class="fila"><span>SFS (3.04%)</span><span>- ${formatoRD(sfs)}</span></div>
    <div class="fila"><span>ISR mensual</span><span>- ${formatoRD(isrMensual)}</span></div>
    <div class="fila total"><span>Salario neto</span><span>${formatoRD(neto)}</span></div>
    <p class="aviso">Estimado para un salario fijo. No incluye horas extras, bonos ni deducciones especiales.</p>
  `;
}