const stripe = Stripe('pk_test_51RJ1icFSgHnf7lUpZCklY2DSFOjA4cYVAIb17Ms8JcUi112cKpIharkXK0VimPwczCLY3ZTdIIlzbqXirOywwCYm00Icza4N1W');

const elements = stripe.elements();
const cardElement = elements.create('card', {
  style: {
    base: {
      fontSize: '16px',
      color: '#32325d',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
    },
  },
});

cardElement.mount('#card-element');

const form = document.getElementById('payment-form');
const messageContainer = document.getElementById('payment-message');
const submitButton = document.getElementById('submit');

function setMessage(message, isError = false) {
  messageContainer.textContent = message;
  messageContainer.style.color = isError ? 'red' : 'green';
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  submitButton.classList.add('loading');
  setMessage('Processando pagamento...', false);

  const {paymentMethod, error} = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
  });

  if (error) {
    setMessage(error.message, true);
  } else {
    console.log('PaymentMethod criado com sucesso:', paymentMethod);
    setMessage("✅ Pagamento de teste criado com sucesso!\nID: " + paymentMethod.id);
  }

  submitButton.classList.remove('loading');
});