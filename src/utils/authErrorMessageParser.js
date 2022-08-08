export default function authErrorMessageparser(errorCode) {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Geçersiz e-posta adresi';
    case 'auth/invalid-password':
      return 'Şifreniz Geçersiz En az 6 karaktere sahip olmalı!';
    case 'auth/user-not-found':
      return 'Kullancı Bulunamadı';
    case 'auth/email-already-exists':
      return 'Kullancı zaten kayıtlı';

    default:
      break;
  }
}
