<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from "~/store/auth";
import { useRouter } from 'vue-router';
const router = useRouter();
const formRef = ref(); // Reference to v-form

const otpType = ref("email");
const name = ref("");
const email = ref("");
const mobile = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const referralCode = ref("");

// Validation rules
const required = (value: string) => !!value || "This field is required.";
const emailRule = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Enter a valid email.";
const mobileRule = (value: string) =>
    /^[0-9]{10}$/.test(value) || "Enter a valid 10-digit mobile number.";
const nameRule = (value: string) =>
    value.length >= 2 || "Name must be at least 2 characters";
const passwordRule = (value: string) =>
    value.length >= 6 || "Password must be at least 6 characters";
const confirmPasswordRule = (value: string) =>
    value === password.value || "Passwords do not match";

// Computed validation rules
const nameRules = computed(() => [required, nameRule]);
const emailRules = computed(() => [required, emailRule]);
const mobileRules = computed(() => [required, mobileRule]);
const passwordRules = computed(() => [required, passwordRule]);
const confirmPasswordRules = computed(() => [required, confirmPasswordRule]);

const authStore = useAuthStore();

async function handleRegister() {
  const { valid } = await formRef.value.validate(); // Validate form
  if (!valid) return; // Stop if form is invalid

  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      mobile: mobile.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
      otp_method: otpType.value,
      referral_code: referralCode.value || undefined
    });
    navigateTo('/auth/otp')
    // Reset form fields after successful registration
    name.value = '';
    email.value = '';
    mobile.value = '';
    password.value = '';
    passwordConfirmation.value = '';
    referralCode.value = '';

  } catch (error) {
    console.error('Registration error:', error);
  }
}
</script>
<template>
  <v-form ref="formRef" @submit.prevent="handleRegister">
    <v-row class="d-flex mt-3" density="compact">
      <!-- Login Type Selection -->
      <v-col cols="12" class="pb-0">
        <v-radio-group v-model="otpType" row class="w-100" density="compact">
          <v-row class="ma-0">
            <v-col cols="6" class="d-flex justify-start pa-0">
              <v-radio label="Otp via Email" value="email" density="compact" />
            </v-col>
            <v-col cols="6" class="d-flex justify-end pa-0">
              <v-radio label="Otp via Mobile" value="mobile" density="compact" />
            </v-col>
          </v-row>
        </v-radio-group>
      </v-col>

      <!-- Name -->
      <v-col cols="12" class="py-1">
        <v-label class="font-weight-medium mb-1">Name</v-label>
        <v-text-field
            v-model="name"
            variant="outlined"
            color="primary"
            :rules="nameRules"
            density="compact"
        />
      </v-col>

      <!-- Email Field -->
      <v-col cols="12" class="py-1">
        <v-label class="font-weight-medium mb-1">Email Address</v-label>
        <v-text-field
            v-model="email"
            variant="outlined"
            type="email"
            color="primary"
            :rules="emailRules"
            density="compact"
        />
      </v-col>

      <!-- Mobile Field -->
      <v-col cols="12" class="py-1">
        <v-label class="font-weight-medium mb-1">Mobile Number</v-label>
        <v-text-field
            v-model="mobile"
            variant="outlined"
            type="tel"
            color="primary"
            :rules="mobileRules"
            density="compact"
        />
      </v-col>

      <!-- Password -->
      <v-col cols="12" class="py-1">
        <v-label class="font-weight-medium mb-1">Password</v-label>
        <v-text-field
            v-model="password"
            variant="outlined"
            type="password"
            color="primary"
            :rules="passwordRules"
            density="compact"
        />
      </v-col>

      <!-- Confirm Password -->
      <v-col cols="12" class="py-1">
        <v-label class="font-weight-medium mb-1">Confirm Password</v-label>
        <v-text-field
            v-model="passwordConfirmation"
            variant="outlined"
            type="password"
            color="primary"
            :rules="confirmPasswordRules"
            density="compact"
        />
      </v-col>

      <!-- Referral Code -->
      <v-col cols="12" class="py-1">
        <v-label class="font-weight-medium mb-1">Referral Code (Optional)</v-label>
        <v-text-field
            v-model="referralCode"
            variant="outlined"
            color="primary"
            density="compact"
        />
      </v-col>

      <!-- Submit Button -->
      <v-col cols="12" class="pt-2">
        <v-btn
            type="submit"
            color="primary"
            rounded="pill"
            size="large"
            block
            flat
        >
          Sign Up
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
