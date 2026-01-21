import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const delay = Number(form.elements.delay.value);

    const fulfilled = document.querySelector('input[value="fulfilled"]:checked');
    const rejected = document.querySelector('input[value="rejected"]:checked');
    if (!fulfilled && !rejected) return;
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fulfilled) {
                resolve(delay);
            }
            else {
                reject(delay);
            }
        }, delay)
    });

    promise.then(delay => {
        iziToast.show({
            message: `✅ Fulfilled promise in ${delay}ms`,
            color: 'green',
            position: 'topRight',
            timeout: false,
            close: true,
            closeOnClick: false
        });
    }).catch(delay => {
        iziToast.show({
            message: `❌ Rejected promise in ${delay}ms`,
            color: 'red',
            position: 'topRight',
            timeout: false,
            close: true,
            closeOnClick: false
        });
    });
}