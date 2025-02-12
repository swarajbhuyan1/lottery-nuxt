<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "~/store/auth";

// Pinia Store
const auth = useAuthStore();

// Computed Properties
const email = computed(() => auth.registeredUser.email);
const mobile = computed(() => auth.registeredUser.mobile);
const password = computed(() => auth.registeredUser.password);
const password_confirmation = computed(() => auth.registeredUser.password_confirmation);
const otp_method = computed(() => auth.registeredUser.otp_method);
const referral_code = computed(() => auth.registeredUser.referral_code);
const otp = ref(""); // OTP input field

// Form Reference
const form = ref(null);

// Validation Rules
const required = (value: string) => !!value || "This field is required.";

// OTP Submit Function
async function handleOtpSubmit() {
  if (!form.value) return; // Prevent errors if ref is not attached

  const { valid } = await form.value.validate(); // Validate form fields

  if (!valid) return; // Stop if validation fails

  try {
    await auth.verifyOtp({
      code: otp.value, // OTP Code
      method: otp_method.value, // OTP Method (mobile/email)
      mobile: mobile.value, // User Mobile Number
      password: password.value, // Password
      password_confirmation: password_confirmation.value, // Confirm Password
      referral_code: referral_code.value, // Referral Code (if any)
    });

    // ✅ Reset form fields
    otp.value = "";
    auth.registeredUser = {
      email: "",
      mobile: "",
      password: "",
      password_confirmation: "",
      otp_method: "",
      referral_code: "",
    };

    reloadNuxtApp({
      path: "/",
      force: true
    });

  } catch (error) {
    console.error("OTP Verification Error:", error);
  }
}
</script>

<template>
  <div>
    <v-form ref="form" @submit.prevent="handleOtpSubmit">
      <v-row>
        <!-- Otp Field -->
        <v-col cols="12">
          <v-label class="font-weight-medium mb-1">Otp</v-label>
          <v-text-field
              v-model="otp"
              variant="outlined"
              type="password"
              hide-details="auto"
              color="primary"
              :rules="[required]"
          ></v-text-field>
        </v-col>

        <!-- Submit Button -->
        <v-col cols="12">
          <v-btn size="large" rounded="pill" color="primary" block type="submit" flat>
            Verify
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
