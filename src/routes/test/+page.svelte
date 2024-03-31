<script lang="ts">
    import { onMount } from "svelte";
    import wordDb from "$lib/word-db";

    let msg = "pending";

    onMount(async () => {
        let data = [ "hello", "hi" ];

        let db = await wordDb.initWordDb();
        if (!db) {
            console.error("could not get word db");
            msg = "failed";
            return;
        }
        msg = "success";

        let success = await wordDb.addWordDbData(db, data);
        if (!success) {
            console.error("error adding data");
        }

        success = await wordDb.getWordDbData(db, "hello");
        if (!success) {
            console.error("error getting hello");
        } else {
            console.log("succeeded getting hello");
        }

        success = await wordDb.getWordDbData(db, "wanikani");
        if (!success) {
            console.error("error getting wanikani");
        } else {
            console.log("succeeded getting wanikani");
        }
    });
</script>

<h1> {msg} </h1>