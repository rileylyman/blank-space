import type TypedPocketBase from "./schema";

const PEACEFUL_MODE = 'peacefulMode';
const CLEAR_PROGRESS = 'clearProgress';

export interface Features {
    peacefulMode: boolean;
    clearProgress: boolean;
}

export const getFeatures = async (pb: TypedPocketBase): Promise<Features> => {
    const featureControls = await pb.collection('feature_control').getFullList();
    const enabled = featureControls.filter((fc) => {
        if (!fc.enabled) return false;
        if (fc.filter.startsWith('specificUsers=')) {
            const [_, ids] = fc.filter.split('=');
            return ids.split(',').map((s) => s.trim()).includes(pb.authStore.model?.id);
        } else if (fc.filter === '*') {
            return true;
        } else {
            console.error('invalid filter:', fc.filter);
            return false;
        }
    }).map((fc) => fc.name);

    return {
        peacefulMode: enabled.includes(PEACEFUL_MODE),
        clearProgress: enabled.includes(CLEAR_PROGRESS),
    }
}