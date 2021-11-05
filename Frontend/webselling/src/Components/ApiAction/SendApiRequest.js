import { BIDDING_MANAGE, USER_AUTH_LOGOUT, USER_LOGIN, USER_REGISTER_UPDATE, WEB_MANAGE } from "./ApiUrl";
import { toast } from 'react-toastify';
import Axios from 'axios';

const showMessage = (obj) => {
    var msg = Object.values(obj)[0][0];
    var ky = Object.keys(obj)[0] ? Object.keys(obj)[0].toUpperCase() : ''
    if (msg) {
        if (msg.length === 1) {
            msg = Object.values(obj)[0]
        }
        if (msg.length === 1) {
            msg = JSON.parse(obj.replace(/'/g, '"'))[0];
        }
        return (ky + ': ' + msg[0].toUpperCase() + msg.slice(1))
    } else {
        return "Something went wrong.Try Again!!"
    }
}

export const register_user = (data) => {
    Axios.post(USER_REGISTER_UPDATE, data)
        .then(res => {
            console.log(res.data)
            toast('Your account successfully registered!!', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
            });
            setTimeout(() => window.location.reload(), [2000])
        })
        .catch((e) => {
            toast(showMessage(e.response ? e.response.data : { a: {} }), {
                type: 'error',
                position: toast.POSITION.TOP_CENTER
            });
        })
}

export const profile_update = (data) => {
    Axios.patch(USER_REGISTER_UPDATE + `?user_id=${data.get('uid')}`, data)
        .then(res => {
            console.log(res.data)
            toast('Your profile successfully updated!!', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
            });
            setTimeout(() => window.location.reload(), [2000])
        })
        .catch((e) => {
            toast(showMessage(e.response ? e.response.data : { a: {} }), {
                type: 'error',
                position: toast.POSITION.TOP_CENTER
            });
        })
}

export const logout_user = () => {
    Axios.post(USER_AUTH_LOGOUT)
        .then(res => {
            toast('You are successfully logged out', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
            });
            setTimeout(() => window.location.reload(), [1500])
        })
        .catch((e) => {
            console.log("kkkkkkkkkkkkkkkkkkk")
            toast(showMessage(e.response ? e.response.data : { a: {} }), {
                type: 'error',
                position: toast.POSITION.TOP_CENTER
            });
            setTimeout(() => window.location.reload(), [2000])
        })
}

export const auth_check = (dispatch, setVerifyAuth) => {
    Axios.put(USER_AUTH_LOGOUT)
        .then(res => {
            (res.status !== 204) && dispatch({ type: 'AUTH_SUCCESS', payload: res.data })
            setVerifyAuth(true);
        })
        .catch(e => {
            console.log(e.response);
            setVerifyAuth(true);
            try {
                if (e.response.status !== 401) {
                    toast(showMessage(e.response ? e.response.data : { a: {} }), {
                        type: 'error',
                        position: toast.POSITION.TOP_CENTER
                    });
                    logout_user()  // Hard Log-Out
                }
                if (e.response.status === 403 & e.response.statusText === "Forbidden") {
                    logout_user()  // Hard Log-Out
                }
            }
            catch {
                toast("Something went wrong.Try agin later!!!", {
                    type: 'error',
                    position: toast.POSITION.TOP_CENTER
                });
                console.log("SERVER NOT CONNECTED!!")
            }
        })
}

export const login_user = (data, next_path) => {
    Axios.post(USER_LOGIN, data)
        .then(res => {
            console.log(res.data)
            toast('You are successfully logged in', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
            });
            setTimeout(() => { window.location = next_path }, [800])

        })
        .catch((e) => {
            toast(showMessage(e.response ? e.response.data : { a: {} }), {
                type: 'error',
                position: toast.POSITION.TOP_CENTER
            });
        })
}

export const get_website = (user_id, setSites) => {
    Axios.get(WEB_MANAGE + `?user_id=${user_id}`)
        .then(res => {
            console.log("Get all web callllll")
            setSites(res.data)
        })
        .catch((e) => {
            toast(showMessage(e.response ? e.response.data : { a: {} }), {
                type: 'error',
                position: toast.POSITION.TOP_CENTER
            });
        })
}

export const create_web = (data) => {
    Axios.post(WEB_MANAGE, data)
        .then(res => {
            console.log(res.data)
            toast('Your website successfylly launched!!', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
            });
            setTimeout(() => window.location.reload(), [2000])
        })
        .catch((e) => {
            toast(showMessage(e.response ? e.response.data : { a: {} }), {
                type: 'error',
                position: toast.POSITION.TOP_CENTER
            });
        })
}

export const edit_web = (data, web_id) => {
    Axios.patch(WEB_MANAGE + `${web_id}/`, data)
        .then(res => {
            console.log(res.data)
            toast('Your website successfylly updated!!', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
            });
            setTimeout(() => window.location = '/manage_website', [2000])
        })
        .catch((e) => {
            toast(showMessage(e.response ? e.response.data : { a: {} }), {
                type: 'error',
                position: toast.POSITION.TOP_CENTER
            });
        })
}

export const get_web_detail = (web_id, setData) => {
    Axios.get(WEB_MANAGE + `${web_id}/`)
        .then(res => {
            setData(res.data)
            console.log("Get web callllllll")
        })
        .catch((e) => {
            toast(showMessage(e.response ? e.response.data : { a: {} }), {
                type: 'error',
                position: toast.POSITION.TOP_CENTER
            });
        })
}

export const delete_website = (web_id) => {
    Axios.delete(WEB_MANAGE + `${web_id}/`)
        .then(res => {
            setTimeout(() => window.location = '/manage_website', [2000])
            toast('Your website successfylly deleted!!', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
            });
        })
        .catch((e) => {
            toast(showMessage(e.response ? e.response.data : { a: {} }), {
                type: 'error',
                position: toast.POSITION.TOP_CENTER
            });
        })
}

export const get_all_bidded_users = (setBidData, web_id, setValue, state) => {
    Axios.get(BIDDING_MANAGE + `?web_id=${web_id}`)
        .then(res => {
            const resData = res.data
            console.log(res.data)
            setBidData(res.data)
            resData.forEach(item => {
                if (item.user === state.auth.username) {
                    setValue({ bid_price: item.bid_price, bid_id: item.id })
                }
            });
        })
        .catch((e) => {
            toast(showMessage(e.response ? e.response.data : { a: {} }), {
                type: 'error',
                position: toast.POSITION.TOP_CENTER
            });
        })
}

export const create_bid = (data, bidData, setBidData, setValue) => {
    Axios.post(BIDDING_MANAGE, data)
        .then(res => {
            const up_data = []
            up_data.push(res.data)
            setBidData(up_data.concat(bidData));
            setValue({ bid_price: true })
            toast('Bid successfully submitted!!', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
            });
        })
        .catch((e) => {
            toast(showMessage(e.response ? e.response.data : { a: {} }), {
                type: 'error',
                position: toast.POSITION.TOP_CENTER
            });
        })
}
export const delete_bid = (bid_id, bidData, setBidData, setValue) => {
    Axios.delete(BIDDING_MANAGE + `${bid_id}/`)
        .then(res => {
            const up_data = []
            bidData.filter((item) => {
                if (item.id !== bid_id) {
                    up_data.push(item)
                }
                return null;
            });
            setBidData(up_data);
            setValue({ bid_price: false })
            toast('Bid successfully deleted!!', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
            });
        })
        .catch((e) => {
            toast(showMessage(e.response ? e.response.data : { a: {} }), {
                type: 'error',
                position: toast.POSITION.TOP_CENTER
            });
        })
}
export const update_bid = (bid_data, bid_id, bidData, setBidData) => {
    Axios.patch(BIDDING_MANAGE + `${bid_id}/`, bid_data)
        .then(res => {
            const up_data = []
            up_data.push(res.data)
            bidData.filter((item) => {
                if (item.id !== bid_id) {
                    up_data.push(item)
                }
                return null;
            });
            setBidData(up_data);
            toast('Bid successfully updated!!', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
            });
        })
        .catch((e) => {
            toast(showMessage(e.response ? e.response.data : { a: {} }), {
                type: 'error',
                position: toast.POSITION.TOP_CENTER
            });
        })
}