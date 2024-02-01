<script lang="ts">
    export let messages: Array<{msg: string, name: string, me: boolean}>;
</script>

<div id="root">
    {#each messages as {msg, name, me}}
        <div class="msg" class:me>
            <span class="msg-label">
                {me ? 'You' : name}
            </span>
            {msg}
        </div>
    {/each}
</div>

<style>
    #root {
        width: 100%;
        height: 100%;
        background: white;
        display: grid;
        align-items: center;
        row-gap: 2rem;
        max-height: 20rem;
        overflow-y: auto;
        padding: 2rem 1rem;
    }

    .msg {
        position: relative;
        max-width: 70%;
        padding: 0.5rem 1rem;
        background: #ccc;
        border-radius: 0.5rem;
        justify-self: start;
        font-size: 0.9rem;
    }

    .msg.me {
        background: rgb(48, 131, 255);
        color: white;
        justify-self: end;
    }

    .msg .msg-label {
        position: absolute;
        top: 0;
        left: 0.1rem;
        transform: translateY(-100%);
        font-size: 0.8rem;
        color: #777;
    }

    .msg.me .msg-label {
        right: 0.1rem;
        text-align: right;
    }
</style>