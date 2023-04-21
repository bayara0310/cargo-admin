import { reload } from 'firebase/auth';
import cookie from 'js-cookie';

// set in cookie
export const setCookie = (key, value) => {
    if (typeof window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1
        });
    }
};
// remove from cookie
export const removeCookie = key => {
    if (typeof window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        });
    }
};
// get from cookie such as stored token
// will be useful when we need to make request to server with token
export const getCookie = key => {
    if (typeof window !== 'undefined') {
        return cookie.get(key);
    }
};
// set in localstorage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};
// remove from localstorage
export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
};
// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
    setCookie('tokenA', response.data.token);
    setLocalStorage('userA', response.data.user);
    next();
};
// access user info from localstorage
export const isAuth = () => {
    if (typeof window !== 'undefined') {
        const cookieChecked = getCookie('tokenA');
        if (cookieChecked) {
            if (localStorage.getItem('userA')) {
                return JSON.parse(localStorage.getItem('userA'));
            } else {
                return false;
            }
        }
    }
};

export const signout = () => {
    console.log("test")
    removeCookie('tokenA');
    removeLocalStorage('userA');
    // next();
};

export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('userA'));
        auth = response.data;
        localStorage.setItem('userA', JSON.stringify(auth));
    }
    next();
};