<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import {useSlotCategoryStore} from "~/store/slot-category";
import {MDBToast} from "mdb-vue-ui-kit";
// Form state
const formModal = ref(false);
const formLoading = ref(false);
const formStatus = ref("create");

// Initial object
const initObject = {
  id: "",
  name: "",
  image: {},
  multipliers: "",
  status: true, // Default checked
};

// Reactive form object
const form = reactive({ ...initObject });
const emit = defineEmits(["onSuccess"]);

// Validation rules
const required = (value: string) => !!value || "This field is required.";
const isArray = (value: string) => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) && parsed.length > 0 ? true : "Enter a valid array.";
  } catch {
    return "Enter a valid array format.";
  }
};

// Computed validation rules
const nameRules = computed(() => [required]);
const imageRules = computed(() => [required]);
const multipliersRules = computed(() => [required, isArray]);

// Form reference
const formRef = ref(null);  // Add a reference to the form

// Open Modal
const openModal = () => {
  formModal.value = true;
};

// Close Modal
const closeModal = () => {
  formLoading.value = false;
  formModal.value = false;
};

// Set Form Record
const setFormRecord = (status: string = "create", value = {}) => {
  formStatus.value = status;
  formModal.value = true;
  if (status === "create") {
    Object.assign(form, { ...initObject });
  } else if (status === "update") {
    formLoading.value = true;
    Object.assign(form, value);
  }
};
const slotCategoryStore = useSlotCategoryStore();


const handleFileInput = (files:any) => {
  form.image = files && files.length > 0 ? files[0] : null; // Store only the first file
};

const payload = () => {
  return {
    id: form.id,
    name: form.name,
    image: form.image,
    multipliers: JSON.parse(form.multipliers), // Convert to array if it's in string format
    status: form.status
  };
};
// Form submission
const onSubmit = async () => {
  // Ensure form validation is triggered
  if (!formRef.value) return;

  const { valid } = await formRef.value.validate(); // Check valid property

  if (!valid) {
    showError("Please fill in the required fields correctly.");
    return;
  }
console.log(form);
  try {
    formLoading.value = true;
    const response = await slotCategoryStore.post(payload());
    // API call successful
    formLoading.value = false;
    showSuccess("Form submitted successfully!");
    closeModal();
    emit("onSuccess");
  } catch (error) {
    formLoading.value = false;

    // Ensure error has a message
    const errorMessage = error?.response?.data?.message || "An error occurred while submitting.";

    message.value = {
      show: true,
      type: "danger",
      title: "Error",
      message: errorMessage
    };

    console.error("Submission error:", errorMessage);
  }

};



// Toast messages
const message = ref({ type: "success", title: "", message: "", show: false });

const showSuccess = (msg: string) => {
  message.value = { type: "success", title: "Success", message: msg, show: true };
};

const showError = (msg: string) => {
  message.value = { type: "danger", title: "Error", message: msg, show: true };
};

// Expose functions
defineExpose({ openModal, setFormRecord });
</script>

<template>

  <v-form ref="formRef" @submit.prevent="onSubmit">

    <v-dialog
        v-model="formModal"
        max-width="600"
        persistent
        @click:outside="closeModal"
    >
      <v-card>
        <v-card-title>
          <span class="font-weight-medium" >Slot Categories</span>
        </v-card-title>
        {{JSON.stringify(form.image, true)}}
        <v-card-text>
          <v-label class="font-weight-medium mb-1">Name</v-label>
          <v-text-field
              v-model="form.name"
              variant="outlined"
              hide-details="auto"
              color="primary"
              :rules="nameRules"
          ></v-text-field>
          <v-label class="font-weight-medium mb-1">Image</v-label>
          <v-file-input
              label="Image"
              :rules="imageRules"
              accept="image/*"
              type="file"
              @update:modelValue="handleFileInput"
          ></v-file-input>



          <v-label class="font-weight-medium mb-1">Multipliers</v-label>
          <v-text-field
              v-model="form.multipliers"
              variant="outlined"
              hide-details="auto"
              color="primary"
              placeholder="In Array [*, *, *]"
              :rules="multipliersRules"
          ></v-text-field>
          <v-checkbox
              v-model="form.status"
              label="Active"
          ></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn size="sm" color="secondary" @click="closeModal">Close</v-btn>
          <v-btn
              size="sm"
              color="primary"
              @click="onSubmit"
              :disabled="formLoading"
          >
            <template v-if="formLoading">
              <v-progress-circular indeterminate size="20" />
            </template>
            <template v-else> Save </template>
          </v-btn>


        </v-card-actions>
      </v-card>
      <MDBToast
          v-model="message.show"
          id="basic-primary-example"
          autohide
          :delay="2000"
          position="top-right"
          appendToBody
          stacking
          width="350px"
          :toast="message.type"
      >
        <template #title>
          {{message.title}}
        </template>
        {{message.message}}
      </MDBToast>
    </v-dialog>
  </v-form>
</template>
