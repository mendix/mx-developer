import debounce from 'tiny-debounce';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 */

interface Mutation {
    type: string;
    target: HTMLElement;
}

const observe = (
    callback: (mutationList: Mutation[], observer: MutationObserver) => void
) => {
    const observer = new MutationObserver(debounce(callback, 100));
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
