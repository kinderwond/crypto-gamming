<template>
  <div class="site-wrapper">
    <NavBar />
    <main class="site-main">
      <nuxt />
    </main>
    <notifications
      group="main"
      classes="app-notification"
      width="100%"
      position="top right"
      close-on-click
    />
  </div>
</template>
