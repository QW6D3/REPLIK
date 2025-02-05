<template>
    <div>
      <h1>Contactez-nous</h1>
      <form @submit.prevent="handleSubmit">
        <label>Nom</label>
        <input type="text" v-model="formData.name" required />
        
        <label>Email</label>
        <input type="email" v-model="formData.email" required />
        
        <label>Sujet</label>
        <input type="text" v-model="formData.subject" required />
        
        <label>Message</label>
        <textarea v-model="formData.message" required></textarea>
        
        <input type="submit" value="Envoyer" />
      </form>
      <p class="validationMessage" v-if="statusMessage">{{ statusMessage }}</p>
    </div>
</template>
  
<script>
    import { sendEmail } from '../emailService.js';
    
    export default {
        data() {
            return {
                formData: {
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                },
                statusMessage: '',
            };
        },
        methods: {
            async handleSubmit() {
                const result = await sendEmail(this.formData);
                this.statusMessage = result.message;
        
                if (result.success) {
                    this.formData = {
                        name: '',
                        email: '',
                        subject: '',
                        message: '',
                    };
                }
            },
        },
    };
</script>
  