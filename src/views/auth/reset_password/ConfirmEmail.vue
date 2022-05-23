<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">

        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Recuperar senha</small>
          </div>
          <form @submit.prevent="submit()" role="form">
            <base-input formClasses="input-group-alternative mb-3" placeholder="E-mail" addon-left-icon="ni ni-email-83" name="email" v-model="form.email" :validate="v$"/>
            <div class="text-center">
              <button class="btn btn-primary" @click.prevent="submit">RECUPERAR</button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <router-link to="/login" class="text-light"><small>Login</small></router-link>
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light"><small>Registre-se</small></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {computed, reactive} from "vue";
import useValidate from '@vuelidate/core';
import {email, helpers, required} from '@vuelidate/validators';
import api from "../../../services";
import router from "../../../router";
import Swal from 'sweetalert2';

export default {
  name: "confirm-email",
  setup(){
    const form = reactive({
      email: '',
    });

    const rules = computed(() => {
      return {
        email: {
          required:helpers.withMessage('O campo E-mail é obrigatório', required),
          email:helpers.withMessage('O campo E-mail deve ser um e-mail válido', email)
        },
      }
    });

    function submit() {
      this.v$.$validate();

      if(!this.v$.$error){
        try{
          //api.get('/sanctum/csrf-cookie').then(response => {
            api.post('/api/auth/reset/confirm-email', {
              email: form.email,
            }).then((res) => {
              if(res){
                form.email = '';
                Swal.fire('Sucesso', 'Em alguns instantes você receberá um e-mail para redefinição da senha', 'success');
              }else{
                console.log(res);
                Swal.fire('Erro', 'Ocorreu um erro', 'error');
              }
            //});
          });
        }catch(error){
          Swal.fire('Erro', 'Ocorreu um erro', 'error');
          console.log(error.response);
        }
      }

    }

    const v$ = useValidate(rules, form);
    return { form, v$, submit }

  },

};
</script>
<style></style>
