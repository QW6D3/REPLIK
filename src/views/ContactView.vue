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
  
<script setup lang="ts">
    import { ref } from 'vue';
    import { sendEmail } from '@/emailService';
    
    const formData = ref({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    
    const statusMessage = ref('');
    
    const handleSubmit = async () => {
        const result = await sendEmail(formData.value);
        statusMessage.value = result.message;
        
        if (result.success) {
            formData.value = {
                name: '',
                email: '',
                subject: '',
                message: '',
            };
        }
    };
</script>
