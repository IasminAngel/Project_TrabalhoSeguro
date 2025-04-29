const stripe = Stripe('pk_test_51RJ1icFSgHnf7lUpZCklY2DSFOjA4cYVAIb17Ms8JcUi112cKpIharkXK0VimPwczCLY3ZTdIIlzbqXirOywwCYm00Icza4N1W'); 
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    const form = document.getElementById('payment-form');
    const messageContainer = document.getElementById('payment-message');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const {paymentMethod, error} = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        messageContainer.textContent = error.message;
      } else {
        console.log('PaymentMethod criado com sucesso:', paymentMethod);
        messageContainer.textContent = "Pagamento de teste criado! ID: " + paymentMethod.id;
      }
    });