<script setup lang="ts">
import type {SlotCategory} from "~/types/slot-category";
const props = defineProps({
    title: String
});
import {
  MDBTable,
  MDBBtn,MDBAlert,
  MDBBadge,MDBNavbar,MDBNavbarBrand,MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from 'mdb-vue-ui-kit';
import type { ComponentSize } from 'element-plus'
import type { QueryParams, User} from '~/types'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {useSlotCategoryStore} from "~/store/slot-category";
import FormModal from "~/components/admin/slot-categories/component/FormModal.vue";
const slotCategoryStore = useSlotCategoryStore();

definePageMeta({
  middleware: 'auth'
})

const route = useRoute();
const router = useRouter();
const dropdownAction = ref(false);
const tableHeight = 'calc(100vh - 169px)'
const tableData = ref([]);
const talblePageSize = ref([10,50,100]);
const currentPage = ref(1)
const defaultPageSize = talblePageSize.value[0];
const pageSize = ref(defaultPageSize)
const searchTerm = ref('')
const total = ref(0)
const size = ref<ComponentSize>('default')
const tableLoading = ref(false)
const formModal = ref();

const handleSizeChange = (val: number) => {
  router.push({ query: { ...route.query, length: val.toString() } })
}
const handleCurrentChange = (val: number) => {
  router.push({ query: { ...route.query, page: val.toString() } })

}
watchEffect(() => {
  const queryParams: QueryParams = route.query;
  currentPage.value = queryParams.page ? parseInt(queryParams.page) : 1;
  pageSize.value = queryParams.length ? parseInt(queryParams.length) : defaultPageSize;
  searchTerm.value = queryParams.search ? queryParams.search : '';
})

const fetchData = async () => {

  const {data,current_page, total : totalRecords} = await slotCategoryStore.getData({
    length : pageSize.value,
    page : currentPage.value,
    search : searchTerm.value
  });

  tableData.value = data
  currentPage.value = current_page
  total.value = totalRecords
  tableLoading.value = false
}

watch(
    () => [route.query.page, route.query.length],
    ([newPage, newLength]) => {
      currentPage.value = newPage ? parseInt(newPage as string) : 1
      pageSize.value = newLength ? parseInt(newLength as string) : defaultPageSize
      tableLoading.value = true
      fetchData();
    },
    { immediate: true }
)
const onSearch = async () => {
  // tableLoading.value = true
  await router.push({query: {...route.query, search: searchTerm.value}})
}

const onClear = async () => {
  searchTerm.value = ''
  await router.push({query: {...route.query, search: ''}})
}

const openModal = () => {
  formModal.value.setFormRecord('create')
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleClick = (row : any) => {
  formModal.value.setFormRecord('update', row)
}
const successHandler = (data : SlotCategory) => {
  fetchData();
}
</script>

<template>
  <v-card elevation="10">
    <MDBNavbar light bg="light" container class="mb-6 px-3">
      <div class="d-flex w-100 align-items-center justify-content-between flex-wrap">
        <MDBNavbarBrand href="#" class="me-auto">Slot Categories</MDBNavbarBrand>

        <!-- Search Input & Button -->
        <div class="d-flex flex-wrap align-items-center">
          <div class="input-group">
            <input
                type="search"
                v-model="searchTerm"
                class="form-control"
                placeholder="Search query"
                aria-label="Search"

            />
            <MDBBtn color="dark" @click="onSearch"> Search </MDBBtn>
          </div>
        </div>

        <!-- Add Button -->
        <MDBBtn href="#" class="ms-2" color="dark" @click="openModal"> Add New</MDBBtn>
      </div>
    </MDBNavbar>

    <v-card-item class="py-4 px-6">
      <div class="d-sm-flex align-center justify-space-between">
        <el-table v-loading="tableLoading" :data="tableData" style="width: 100%" class="rounded-3" :height="tableHeight">
          <el-table-column label="#">
            <template #default="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="IMAGE">
            <template #default="scope">
              <a href="javascript:void(0)" @click="handleClick(scope.row)">{{ scope.row.name }}</a>
            </template>
          </el-table-column>
          <el-table-column label="NAME">
            <template #default="scope">
              <a href="javascript:void(0)" @click="handleClick(scope.row)">{{ scope.row.name }}</a>
            </template>
          </el-table-column>
          <el-table-column label="MULTIPLIERS">
            <template #default="scope">
              {{ scope.row.email }}
            </template>
          </el-table-column>
          <el-table-column label="STATUS">
            <template #default="scope">
              <MDBBadge :color="scope.row.is_active ? 'success' : 'danger'">
                {{ scope.row.is_active ? 'Active' : 'Inactive' }}
              </MDBBadge>
            </template>
          </el-table-column>
          <el-table-column label="">
            <template #default="scope">
              <el-dropdown size="small" split-button type="primary" :key="scope.row.id">
                Action
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>Edit</el-dropdown-item>
                    <el-dropdown-item>Change Status</el-dropdown-item>
                    <el-dropdown-item>Add Fund</el-dropdown-item>
                    <el-dropdown-item>Add Account Details</el-dropdown-item>
                    <el-dropdown-item>Delete</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-table-column>


          <template #empty>
            <template v-if="searchTerm">
              <MDBAlert color="warning" static class="text-center">
                No results were found for the query: <strong>{{ searchTerm }}</strong>
              </MDBAlert>
            </template>
            <template v-else>
              No Data
            </template>
          </template>
        </el-table>

        <slot />
      </div>

      <!-- Pagination -->
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="tablePageSize"
          class="my-2"
          :size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </v-card-item>
  </v-card>
  <FormModal ref="formModal" @on-success="successHandler"/>
</template>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .input-group {
    flex-direction: row;
    width: 100%;
  }

  .input-group .btn {
    flex-shrink: 0;
  }

  .d-flex.flex-wrap {
    width: 100%;
    justify-content: space-between;
    gap: 10px;
    margin-left: 7px;
  }
}


</style>

