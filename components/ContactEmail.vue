<script setup>

const props = defineProps({
  email: { type: Array,  required: true },
  showEmail: { type: Boolean, default: true },
  showIcons: { type: Boolean, default: true },
  emailWithIcon: { type: Boolean, default: true }, 
  emailIcon: { type: String, default: 'fa-solid fa-envelope' },
  emailWithTitle: { type: Boolean, default: true },
  classIcons: { type: String, default: 'self-center mr-2' },
  classTitle: { type: String, default: 'font-bold' },
  classLinkEmail: { type: String, default: 'inline-block' },
  withHyphenEmail: { type: Boolean, default: true },
})
</script>

<template>
    <!-- Email -->
    <div v-if="showEmail && email" class="component-email">
        <div class="flex">
        <i v-if="showIcons" :class="[emailIcon,classIcons]"></i>
        <div class="content-email">
            <template v-for="(email, index) in email" :key="index">
            <span v-if="withHyphenEmail && index>0">&nbsp;-&nbsp;</span>
            <a :href="`mailto:${email}`" target="_blank" :class="classLinkEmail">
                {{ email }} 
            </a>
            </template>
        </div>
        </div>
    </div>
</template>