<template>
  <div
    class="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl mt-10 p-6 h-fit dark:bg-gray-900 dark:text-white"
  >
    <h1
      class="text-3xl font-bold mb-3 text-gray-800 text-center dark:text-white"
    >
      Danh sách người dùng
    </h1>

    <div class="overflow-x-auto">
      <table
        class="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600"
      >
        <thead class="bg-gray-100 dark:bg-gray-700 text-yellow-800">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium dark:text-gray-300 uppercase tracking-wider"
            >
              Avatar
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium dark:text-gray-300 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium dark:text-gray-300 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium dark:text-gray-300 uppercase tracking-wider"
            >
              Phone
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium dark:text-gray-300 uppercase tracking-wider"
            >
              Location
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium dark:text-gray-300 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody
          class="bg-white-100 dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600"
        >
          <tr v-for="user in users" :key="user.email">
            <td
              class="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
            >
              <img
                :src="user.picture.thumbnail"
                alt="User Picture"
                class="rounded-full w-15 h-15"
              />
            </td>
            <td
              class="px-6 py-4 text-left whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {{ user.name.first }} {{ user.name.last }}
            </td>
            <td
              class="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
            >
              {{ user.email }}
            </td>
            <td
              class="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
            >
              {{ user.phone }}
            </td>
            <td
              class="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
            >
              {{ user.location.city }}, {{ user.location.country }}
            </td>
            <td
              class="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
            >
              <div class="flex space-x-3">
                <button
                  @click="openViewModal(user)"
                  class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <font-awesome-icon icon="eye" />
                </button>
                <button
                  @click="openEditModal(user)"
                  class="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300"
                >
                  <font-awesome-icon icon="pen" />
                </button>
                <button
                  @click="confirmDelete(user)"
                  class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <font-awesome-icon icon="trash" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Thêm phần pagination -->
      <div class="flex justify-end mt-4">
        <nav class="flex items-center space-x-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50"
            :class="{ 'cursor-not-allowed': currentPage === 1 }"
          >
            Previous
          </button>

          <template v-for="page in visiblePages" :key="page">
            <button v-if="page === '...'" class="px-3 py-1" disabled>
              ...
            </button>
            <button
              v-else
              @click="goToPage(page)"
              class="px-3 py-1 rounded-md border"
              :class="{
                'border-blue-500 bg-blue-500 text-white': currentPage === page,
                'border-gray-300 dark:border-gray-600': currentPage !== page,
              }"
            >
              {{ page }}
            </button>
          </template>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50"
            :class="{ 'cursor-not-allowed': currentPage === totalPages }"
          >
            Next
          </button>
        </nav>
      </div>
    </div>

    <UserModal
      v-if="showModal"
      :isOpen="showModal"
      :user="selectedUser"
      :isEditMode="isEditMode"
      @close="closeModal"
      @save="updateUser"
    />

    <!-- Delete Confirmation Dialog -->
    <div
      v-if="showDeleteDialog"
      class="fixed inset-0 bg-opacity-40 backdrop-blur-md flex items-center justify-center z-50"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4 dark:text-white">Confirm Delete</h2>
        <p class="mb-6 dark:text-gray-300">
          Are you sure you want to delete {{ userToDelete?.name?.first }}
          {{ userToDelete?.name?.last }}?
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteDialog = false"
            class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            @click="deleteUser"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import UserModal from "../components/UserModal.vue";

const users = ref([]);
const showModal = ref(false);
const showDeleteDialog = ref(false);
const selectedUser = ref(null);
const userToDelete = ref(null);
const isEditMode = ref(false);

// Thêm biến pagination
const currentPage = ref(1);
const totalPages = ref(10); // Tổng số trang
const maxVisiblePages = 5; // Số trang hiển thị tối đa

const fetchUsers = async (page = 1) => {
  try {
    const res = await fetch(
      `https://randomuser.me/api/?page=${page}&results=5&seed=abc`
    );
    const data = await res.json();
    users.value = data.results;
    currentPage.value = page;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const openViewModal = (user) => {
  selectedUser.value = user;
  isEditMode.value = false;
  showModal.value = true;
};

const openEditModal = (user) => {
  selectedUser.value = JSON.parse(JSON.stringify(user));
  isEditMode.value = true;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const updateUser = (updatedUser) => {
  const index = users.value.findIndex((u) => u.email === updatedUser.email);
  if (index !== -1) {
    users.value[index] = updatedUser;
  }
  closeModal();
};

const confirmDelete = (user) => {
  userToDelete.value = user;
  showDeleteDialog.value = true;
};

const deleteUser = () => {
  users.value = users.value.filter((u) => u.email !== userToDelete.value.email);
  showDeleteDialog.value = false;
};

// Tính toán các trang hiển thị
const visiblePages = computed(() => {
  const pages = [];
  let startPage = Math.max(
    1,
    currentPage.value - Math.floor(maxVisiblePages / 2)
  );
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages.value) {
    endPage = totalPages.value;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Thêm nút đầu tiên nếu cần
  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push("...");
    }
  }

  // Thêm các trang chính
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Thêm nút cuối cùng nếu cần
  if (endPage < totalPages.value) {
    if (endPage < totalPages.value - 1) {
      pages.push("...");
    }
    pages.push(totalPages.value);
  }

  return pages;
});

// Các hàm điều hướng trang
const goToPage = (page) => {
  if (page !== "...") {
    fetchUsers(page);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    fetchUsers(currentPage.value + 1);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    fetchUsers(currentPage.value - 1);
  }
};

onMounted(() => {
  fetchUsers(currentPage.value);
});
</script>
