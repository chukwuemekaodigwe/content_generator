<template>
    <span class="flex-row has-dropdown">
        <img :src="User.img" alt="Profile Img" srcset="">

        <div class="flex-column info">
            <span id="name">Welcome {{ User.name }}</span>
            <span>Admin</span>
        </div>
        <ul class="dropdown-nav">
            <li class="dropdown-item">
                <a href="#">Profile</a>
            </li>
            <li class="dropdown-item">
                <a href="#">Support</a>
            </li>
            <li class="dropdown-item">
                <a href="#">Settings</a>
            </li>
            <li class="dropdown-item">
                <a href="#">Log Out</a>
            </li>
        </ul>

    </span>
</template>

<script setup>
import { User } from '../composables/data'

</script>