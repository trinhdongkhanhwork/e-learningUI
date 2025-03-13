// src/confirmDialogs.js
import Swal from 'sweetalert2';
import {router} from "@/router";

export function confirmDelete() {
    return Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to delete this item?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
    })
}

export function confirmSave() {
    return Swal.fire({
        title: 'Save changes?',
        text: 'Do you want to save the changes made?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes, save it!',
        cancelButtonText: 'Cancel',
    })
}

export function confirmCancel() {
    return Swal.fire({
        title: 'Are you sure?',
        text: 'All unsaved changes will be lost.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, discard changes!',
        cancelButtonText: 'No, go back',
    })
}

export function confirmLogout(store) {
    return Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out of your account.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log me out"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("token");
            localStorage.removeItem("cart");
            store.commit("clearUserInfo");
            router.push("/");
            Swal.fire("Logged out!", "You have been logged out.", "success");
        }
    });
}

