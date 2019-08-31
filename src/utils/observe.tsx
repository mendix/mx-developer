import debounce from 'tiny-debounce';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 */

interface Mutation {
    type: string;
    target: HTMLElement;
}

const observe = (callback: (observer: MutationObserver) => void) => {
    const observer = new MutationObserver(
        debounce((mutationList: Mutation[], observer: MutationObserver) => {
            const domChanges = mutationList.filter(
                ({ type }) => type === 'childList'
            );
            const isDomChanged = domChanges.length > 0;
            if (isDomChanged) {
                callback(observer);
            }
        }, 100)
    );
    const observerConfig = {
        subtree: true,
        childList: true,
        attributes: false,
        characterData: false,
        attributeOldValue: false,
        characterDataOldValue: false,
    };
    observer.observe(document, observerConfig);
    return observer;
};

export default observe;
