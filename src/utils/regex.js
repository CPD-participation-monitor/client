export const inputPatterns = {
    name_regex: /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/,
    password_regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).{8,24}$/,
    email_regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    nic_regex: /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/
}