import router from "@/router";
import { reactive } from "vue";

export const userStore = reactive({
    user: localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")): null,
    signIn(user) {
        this.user = user
        localStorage.setItem("user", JSON.stringify(user))
        router.push("/")
    },
    signOut() {
        this.user = null
        localStorage.removeItem("user")
        router.push("/")
    },
    isUserSignedIn() {
        return this.user != null
    }
})