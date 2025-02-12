<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "~/store/auth";

// Pinia Store
const auth = useAuthStore();
const form = ref();
// Form Data
const loginType = ref("mobile"); // Default selection
const email = ref("");
const mobile = ref("");
const password = ref("");
const checkbox = ref(false);

// Validation Rules
const required = (value: string) => !!value || "This field is required.";
const emailRule = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Enter a valid email.";
const mobileRule = (value: string) =>
    /^[0-9]{10}$/.test(value) || "Enter a valid 10-digit mobile number.";

// Computed Property for Dynamic Validation
const inputRules = computed(() => {
  return loginType.value === "email" ? [required, emailRule] : [required, mobileRule];
});

// Login Function
async function handleLogin() {
  const { valid } = await form.value.validate(); // Check validation

  if (!valid) return; // Stop if validation fails


  try {
    const payload: Record<string, string> = { password: password.value };

    if (loginType.value === "email" && email.value.trim()) {
      payload.email = email.value;
    } else if (loginType.value === "mobile" && mobile.value.trim()) {
      payload.mobile = mobile.value;
    }

    const response = await auth.login(payload);

    if (response?.status === 200) {
      reloadNuxtApp({
        path: "/",
        force: true
      });
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
}
</script>

<template>
  <div>
    <v-form ref="form" @submit.prevent="handleLogin">
      <v-row class="">

        <!-- Radio Button for Email or Mobile -->
        <v-col cols="12">
          <v-radio-group v-model="loginType" row class="w-100">
            <v-row>
              <v-col cols="6" class="d-flex justify-start">
                <v-radio label="Login by Email" value="email"></v-radio>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <v-radio label="Login by Mobile" value="mobile"></v-radio>
              </v-col>
            </v-row>
          </v-radio-group>
        </v-col>

        <!-- Email Field (Visible when Email is selected) -->
        <v-col cols="12" v-if="loginType === 'email'">
          <v-label class="font-weight-medium mb-1">Email</v-label>
          <v-text-field
              v-model="email"
              variant="outlined"
              hide-details="auto"
              color="primary"
              :rules="inputRules"
          ></v-text-field>
        </v-col>

        <!-- Mobile Field (Visible when Mobile is selected) -->
        <v-col cols="12" v-if="loginType === 'mobile'">
          <v-label class="font-weight-medium mb-1">Mobile</v-label>
          <v-text-field
              v-model="mobile"
              variant="outlined"
              hide-details="auto"
              color="primary"
              :rules="inputRules"
          ></v-text-field>
        </v-col>

        <!-- Password Field -->
        <v-col cols="12">
          <v-label class="font-weight-medium mb-1">Password</v-label>
          <v-text-field
              v-model="password"
              variant="outlined"
              type="password"
              hide-details="auto"
              color="primary"
              :rules="[required]"
          ></v-text-field>
        </v-col>

        <!-- Remember Device & Forgot Password -->
        <v-col cols="12 " class="py-0">
          <div class="d-flex flex-wrap align-center w-100">
            <v-checkbox v-model="checkbox" hide-details color="primary">
              <template v-slot:label>Remember this Device</template>
            </v-checkbox>
            <div class="ml-sm-auto">
              <RouterLink
                  to=""
                  class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
              >
                Forgot Password?
              </RouterLink>
            </div>
          </div>
        </v-col>

        <!-- Submit Button -->
        <v-col cols="12">
          <v-btn size="large" rounded="pill" color="primary" block type="submit" flat>
            Sign In
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
