import store from '../store';

export default async (to, from, next) => {
    document.title = `Template - ${to.name}`;

    // if you 're using authentication with token (jwt for example), changes !store.getters.getUser to !store.getters.getToken
    if( (to.name !== 'login' && to.name !== 'register' && to.name !== 'confirm-email' && to.name !== 'confirm-password') && !store.getters.getUser){
        try {
            await store.dispatch('checkUser');
            //await store.dispatch('checkToken');
            next({name: to.name});
        }catch (error){
            next({name: 'login'});
        }
    }else{
        // && store.getters.getToken -- same here
        if( (to.name === 'login' || to.name === 'register' ) && store.getters.getUser){
            next('/');
        }else{
            next();
        }
    }
}
