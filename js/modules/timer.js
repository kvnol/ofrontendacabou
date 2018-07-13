const countDownDate = new Date("Mar 17, 2017 00:00:00").getTime();
const x = setInterval(() => {
  let now = new Date().getTime();
  let distance = now - countDownDate;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.querySelector(".timer").innerHTML = `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos`;
}, 1000);
