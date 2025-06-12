<script setup lang="ts">
const query = ref('')
const setInputs = ref('')

function handleSearch() {
    if (!query) Response.redirect('/:?')
    Response.redirect(`/:?/${query}`)
}
</script>

<template>
    <form id="search-form" v-on:submit="handleSearch()">
        <input
            id="search-field"
            type="search"
            name="query"
            placeholder="Search"
            aria-label="Search"
            v-on:change="() => setInputs"
            class="max-w-16 max-h-sm rounded-xl"
        />
        <button type="submit" class="px-1 mx-1 btn">
            <i>Search</i>
        </button>
    </form>
</template>
