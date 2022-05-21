import store from "../store";
import router from "../router";

export default request => {
    return ({ status }) => { console.log(status);
        if(status === 401){
            store.dispatch('signOut');
            router.push({name: 'login'});
        }
    }
}
