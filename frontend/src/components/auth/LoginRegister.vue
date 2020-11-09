<template>
<form @submit.prevent="submitForm">
  <div class="row q-mb-md">
    <q-banner class="bg-grey-3 col">
      <template v-slot:avatar>
        <q-icon name="account_circle" color="primary" />
      </template>
      {{ tab | titleCase }} to listen music anywhere!
    </q-banner>
  </div>

  <div class="row q-mb-md" v-if="tab == 'register'">
    <q-input
      outlined
      v-model="formData.name"
      stack-label
      label="Name"
      ref="name"
      class="col"
      :rules="[val => val.length >= 2 || 'Please enter a valid name']"
      lazy-rules />
  </div>

  <div class="row q-mb-md" v-if="tab == 'register'">
    <q-input
      outlined
      v-model="formData.username"
      stack-label
      label="Username"
      ref="username"
      class="col"
      :rules="[val => val.length >= 3 || 'Please enter a valid Username']"
      lazy-rules />
  </div>

  <div class="row q-mb-md">
    <q-input
      outlined
      v-model="formData.email"
      stack-label
      :label="tab == 'register' ? 'Email' : 'Email or Username'"
      ref="email"
      class="col"
      :rules="tab == 'register' ? [val => isValidEmailAddress(val)
      || 'Please enter a valid Email address']
      : [val => val.length >= 3 || 'Please enter a valid Username or Email']"
      lazy-rules />
  </div>

  <div class="row q-mb-md">
    <q-input
      outlined
      v-model="formData.password"
      type="password"
      ref="password"
      stack-label
      label="Password"
      class="col"
      :rules="[ val => val.length >= 8 || 'Please enter at least 8 characters']"
      lazy-rules />
  </div>
  <div class="row">
    <q-space />
    <q-btn
      color="primary"
      type="submit"
      :label="tab" />
  </div>
</form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: ['tab'],
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        username: '',
      },
    };
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapActions('auth', ['login', 'register']),
    isValidEmailAddress(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    async submitForm() {
      if (this.tab == 'login') {
        const {
          email, password,
        } = this.$refs;
        email.validate();
        password.validate();
        if (!email.hasError && !password.hasError) {
          const user = await this.login({
            usernameOrMail: this.formData.email,
            password: this.formData.password,
          });
          if (user) {
            this.$q.notify({
              type: 'positive',
              message: 'Login Succesful',
              position: 'top',
            });
            this.$q.sessionStorage.set('user', user);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            this.$q.notify({
              type: 'negative',
              message: 'Login Failed! Check your Username/Mail or Password',
              position: 'top',
            });
          }
        }
      } else {
        const {
          name, username, email, password,
        } = this.$refs;
        name.validate();
        username.validate();
        email.validate();
        password.validate();
        if (!name.hasError && !username.hasError && !email.hasError && !password.hasError) {
          const user = await this.register({
            name: this.formData.name,
            username: this.formData.username,
            email: this.formData.email,
            password: this.formData.password,
          });
          if (user) {
            this.$q.notify({
              type: 'positive',
              message: 'Register Succesful',
              position: 'top',
            });
            this.$q.sessionStorage.set('user', user);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            this.$q.notify({
              type: 'negative',
              message: 'Register Failed! Check your Credentials',
              position: 'top',
            });
          }
        }
      }
    },
  },
  filters: {
    titleCase(val) {
      return val.charAt(0).toUpperCase() + val.slice(1);
    },
  },
};
</script>
