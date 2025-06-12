<script setup lang="ts">
import WindowTabs from './(components)/WindowTabs.vue'
import AsideBar from './(components)/AsideBar.vue'
import Dashboard from './dashboard/Dashboard.vue'
</script>

<template>
    <div
        class="flex h-screen items-center justify-center text-[#f1eae4] bg-[#130b06]"
    >
        <Dashboard />

        <main class="flex flex-col items-center">
            <section class="content">
                <article class="container-fluid">
                    <WindowTabs />
                </article>
            </section>
        </main>

        <AsideBar />
    </div>
</template>

<style module="scoped" lang="scss">
content {
    margin-top: 1.2rem;
    padding: 0.5rem 0.8rem;
}

container-fluid {
    margin: 0.1rem;
    padding: 0.2rem;
}
</style>
