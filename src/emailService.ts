import emailjs from '@emailjs/browser';

interface EmailFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (formData: EmailFormData) => {
  const serviceID = 'service_cijmdyg';
  const templateID = 'template_n2wv3ng';
  const publicKey = 'ZqL3Y1AhFbv3Oyhrd';

  const emailParams = {
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
  };

  try {
    await emailjs.send(serviceID, templateID, emailParams, publicKey);
    return { success: true, message: 'Votre message a été envoyé avec succès !' };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    return { success: false, message: 'Une erreur s\'est produite. Veuillez réessayer.' };
  }
};
