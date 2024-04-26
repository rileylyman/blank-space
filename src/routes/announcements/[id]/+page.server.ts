import { type ServerLoadEvent } from "@sveltejs/kit"
import { error } from '@sveltejs/kit';

export const load = async (event: ServerLoadEvent) => {
    let announcementId = event.params.id!;
    let announcement = (await event.locals.pb
        .collection('announcements')
        .getFullList({ filter: `id = "${announcementId}"` }))
        .at(0);
    
    if (announcement === undefined) {
        error(404);
    }

    (async () => {
        let read = (await event.locals.pb
            .collection('announcements_read')
            .getFullList({ filter: `user.id = "${event.locals.pb.authStore.model?.id}"` }))
            .at(0);
        if (read === undefined) {
            await event.locals.pb
                .collection('announcements_read')
                .create({ 
                    user: event.locals.pb.authStore.model?.id,
                    read: [ announcementId ]
                });
        } else if (!read.read.includes(announcementId)) {
            read.read.push(announcementId);
            await event.locals.pb
                .collection('announcements_read')
                .update(read.id, read)
        }
    })();

    return {
        announcement,
    };
}