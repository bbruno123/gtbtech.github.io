const data_id = document.querySelector("#data");

const ponteiro_hora = document.querySelector("#ponteiro_hora");
const ponteiro_minuto = document.querySelector("#ponteiro_minuto");
const ponteiro_segundo = document.querySelector("#ponteiro_segundo");

setInterval(() => {
    const data = `${String(new Date().getDate()).padStart(2, '0')}/${String(new Date().getMonth()+1).padStart(2, '0')}/${new Date().getFullYear()}`;
    data_id.innerText = `Data: ${data}`;

    let horas = new Date().getHours() % 12;
    let minutos = new Date().getMinutes();
    let segudos = new Date().getSeconds();

    ponteiro_hora.style.transform = `translateX(-50%) rotate(${horas * 30 + minutos * 0.5}deg)`;
    ponteiro_minuto.style.transform = `translateX(-50%) rotate(${minutos * 6}deg)`;
    ponteiro_segundo.style.transform = `translateX(-50%) rotate(${segudos * 6}deg)`;
}, 500);