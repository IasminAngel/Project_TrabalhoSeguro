function showSuccessAlert(title, message, redirectUrl = null) {
    swal(title, message, "success").then(() => {
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    });
  }
  
  function showErrorAlert(title, message) {
    swal(title, message, "error");
  }
  