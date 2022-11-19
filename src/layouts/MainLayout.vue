<style lang="sass">
.header-icon
  position: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)
</style>
<template>
  <q-layout view="lHr lpR fFf">

    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm">{{$route.name}}</span>
          <q-icon
      class="q-pa-md lt-md header-icon" 
      name="fas fa-dove"
      size="sm"
      color="primary" 
      />
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      :width="283" 
      show-if-above 
      v-model="leftDrawerOpen" 
      side="left" 
      bordered
    >

      <q-icon
      class="q-pa-md" 
      name="fas fa-dove"
      size="lg"
      color="primary" 
      />

      
  
    <q-list>
      <q-item
      class="q-py-md"
      to="/" 
      clickable 
      v-ripple
      exact
      >
        <q-item-section avatar>
          <q-icon name="home" size="md" />
        </q-item-section>

        <q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
      </q-item>

      <q-item
      class="q-py-md"
        to="/about" 
        clickable 
        v-ripple
        exact
      >
        <q-item-section avatar>
          <q-icon name="help" size="md" />
        </q-item-section>

        <q-item-section class="text-h6 text-weight-bold">About</q-item-section>
      </q-item>

      <q-item
         class="q-py-md"
        clickable 
        v-ripple
        exact
      >
        <q-item-section avatar>
          <q-icon name="tag" size="md" />
        </q-item-section>

        <q-item-section class="text-h6 text-weight-bold">Explore</q-item-section>
      </q-item>

      <q-item
         class="q-py-md"
        clickable 
        v-ripple
        exact
      >
        <q-item-section avatar>
          <q-icon name="notifications" size="md" />
        </q-item-section>

        <q-item-section class="text-h6 text-weight-bold">Notifications</q-item-section>
      </q-item>

      <q-item
         class="q-py-md"
        clickable 
        v-ripple
        exact
      >
        <q-item-section avatar>
          <q-icon name="mail" size="md" />
        </q-item-section>

        <q-item-section class="text-h6 text-weight-bold">Messages</q-item-section>
      </q-item>

      <q-item
         class="q-py-md"
        clickable 
        v-ripple
        exact
      >
        <q-item-section avatar>
          <q-icon name="bookmark" size="md" />
        </q-item-section>

        <q-item-section class="text-h6 text-weight-bold">Bookmarks</q-item-section>
      </q-item>

      <q-item
         class="q-py-md"
        clickable 
        v-ripple
        exact
      >
        <q-item-section avatar>
          <q-icon name="list_alt" size="md" />
        </q-item-section>

        <q-item-section class="text-h6 text-weight-bold">Lists</q-item-section>
      </q-item>

      <q-item
         class="q-py-md"
        clickable 
        v-ripple
        exact
      >
        <q-item-section avatar>
          <q-icon name="person_outline" size="md" />
        </q-item-section>

        <q-item-section class="text-h6 text-weight-bold">Profile</q-item-section>
      </q-item>
    </q-list>
  

    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
       <q-input
       class="q-ma-md" 
       outlined
       rounded
      placeholder=" Search twitter"
       >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-list 
        padding
        separator
      >
      <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label overline
          class="text-grey">Education</q-item-label>
          <q-item-label
          class="text-weight-bold">Something amazing happened</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>
        </q-item>

        <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label overline
          class="text-grey">Education</q-item-label>
          <q-item-label
          class="text-weight-bold">Something amazing happened</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>
        </q-item>

        <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label overline
          class="text-grey">Education</q-item-label>
          <q-item-label
          class="text-weight-bold">Something amazing happened</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>
        </q-item>
        </q-list>
    </q-drawer>

    <q-page-container>
    <keep-alive>
      <router-view />
      </keep-alive>
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();
const auth = getAuth()

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>
