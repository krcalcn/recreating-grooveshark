<template>
<q-page class=" q-pt-lg">
  <q-card class="auth-card">

    <q-tabs v-model="tab" active-color="primary" indicator-color="primary" align="justify">
      <q-tab name="login" label="Login" />
      <q-tab name="register" label="Register" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="login">
        <login-register :tab="tab" />
      </q-tab-panel>

      <q-tab-panel name="register">
        <login-register :tab="tab" />
      </q-tab-panel>

    </q-tab-panels>
  </q-card>
</q-page>
</template>

<script>
import LoginRegisterVue from 'src/components/auth/LoginRegister.vue';

export default {
  data() {
    return {
      tab: 'login',
    };
  },
  mounted() {
    const user = this.$q.sessionStorage.getItem('user');
    if (user) {
      this.$router.push('/');
    }
  },
  watch: {
  },
  components: {
    'login-register': LoginRegisterVue,
  },
};
</script>

<style>
.auth-card {
  max-width: 600px;
  margin: 0 auto;
}
</style>
