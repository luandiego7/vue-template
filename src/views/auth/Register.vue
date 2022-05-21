<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Registre-se para acessar o sistema</small>
          </div>
          <form role="form">
            <base-input formClasses="input-group-alternative" placeholder="Nome" addon-left-icon="ni ni-hat-3" name="name" v-model="form.name" :validate="v$">
            </base-input>

            <base-input
                formClasses="input-group-alternative"
                placeholder="E-mail"
                addon-left-icon="ni ni-email-83"
                name="email"
                v-model="form.email"
                focused
                :validate="v$"
            >
            </base-input>

            <base-input
                formClasses="input-group-alternative"
                placeholder="Senha"
                type="password"
                addon-left-icon="ni ni-lock-circle-open"
                name="password"
                v-model="form.password"
                :validate="v$"
            >
            </base-input>

            <base-input
                formClasses="input-group-alternative"
                placeholder="Confirme a senha"
                type="password"
                addon-left-icon="ni ni-lock-circle-open"
                name="password_confirmation"
                v-model="form.password_confirmation"
                :validate="v$"
            >
            </base-input>
            <!--<div class="text-muted font-italic">
              <small
                >reset_password strength:
                <span class="text-success font-weight-700">strong</span></small
              >
            </div>-->

            <div class="text-center">
              <button class="btn btn-primary" @click.prevent="submit">Registre-se</button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light">
            <small>Esqueceu a senha?</small>
          </a>
        </div>
        <div class="col-6 text-right">
          <router-link to="/login" class="text-light">
            <small>Já tenho cadastro</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, computed, ref } from "vue";
import useValidate from '@vuelidate/core';
import {required, email, minLength, sameAs, helpers} from '@vuelidate/validators';
import api from "../../services";
import Swal from 'sweetalert2';
import store from "../../store";
import router from "../../router";

export default {
  name: "register",
  setup(){
    const form = reactive({
      name:                 '',
      email:                '',
      password:             '',
      password_confirmation: '',
    });

    const rules = computed(() => {
      return {
        name: {
          required:helpers.withMessage('O campo Nome é obrigatório', required),
          minLength:helpers.withMessage('O campo Senha deve ter no mínimo 2 caracteres', minLength(2))
        },
        email: {
          required:helpers.withMessage('O campo E-mail é obrigatório', required),
          email:helpers.withMessage('O campo E-mail deve ser um e-mail válido', email)
        },
        password:{
          required:helpers.withMessage('O campo Senha é obrigatório', required),
          minLength:helpers.withMessage('O campo Senha deve ter no mínimo 8 caracteres' ,minLength(8))
        },
        password_confirmation: {
          required:helpers.withMessage('O campo Confirmação de senha é obrigatório', required),
          minLength:helpers.withMessage('O campo Confirmação de senha deve ter no mínimo 8 caracteres' ,minLength(8)),
          sameAs:helpers.withMessage('O campo Senha e Confirmação de senha devem ser iguais' ,sameAs(form.password))
        }
      }
    });

    function submit(){
      this.v$.$validate();

      if(!this.v$.$error){
        try{
          api.post('auth/register', form).then((res) => {
            if(res.data.user){
              store.dispatch('setUser', res.data.user);
              //store.dispatch('setToken', res.data.token);

              router.push({name: 'home'});
            }else{
              Swal.fire('Erro', 'Ocorreu um erro ao tentar registrar', 'error');
            }
          }).catch((error) => {
            Swal.fire('Erro', 'Ocorreu um erro ao tentar registrar', 'error');
            console.log(error);
          });
        }catch(error){
          Swal.fire('Erro', 'Ocorreu um erro ao tentar registrar', 'error');
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
