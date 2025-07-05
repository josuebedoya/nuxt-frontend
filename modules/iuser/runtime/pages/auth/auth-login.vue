<script setup lang="ts">
import {reactive, ref, computed, onMounted} from 'vue'

defineI18nRoute(false)
const authStore = useIuserAuthStore()

const {t} = useI18n()

const isPwd = ref(true)
const loading = ref(false)
const route = useRoute()

const auth = reactive({
  email: 'soporte@imaginacolombia.com',
  password: 'baseImagina123'
})
const routeQuery = computed(() => route?.query || null)

onMounted(() =>
{

})

async function onLogin ()
{
  try
  {
    await authStore.login(auth.email, auth.password)
    /*const redirectTo = route.query.redirectTo as string || '/'
    if (redirectTo && redirectTo.startsWith('/')) navigateTo(redirectTo)
    else navigateTo('/')*/
  } catch (error)
  {
    console.error('[LOGIN ERROR]', error)
  }
}
</script>

<template>
  <ClientOnly>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-4">
      <div class="w-full max-w-md backdrop-blur-sm bg-white/70 shadow-xl rounded-2xl px-8 py-10 animate-fade-in">

        <div class="flex flex-col items-center mb-6">
          <span class="text-2xl font-semibold text-blue-500 uppercase">
            {{ t('iuser.login.title') }}
          </span>
        </div>

        <form @submit.prevent="onLogin" class="space-y-4">
          <UFormField :label="t('iuser.login.inputs.email')" name="username">
            <UInput v-model="auth.email" type="email" required/>
          </UFormField>

          <UFormField :label="t('iuser.login.inputs.password')" name="password">
            <UInput v-model="auth.password" :type="isPwd ? 'password' : 'text'" required
                    :trailing-icon="isPwd ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                    @click:trailing-icon="isPwd = !isPwd"/>
          </UFormField>

          <div class="flex justify-between items-center">
            <NuxtLinkLocale :to="{ name: 'iuser.resetPassword', query: routeQuery }"
                            class="text-sm text-blue-500 hover:underline">
              {{ t('iuser.login.forgotPassword') }}
            </NuxtLinkLocale>
          </div>

          <div class="flex flex-col sm:flex-row justify-between gap-2">
            <NuxtLinkLocale :to="{ name: 'iuser.register', query: routeQuery }" class="w-full sm:w-auto">
              <UButton block color="neutral" variant="soft" :label="t('iuser.login.withoutAccount.link')"/>
            </NuxtLinkLocale>

            <UButton
                v-if="authStore.isAuthenticated"
                block color="neutral" variant="soft" label="logout" @click="authStore.logout"/>

            <UButton
                block type="submit" color="primary" variant="solid" :loading="loading"
                :label="t('iuser.login.submitBtn')"/>
          </div>
        </form>

        <div class="mt-2">
          UserName {{ authStore.user?.first_name }}
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
