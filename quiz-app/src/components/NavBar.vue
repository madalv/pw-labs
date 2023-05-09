<template>
    <div>
        <div class="bg-emerald-700">
            <nav class="
                    container
                    px-6
                    py-8
                    mx-auto
                    md:flex md:justify-between md:items-center
                    ">


                <RouterLink to="/" class="text-white ">
                    Quizzes
                </RouterLink>

                <p v-if="userStore.isUserSignedIn()" class="text-white">
                    Hello, {{ userStore.user.name }} {{ userStore.user.surname }}
                </p>

                <div>
                    <router-link to="/signin" v-slot="{navigate}">
                    <button v-if="!userStore.isUserSignedIn()" @click="navigate" class="bg-orange-300 hover:bg-orange-400 
                        text-white 
                        font-bold py-2 px-4 
                        border-b-4 border-orange-400 hover:border-orange-500 rounded">
                    Sign In
                </button>
               
                </router-link>
                <button v-if="userStore.isUserSignedIn()" @click="userStore.signOut()" class="bg-orange-400 hover:bg-orange-300 
                        text-white 
                        font-bold py-2 px-4 
                        border-b-4 border-orange-300 hover:border-orange-200 rounded">
                    Sign Out
                </button>
                </div>
                
            </nav>
        </div>
    </div>
</template>

<script>

import { userStore } from '@/stores/userStore';

export default {
    data() {
        return {
            showMenu: false,
            userStore
        };
    },
};
</script>