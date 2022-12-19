<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Listar</RouterLink>
        <RouterLink to="/expense/form">Criar</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>
