document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.faq-button');

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const answer = button.nextElementSibling;
      answer.classList.toggle('hidden');
    });
  });
});