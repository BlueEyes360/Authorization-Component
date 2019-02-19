const STORE_RESULT = 'STORE_RESULT';

const storeResult = (res) => {
    setTimeout(() => {}, 2000);

    return {
        type: STORE_RESULT,
        result: res
    }
};