import type TypedPocketBase from "./schema";

const CLEAR_PROGRESS = 'clearProgress';
const BADGES = 'badges';
const BUY_HELP = 'buyHelp';

export interface Features {
    clearProgress: boolean;
    badges: boolean;
    buyHelp: boolean;
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
        clearProgress: enabled.includes(CLEAR_PROGRESS),
        badges: enabled.includes(BADGES),
        buyHelp: enabled.includes(BUY_HELP),
    }
}