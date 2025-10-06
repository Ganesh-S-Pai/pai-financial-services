<template>
  <v-navigation-drawer app v-model="showDrawer" image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    :permanent="!isMobile" @update:modelValue="onDrawerChange">
    <v-list-item dense base-color="white" title="Van Heusen" prepend-icon="mdi-tshirt-crew" class="mt-2"
      @click="navigateTo('/vhiw')" :active="isCurrentRoute('/vhiw')" />
    <v-list-item dense base-color="white" title="Malt House" prepend-icon="mdi-taxi" @click="navigateTo('/malt')"
      :active="isCurrentRoute('/malt')" />

    <template #append>
      <v-divider color="white" thickness="3" />

      <v-expand-transition>
        <div v-if="toggleSettings" class="expand-up">
          <v-list-item dense base-color="white" title="Profile" prepend-icon="mdi-account"
            @click="navigateTo('/profile')" :active="isCurrentRoute('/profile')" />
          <v-list-item dense base-color="white" title="Logout" prepend-icon="mdi-logout" @click="handleLogout" />
        </div>
      </v-expand-transition>

      <v-list-item dense base-color="white" title="Settings" prepend-icon="mdi-cog" class="mb-2"
        @click="toggleSettings = !toggleSettings" />
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAuthentication } from "@/services/authService";
import { useCommonStore } from "@/stores/common";
import { useRedirect } from "@/utils/redirect";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";

const { mdAndDown } = useDisplay();
const commonStore = useCommonStore();
const { logoutUser } = useAuthentication();
const { redirect } = useRedirect();
const route = useRoute();

const toggleSettings = ref(false);
const isMobile = computed(() => mdAndDown.value);
const showDrawer = ref(isMobile.value ? commonStore.drawer : true);

watch(isMobile, (val) => {
  showDrawer.value = val ? commonStore.drawer : true;
});

watch(
  () => commonStore.drawer,
  (newVal) => {
    if (isMobile.value) showDrawer.value = newVal;
  }
);

const isCurrentRoute = (path: string) => {
  return route.path === path;
};

const handleLogout = () => {
  logoutUser();
  commonStore.addToast({
    message: "Logged out successfully",
    color: "success",
  });
  setTimeout(() => redirect("/login"), 500);
};

const navigateTo = (path: string) => {
  redirect(path);
  commonStore.drawer = false;
  toggleSettings.value = false;
};

const onDrawerChange = (val: boolean) => {
  showDrawer.value = val
  if (isMobile.value) {
    commonStore.drawer = val
  }
}
</script>

<style scoped></style>
